import { useEffect } from 'react';

const LOGISTICS_KEYWORDS = [
  'kwrds.ai', 'AdTargeting', 'WordStream', 'transport logistics',
  'shipping logistics', 'transportation and logistics', 'logistics services',
  'freight forwarding', 'supply chain solutions', 'Polar Mass', 'SEOpital',
  'freight logistics', 'global transport', 'global logistics',
  'logistics provider', 'third party logistics', '3pl', 'digitalsuccess.us',
  'auto transport', 'car transport', 'KeySearch', 'car shipping',
  'international shipping', 'air freight', 'ocean freight', 'sea freight',
  'freight forwarding companies', 'freight forwarding services',
  'logistics management', 'logistics and supply chain management',
  'freight management', 'warehousing', 'warehousing and logistics',
  'logistics company near me', 'logistics services near me',
  'freight transportation services', 'transport services',
  'transportation services', 'Zipline Logistics', 'air cargo logistics',
  'intermodal logistics', 'last mile delivery', 'delivery logistics',
  'reverse logistics', 'cold chain logistics', 'Kuebix', 'SEO.com',
  'cross border logistics', 'trucking logistics', 'truck transportation services',
  'road freight', 'rail logistics', 'railway logistics', 'expedited freight',
  'haulage companies', 'carrier logistics', 'global logistics services',
  'logistics consulting', 'logistics consultant', 'customs clearance',
  'customs brokerage', 'international logistics company',
  'global logistics company', 'sixthcitymarketing.com', 'supply chain logistics',
  'industrial logistics', 'marine logistics', 'sea logistics',
  'logistics solutions', 'express logistics', 'shipping and logistics',
  'delivery companies', 'freight brokerage', 'freight brokers',
  'transportation management solutions', 'transportation management services'
];

const ServiceWorkerInterceptor = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Send keywords to service worker
          if (registration.active) {
            registration.active.postMessage({
              type: 'SET_KEYWORDS',
              keywords: LOGISTICS_KEYWORDS
            });
          }
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Listen for messages from service worker
    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data.type === 'KEYWORD_INTERCEPTED') {
        window.location.href = window.location.origin;
      }
    });
  }, []);

  return null;
};

export default ServiceWorkerInterceptor;