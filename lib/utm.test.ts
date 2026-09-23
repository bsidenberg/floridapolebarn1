import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  LEAD_CHANNELS,
  firstTouchValue,
  isMissingClickIdColumn,
  leadAttributionColumns,
  mergeFirstTouchReferrer,
  mergeFirstTouchUtm,
  omitClickIdColumns,
  resolveLeadSource,
  type LeadChannel,
} from './utm.ts';

function channel(input: Parameters<typeof resolveLeadSource>[0]): LeadChannel {
  const resolved = resolveLeadSource(input);
  assert.ok(
    (LEAD_CHANNELS as readonly string[]).includes(resolved),
    `channel leaked outside the canonical set: ${resolved}`,
  );
  return resolved;
}

describe('resolveLeadSource', () => {
  it('maps gclid-only clicks to Google Ads', () => {
    assert.equal(channel({ gclid: 'EAIaIQobChMI' }), 'Google Ads');
  });

  it('maps fbclid-only clicks to Meta Ads', () => {
    assert.equal(channel({ fbclid: 'IwAR0abc' }), 'Meta Ads');
  });

  it('lets gclid win when both click ids are present', () => {
    assert.equal(channel({ gclid: 'g', fbclid: 'f' }), 'Google Ads');
  });

  it('maps google + cpc to Google Ads, ignoring case', () => {
    assert.equal(channel({ utm_source: 'google', utm_medium: 'cpc' }), 'Google Ads');
    assert.equal(channel({ utm_source: 'Google', utm_medium: 'CPC' }), 'Google Ads');
  });

  it('maps adwords and paid-social aliases', () => {
    assert.equal(channel({ utm_source: 'adwords' }), 'Google Ads');
    assert.equal(channel({ utm_source: 'fb', utm_medium: 'paid' }), 'Meta Ads');
    assert.equal(channel({ utm_source: 'ig', utm_medium: 'paid-social' }), 'Meta Ads');
    assert.equal(channel({ utm_source: 'Facebook', utm_medium: 'cpc' }), 'Meta Ads');
  });

  it('maps a google referrer with no gclid to Google Organic', () => {
    assert.equal(
      channel({ referrer: 'https://www.google.com/search?q=pole+barn' }),
      'Google Organic',
    );
  });

  it('does not treat the word google inside another site as Google Organic', () => {
    assert.equal(
      channel({ referrer: 'https://example.com/google-review' }),
      'Referral',
    );
  });

  it('prefers gclid over a google referrer', () => {
    assert.equal(
      channel({ gclid: 'abc', referrer: 'https://www.google.com/search?q=barn' }),
      'Google Ads',
    );
  });

  it('maps a google ads click referrer without gclid to Google Ads', () => {
    assert.equal(
      channel({ referrer: 'https://www.googleadservices.com/pagead/aclk' }),
      'Google Ads',
    );
  });

  it('maps google organic UTM synonyms to Google Organic', () => {
    assert.equal(channel({ utm_source: 'google' }), 'Google Organic');
    assert.equal(channel({ utm_source: 'google', utm_medium: 'organic' }), 'Google Organic');
    assert.equal(
      channel({ gclid: 'abc', utm_source: 'google', utm_medium: 'organic' }),
      'Google Ads',
    );
    assert.equal(channel({ utm_source: 'Organic Search' }), 'Google Organic');
    assert.equal(channel({ utm_source: 'google organic' }), 'Google Organic');
    assert.equal(channel({ utm_medium: 'organic' }), 'Google Organic');
  });

  it('maps a facebook referrer without fbclid to Organic Social', () => {
    assert.equal(channel({ referrer: 'https://m.facebook.com/' }), 'Organic Social');
    assert.equal(channel({ referrer: 'https://l.instagram.com/' }), 'Organic Social');
  });

  it('maps fbclid plus a facebook referrer to Meta Ads', () => {
    assert.equal(
      channel({ fbclid: 'IwAR', referrer: 'https://l.facebook.com/l.php' }),
      'Meta Ads',
    );
  });

  it('maps bare fb and facebook sources to Meta Ads, and social mediums to Organic Social', () => {
    assert.equal(channel({ utm_source: 'fb' }), 'Meta Ads');
    assert.equal(channel({ utm_source: 'Facebook' }), 'Meta Ads');
    assert.equal(channel({ utm_source: 'instagram' }), 'Meta Ads');
    assert.equal(channel({ utm_source: 'facebook', utm_medium: 'social' }), 'Organic Social');
    assert.equal(channel({ utm_source: 'ig', utm_medium: 'organic' }), 'Organic Social');
  });

  it('maps chatgpt.com and other AI sources to AI Search', () => {
    assert.equal(channel({ utm_source: 'chatgpt.com' }), 'AI Search');
    assert.equal(channel({ utm_source: 'ChatGPT' }), 'AI Search');
    assert.equal(channel({ referrer: 'https://chatgpt.com/' }), 'AI Search');
    assert.equal(channel({ referrer: 'https://www.perplexity.ai/search' }), 'AI Search');
  });

  it('maps email medium and email platforms to Email', () => {
    assert.equal(channel({ utm_medium: 'email' }), 'Email');
    assert.equal(channel({ utm_medium: 'Email', utm_source: 'newsletter' }), 'Email');
    assert.equal(channel({ utm_source: 'klaviyo' }), 'Email');
  });

  it('maps an empty visit to Direct, including an internal referrer', () => {
    assert.equal(channel({}), 'Direct');
    assert.equal(channel({ utm_source: '  ', gclid: '', referrer: '' }), 'Direct');
    assert.equal(channel({ referrer: 'https://www.floridapolebarn.com/quote' }), 'Direct');
  });

  it('maps other external sites to Referral and unknown UTMs to Other', () => {
    assert.equal(channel({ referrer: 'https://partner.example/barns' }), 'Referral');
    assert.equal(channel({ utm_medium: 'referral', utm_source: 'partner' }), 'Referral');
    assert.equal(channel({ utm_source: 'some-podcast' }), 'Other');
    assert.equal(channel({ referrer: 'https://www.bing.com/search?q=pole+barn' }), 'Other');
  });

  it('never returns a capture method or a raw utm_source', () => {
    for (const raw of ['Website Form', 'Website Chat', 'Website', 'chatgpt.com', 'fb', 'Facebook']) {
      const resolved = channel({ utm_source: raw });
      assert.notEqual(resolved, raw);
      assert.notEqual(resolved, 'Website Form');
      assert.notEqual(resolved, 'Website Chat');
      assert.notEqual(resolved, 'Website');
    }
  });
});

describe('leadAttributionColumns', () => {
  it('writes the same canonical channel to source and lead_source and keeps raw click ids', () => {
    const columns = leadAttributionColumns({
      utm_source: 'chatgpt.com',
      utm_medium: '',
      utm_campaign: 'spring',
      gclid: '  ',
      fbclid: '',
      referrer_url: 'https://www.google.com/search?q=barn',
      landing_page: 'https://floridapolebarn.com/?utm_source=chatgpt.com',
    });

    assert.equal(columns.source, 'AI Search');
    assert.equal(columns.lead_source, 'AI Search');
    assert.equal(columns.utm_source, 'chatgpt.com');
    assert.equal(columns.utm_campaign, 'spring');
    assert.equal(columns.gclid, null);
    assert.equal(columns.fbclid, null);
    assert.equal(columns.referrer_url, 'https://www.google.com/search?q=barn');
    assert.equal(columns.landing_page, 'https://floridapolebarn.com/?utm_source=chatgpt.com');
  });

  it('classifies gclid even when the client would have called it organic', () => {
    const columns = leadAttributionColumns({
      gclid: 'abc',
      referrer_url: 'https://www.google.com/',
    });
    assert.equal(columns.source, 'Google Ads');
    assert.equal(columns.lead_source, 'Google Ads');
    assert.equal(columns.gclid, 'abc');
  });
});

describe('click id column fallback', () => {
  it('detects a missing gclid or fbclid column and strips those fields', () => {
    assert.equal(
      isMissingClickIdColumn({
        code: 'PGRST204',
        message: "Could not find the 'gclid' column of 'leads' in the schema cache",
      }),
      true,
    );
    assert.equal(
      isMissingClickIdColumn({ code: '23514', message: 'violates check constraint' }),
      false,
    );

    const row = omitClickIdColumns({ source: 'Google Ads', gclid: 'abc', fbclid: 'def', city: 'Clermont' });
    assert.deepEqual(row, { source: 'Google Ads', city: 'Clermont' });
  });
});

describe('first-touch storage', () => {
  it('does not overwrite or mix UTMs once the first touch is stored', () => {
    const merged = mergeFirstTouchUtm(
      { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'brand' },
      { utm_source: 'facebook', utm_medium: 'paid', utm_campaign: 'retarget', utm_term: 'barn' },
    );
    assert.deepEqual(merged, {
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'brand',
    });
  });

  it('stores the first URL that actually has UTMs', () => {
    const merged = mergeFirstTouchUtm(
      {},
      { utm_source: 'fb', utm_medium: 'paid', utm_campaign: 'prospecting' },
    );
    assert.equal(merged.utm_source, 'fb');
    assert.equal(merged.utm_campaign, 'prospecting');
  });

  it('keeps the first click id and landing page', () => {
    assert.equal(firstTouchValue('original-gclid', 'later-gclid'), 'original-gclid');
    assert.equal(firstTouchValue('', 'later-gclid'), 'later-gclid');
    assert.equal(firstTouchValue(null, 'https://floridapolebarn.com/quote'), 'https://floridapolebarn.com/quote');
  });

  it('locks the landing referrer, including when the first one is empty', () => {
    assert.equal(
      mergeFirstTouchReferrer(true, 'https://www.google.com/', 'https://floridapolebarn.com/'),
      'https://www.google.com/',
    );
    assert.equal(
      mergeFirstTouchReferrer(true, '', 'https://floridapolebarn.com/open-pole-barns'),
      '',
    );
    assert.equal(
      mergeFirstTouchReferrer(false, '', 'https://www.google.com/search?q=barn'),
      'https://www.google.com/search?q=barn',
    );
  });
});
