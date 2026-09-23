/**
 * Marketing-channel attribution for website leads.
 *
 * Canonical `source` / `lead_source` values (capture method is never one of these):
 *   Google Ads | Google Organic | Meta Ads | Organic Social | Referral | Direct | AI Search | Email | Other
 *
 * Unpaid Google search is **Google Organic**, not "Organic Search". CRM was splitting
 * the same channel across both labels. Aliases such as "organic search", "google organic",
 * and a google referrer with no click id all normalize to Google Organic.
 *
 * Priority:
 *   1. Click ids — gclid → Google Ads, fbclid → Meta Ads (gclid wins if both are present)
 *   2. Paid UTMs — google/adwords + cpc/ppc/paid → Google Ads; fb/facebook/ig/instagram/meta + paid → Meta Ads
 *   3. Other UTMs — email, AI (chatgpt.com and similar), Google Organic, bare Meta source → Meta Ads,
 *      social mediums → Organic Social, anything else recognized as a UTM → Other
 *   4. Referrer host — google search → Google Organic, facebook/instagram → Organic Social,
 *      AI hosts → AI Search, other external sites → Referral
 *   5. Direct
 *
 * Bare utm_source values fb / facebook / instagram / ig / meta (no organic or social medium)
 * map to Meta Ads. A facebook or instagram referrer without fbclid stays Organic Social.
 * Raw utm_source strings are never written as the channel.
 *
 * First-touch: the first URL that carries any utm_* wins the whole set (later pages
 * cannot overwrite or mix in a second campaign). gclid, fbclid, and landing_page
 * stick once set. The landing referrer is captured once, including when it is empty,
 * so a later internal navigation cannot replace it.
 */

export const LEAD_CHANNELS = [
  'Google Ads',
  'Google Organic',
  'Meta Ads',
  'Organic Social',
  'Referral',
  'Direct',
  'AI Search',
  'Email',
  'Other',
] as const;

export type LeadChannel = (typeof LEAD_CHANNELS)[number];

export interface LeadAttributionInput {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  referrer?: string | null;
  referrer_url?: string | null;
  landing_page?: string | null;
}

export interface LeadAttributionColumns {
  source: LeadChannel;
  lead_source: LeadChannel;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer_url: string | null;
  landing_page: string | null;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type UtmKey = (typeof UTM_KEYS)[number];

const PAID_MEDIUMS = new Set([
  'cpc', 'ppc', 'paid', 'paid_social', 'cpm', 'display',
  'paid_search', 'sem', 'cpc_search', 'ppc_search', 'ad', 'ads',
]);

const GOOGLE_ADS_SOURCES = new Set(['adwords', 'googleads', 'google_ads']);
const GOOGLE_ORGANIC_ALIASES = new Set([
  'google_organic', 'organic_search', 'organic', 'seo',
]);
const META_SOURCES = new Set([
  'facebook', 'facebook.com', 'fb', 'fb.com',
  'instagram', 'instagram.com', 'ig', 'meta', 'meta.com',
]);
const EMAIL_MEDIUMS = new Set(['email', 'e_mail', 'newsletter']);
const EMAIL_SOURCES = new Set([
  'email', 'e_mail', 'newsletter', 'mailchimp', 'klaviyo', 'sendgrid',
  'constantcontact', 'constant_contact',
]);
const AI_SOURCES = new Set([
  'chatgpt', 'chatgpt.com', 'openai', 'openai.com', 'chat.openai.com',
  'perplexity', 'perplexity.ai', 'claude', 'claude.ai', 'anthropic', 'anthropic.com',
  'gemini', 'bard', 'copilot', 'you.com', 'phind', 'phind.com',
]);
const ORGANIC_SOCIAL_MEDIUMS = new Set([
  'social', 'organic_social', 'social_organic', 'post', 'story', 'feed', 'profile',
]);
const SOCIAL_SOURCES = new Set([
  'tiktok', 'tiktok.com', 'linkedin', 'linkedin.com', 'twitter', 'twitter.com',
  'x', 'x.com', 'pinterest', 'pinterest.com', 'youtube', 'youtube.com',
  'nextdoor', 'nextdoor.com', 'reddit', 'reddit.com', 'threads', 'snapchat',
]);

const AI_DOMAINS = [
  'chatgpt.com', 'openai.com', 'perplexity.ai', 'claude.ai', 'anthropic.com',
  'you.com', 'phind.com', 'gemini.google.com', 'bard.google.com', 'copilot.microsoft.com',
];
const SOCIAL_DOMAINS = [
  'facebook.com', 'fb.com', 'fb.me', 'instagram.com',
  'tiktok.com', 'linkedin.com', 'lnkd.in', 'twitter.com', 'x.com', 't.co',
  'pinterest.com', 'youtube.com', 'youtu.be', 'nextdoor.com', 'reddit.com',
  'threads.net', 'snapchat.com',
];
const OTHER_SEARCH_DOMAINS = [
  'bing.com', 'yahoo.com', 'duckduckgo.com', 'ecosia.org', 'baidu.com', 'yandex.com', 'yandex.ru',
];

function emptyToNull(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

/** Lowercase, strip a protocol/path, and turn spaces or hyphens into underscores. Dots stay so hosts like chatgpt.com still match. */
function normalizeToken(value: string | null | undefined): string {
  return (value ?? '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/[?#].*$/, '')
    .replace(/\/.*$/, '')
    .replace(/[\s-]+/g, '_');
}

function isPaidMedium(medium: string): boolean {
  return PAID_MEDIUMS.has(medium);
}

function isGoogleSource(source: string): boolean {
  return source === 'google' || source === 'google.com';
}

function isMetaSource(source: string): boolean {
  return META_SOURCES.has(source);
}

function isExplicitOrganicMedium(medium: string): boolean {
  return medium === 'organic' || medium === 'seo' || ORGANIC_SOCIAL_MEDIUMS.has(medium);
}

function hostIs(host: string, domain: string): boolean {
  return host === domain || host.endsWith('.' + domain);
}

function isOwnHost(host: string): boolean {
  return host === 'localhost' || host === '127.0.0.1' || hostIs(host, 'floridapolebarn.com');
}

function isGoogleAdsHost(host: string): boolean {
  return hostIs(host, 'googleadservices.com')
    || hostIs(host, 'doubleclick.net')
    || hostIs(host, 'googlesyndication.com');
}

function isGoogleSearchHost(host: string): boolean {
  return /(^|\.)google\.com$/.test(host)
    || /(^|\.)google\.com\.[a-z]{2}$/.test(host)
    || /(^|\.)google\.co\.[a-z]{2}$/.test(host)
    || /(^|\.)google\.[a-z]{2}$/.test(host);
}

function matchesDomain(host: string, domains: readonly string[]): boolean {
  return domains.some(domain => hostIs(host, domain));
}

function parseReferrer(referrer: string): URL | null {
  const trimmed = referrer.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed);
  } catch {
    try {
      return new URL('https://' + trimmed);
    } catch {
      return null;
    }
  }
}

function resolveFromReferrer(referrer: string): LeadChannel {
  const url = parseReferrer(referrer);
  if (!url) return 'Direct';

  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (!host || isOwnHost(host)) return 'Direct';
  if (isGoogleAdsHost(host)) return 'Google Ads';
  if (isGoogleSearchHost(host) && (url.pathname.includes('/aclk') || url.pathname.includes('/pagead'))) {
    return 'Google Ads';
  }
  if (matchesDomain(host, AI_DOMAINS)) return 'AI Search';
  if (isGoogleSearchHost(host)) return 'Google Organic';
  if (matchesDomain(host, SOCIAL_DOMAINS)) return 'Organic Social';
  if (matchesDomain(host, OTHER_SEARCH_DOMAINS)) return 'Other';
  return 'Referral';
}

/**
 * Resolve the marketing channel for a lead. Safe to call on the client or the server.
 * Capture methods (Website Form, Website Chat, Website) are not channels and are ignored.
 */
export function resolveLeadSource(input: LeadAttributionInput = {}): LeadChannel {
  const source = normalizeToken(input.utm_source);
  const medium = normalizeToken(input.utm_medium);
  const gclid = (input.gclid ?? '').trim();
  const fbclid = (input.fbclid ?? '').trim();
  const referrer = (input.referrer ?? input.referrer_url ?? '').trim();

  if (gclid) return 'Google Ads';
  if (fbclid) return 'Meta Ads';

  if (GOOGLE_ADS_SOURCES.has(source) || (isGoogleSource(source) && isPaidMedium(medium))) {
    return 'Google Ads';
  }
  if (isMetaSource(source) && isPaidMedium(medium)) return 'Meta Ads';

  if (EMAIL_MEDIUMS.has(medium) || EMAIL_SOURCES.has(source)) return 'Email';
  if (AI_SOURCES.has(source)) return 'AI Search';
  if (isPaidMedium(medium)) return 'Other';

  if (
    GOOGLE_ORGANIC_ALIASES.has(source)
    || isGoogleSource(source)
    || (!source && (medium === 'organic' || medium === 'seo'))
  ) {
    return 'Google Organic';
  }

  if (isMetaSource(source)) {
    return isExplicitOrganicMedium(medium) ? 'Organic Social' : 'Meta Ads';
  }

  if (isExplicitOrganicMedium(medium) || SOCIAL_SOURCES.has(source)) return 'Organic Social';
  if (medium === 'referral' || medium === 'affiliate') return 'Referral';
  if (source || medium) return 'Other';

  return resolveFromReferrer(referrer);
}

/** Drop click-id fields when the leads table does not have those columns yet. */
export function omitClickIdColumns<T extends Record<string, unknown>>(row: T): Omit<T, 'gclid' | 'fbclid'> {
  const copy = { ...row };
  delete copy.gclid;
  delete copy.fbclid;
  return copy;
}

/**
 * True when PostgREST or Postgres rejected the insert because gclid/fbclid
 * are not columns. Callers retry without those fields so the lead is still saved.
 */
export function isMissingClickIdColumn(error: { code?: string | null; message?: string | null }): boolean {
  const message = (error.message ?? '').toLowerCase();
  if (!message.includes('gclid') && !message.includes('fbclid')) return false;
  return error.code === 'PGRST204' || error.code === '42703' || message.includes('column');
}

/** Columns written to `leads.source` / `leads.lead_source` plus the raw attribution fields. */
export function leadAttributionColumns(input: LeadAttributionInput): LeadAttributionColumns {
  const utm_source = emptyToNull(input.utm_source);
  const utm_medium = emptyToNull(input.utm_medium);
  const utm_campaign = emptyToNull(input.utm_campaign);
  const utm_term = emptyToNull(input.utm_term);
  const utm_content = emptyToNull(input.utm_content);
  const gclid = emptyToNull(input.gclid);
  const fbclid = emptyToNull(input.fbclid);
  const referrer_url = emptyToNull(input.referrer_url ?? input.referrer);
  const landing_page = emptyToNull(input.landing_page);
  const channel = resolveLeadSource({
    utm_source,
    utm_medium,
    gclid,
    fbclid,
    referrer: referrer_url,
  });

  return {
    source: channel,
    lead_source: channel,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    gclid,
    fbclid,
    referrer_url,
    landing_page,
  };
}

/**
 * First-touch UTM merge. Once any utm_* value is stored, later pages cannot
 * overwrite it or fill in a different campaign's missing keys.
 */
export function mergeFirstTouchUtm(
  stored: Partial<Record<UtmKey, string | null>>,
  incoming: Partial<Record<UtmKey, string | null>>,
): Partial<Record<UtmKey, string>> {
  const hasStored = UTM_KEYS.some(key => (stored[key] ?? '').trim());
  const winner = hasStored ? stored : incoming;
  const out: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const val = (winner[key] ?? '').trim();
    if (val) out[key] = val;
  }
  return out;
}

/** Keep the first non-empty click id or landing page. */
export function firstTouchValue(stored: string | null | undefined, incoming: string | null | undefined): string {
  const existing = (stored ?? '').trim();
  if (existing) return existing;
  return (incoming ?? '').trim();
}

/**
 * Landing referrer is captured once. An empty first referrer stays empty so a
 * later same-site page load cannot replace Direct with an internal URL.
 */
export function mergeFirstTouchReferrer(
  alreadyCaptured: boolean,
  stored: string | null | undefined,
  incoming: string | null | undefined,
): string {
  if (alreadyCaptured) return (stored ?? '').trim();
  return (incoming ?? '').trim();
}

/**
 * Reads UTM params from the current URL and stores them in sessionStorage
 * so they persist through multi-page journeys.
 * Called automatically on each navigation via GTMPageView.
 */
export function captureUtmParams() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const clickKeys = ['gclid', 'fbclid'] as const;

  const storedUtm: Partial<Record<UtmKey, string | null>> = {};
  const incomingUtm: Partial<Record<UtmKey, string | null>> = {};
  for (const key of UTM_KEYS) {
    storedUtm[key] = sessionStorage.getItem(key);
    incomingUtm[key] = params.get(key);
  }
  const hasStoredUtm = UTM_KEYS.some(key => (storedUtm[key] ?? '').trim());
  if (!hasStoredUtm) {
    const merged = mergeFirstTouchUtm(storedUtm, incomingUtm);
    for (const key of UTM_KEYS) {
      const val = merged[key];
      if (val) sessionStorage.setItem(key, val);
    }
  }

  // Capture click IDs on first touch only (they belong to the originating click)
  clickKeys.forEach(key => {
    const next = firstTouchValue(sessionStorage.getItem(key), params.get(key));
    if (next && !sessionStorage.getItem(key)) sessionStorage.setItem(key, next);
  });

  // Capture landing page on first touch only
  const landing = firstTouchValue(sessionStorage.getItem('landing_page'), window.location.href);
  if (landing && !sessionStorage.getItem('landing_page')) {
    sessionStorage.setItem('landing_page', landing);
  }

  const referrer = mergeFirstTouchReferrer(
    sessionStorage.getItem('referrer_captured') === '1',
    sessionStorage.getItem('referrer_url'),
    document.referrer,
  );
  if (!sessionStorage.getItem('referrer_captured')) {
    sessionStorage.setItem('referrer_captured', '1');
    if (referrer) sessionStorage.setItem('referrer_url', referrer);
  }
}

export interface StoredUtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  lead_source: LeadChannel;
  referrer_url: string;
  landing_page: string;
}

/**
 * Returns stored UTM data + a resolved human-readable lead_source.
 * On the server (no window) every field is empty and the channel is Direct.
 */
export function getStoredUtmData(): StoredUtmData {
  if (typeof window === 'undefined') {
    return {
      utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
      gclid: '', fbclid: '', lead_source: 'Direct', referrer_url: '', landing_page: '',
    };
  }

  const source   = sessionStorage.getItem('utm_source')   || '';
  const medium   = sessionStorage.getItem('utm_medium')   || '';
  const campaign = sessionStorage.getItem('utm_campaign') || '';
  const term     = sessionStorage.getItem('utm_term')     || '';
  const content  = sessionStorage.getItem('utm_content')  || '';
  // After the landing referrer is captured, do not fall back to document.referrer.
  // A later full page load would report the previous page on this site.
  const referrer = sessionStorage.getItem('referrer_captured') === '1'
    ? (sessionStorage.getItem('referrer_url') || '')
    : (sessionStorage.getItem('referrer_url') || document.referrer || '');
  const landing  = sessionStorage.getItem('landing_page') || window.location.href;

  const gclid  = sessionStorage.getItem('gclid')  || '';
  const fbclid = sessionStorage.getItem('fbclid') || '';

  const lead_source = resolveLeadSource({
    utm_source: source,
    utm_medium: medium,
    gclid,
    fbclid,
    referrer,
  });

  return {
    utm_source: source, utm_medium: medium, utm_campaign: campaign,
    utm_term: term, utm_content: content, gclid, fbclid, lead_source,
    referrer_url: referrer, landing_page: landing,
  };
}
