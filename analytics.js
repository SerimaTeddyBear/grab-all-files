/*
 * Google tag (gtag.js) for grab-all-files.app
 *
 * SETUP — replace GA_MEASUREMENT_ID below with the real GA4 Measurement ID
 *         (https://analytics.google.com → Admin → Data Streams → Web → "G-XXXXXXXXXX").
 *         While GA_MEASUREMENT_ID is left as the placeholder string this file
 *         short-circuits and no requests are made.
 *
 * Consent Mode v2 defaults (set BEFORE the GA library loads):
 *   - EU/EEA + UK + CH visitors → analytics/ads denied by default. GA still
 *     receives cookieless "consent ping" hits so aggregate reporting works
 *     without writing identifiers. No banner needed for this baseline.
 *   - Everywhere else → analytics granted, ads denied (we don't run ads).
 *   - To prompt EU visitors for full consent later, call
 *     gtag('consent', 'update', { analytics_storage: 'granted', ... }) after
 *     they accept.
 */
(function () {
  var GA_MEASUREMENT_ID = 'G-JT57WKZNTP';
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  var EU_REGIONS = [
    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU',
    'IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
    'IS','LI','NO','GB','CH'
  ];

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: EU_REGIONS,
    wait_for_update: 500
  });
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted'
  });

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_ad_personalization_signals: false
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(s);

  window.gafAnalytics = {
    /*
     * Fire on /purchase/success.html once Stripe redirects with ?session_id=cs_xxx.
     * Stripe Checkout sessions are unique, so transaction_id de-duplicates
     * reloads inside GA4. Value is the catalog price; refine later if the
     * backend ever returns the actual amount in the redirect URL.
     */
    trackPurchase: function (sessionId) {
      if (!window.gtag) return;
      window.gtag('event', 'purchase', {
        transaction_id: sessionId || ('no-session-' + Date.now()),
        value: 19.99,
        currency: 'USD',
        items: [{
          item_id: 'gaf_lifetime',
          item_name: 'Grab All Files Lifetime License',
          price: 19.99,
          quantity: 1
        }]
      });
    }
  };
})();
