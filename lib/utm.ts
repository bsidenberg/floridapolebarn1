/**
 * Reads UTM params from the current URL and stores them in sessionStorage
 * so they persist through multi-page journeys.
 * Called automatically on each navigation via GTMPageView.
 */
export function captureUtmParams() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

  utmKeys.forEach(key => {
    const val = params.get(key);
    if (val) sessionStorage.setItem(key, val);
  });

  // Capture landing page on first touch only
  if (!sessionStorage.getItem('landing_page')) {
    sessionStorage.setItem('landing_page', window.location.href);
  }

  // Always capture referrer if present
  if (document.referrer) {
    sessionStorage.setItem('referrer_url', document.referrer);
  }
}

/**
 * Returns stored UTM data + a resolved human-readable lead_source.
 */
export function getStoredUtmData() {
  if (typeof window === 'undefined') return {};

  const source   = sessionStorage.getItem('utm_source')   || '';
  const medium   = sessionStorage.getItem('utm_medium')   || '';
  const campaign = sessionStorage.getItem('utm_campaign') || '';
  const term     = sessionStorage.getItem('utm_term')     || '';
  const content  = sessionStorage.getItem('utm_content')  || '';
  const referrer = sessionStorage.getItem('referrer_url') || document.referrer || '';
  const landing  = sessionStorage.getItem('landing_page') || window.location.href;

  const lead_source = resolveLeadSource(source, medium, referrer);

  return { utm_source: source, utm_medium: medium, utm_campaign: campaign,
           utm_term: term, utm_content: content, lead_source,
           referrer_url: referrer, landing_page: landing };
}

function resolveLeadSource(source: string, medium: string, referrer: string): string {
  if (source === 'google'   && medium === 'cpc')      return 'Google Ads';
  if (source === 'facebook' || source === 'instagram') return 'Meta Ads';
  if (medium === 'email')                              return 'Email';
  if (medium === 'social')                             return 'Organic Social';
  if (source)                                          return source;
  if (referrer.includes('google'))                     return 'Organic Search';
  if (referrer.includes('facebook') || referrer.includes('instagram')) return 'Organic Social';
  if (referrer && !referrer.includes('floridapolebarn.com')) return 'Referral';
  return 'Direct';
}
