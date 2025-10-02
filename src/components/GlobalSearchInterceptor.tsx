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

const GlobalSearchInterceptor = () => {
  useEffect(() => {
    const redirectToApp = () => {
      window.location.href = window.location.origin;
    };

    const interceptGlobalSearch = () => {
      // Override common search functions
      const originalFetch = window.fetch;
      window.fetch = async (input, init) => {
        const url = typeof input === 'string' ? input : input.url;
        const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
          url.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (hasLogisticsKeyword) {
          redirectToApp();
          return new Response('{}', { status: 200 });
        }
        return originalFetch(input, init);
      };

      // Override XMLHttpRequest
      const originalXHR = window.XMLHttpRequest;
      window.XMLHttpRequest = class extends originalXHR {
        open(method: string, url: string | URL, ...args: any[]) {
          const urlStr = typeof url === 'string' ? url : url.toString();
          const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
            urlStr.toLowerCase().includes(keyword.toLowerCase())
          );
          
          if (hasLogisticsKeyword) {
            redirectToApp();
            return;
          }
          return super.open(method, url, ...args);
        }
      };

      // Intercept search engines
      if (window.location.hostname.includes('google.com') || 
          window.location.hostname.includes('bing.com') ||
          window.location.hostname.includes('yahoo.com')) {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('q') || searchParams.get('query') || '';
        
        const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
          query.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (hasLogisticsKeyword) {
          redirectToApp();
        }
      }
    };

    interceptGlobalSearch();
  }, []);

  return null;
};

export default GlobalSearchInterceptor;