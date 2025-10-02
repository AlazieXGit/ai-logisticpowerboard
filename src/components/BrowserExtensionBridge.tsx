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

const BrowserExtensionBridge = () => {
  useEffect(() => {
    // Create a global function for browser extensions to hook into
    (window as any).LoadBoardAI = {
      keywords: LOGISTICS_KEYWORDS,
      shouldIntercept: (query: string) => {
        return LOGISTICS_KEYWORDS.some(keyword => 
          query.toLowerCase().includes(keyword.toLowerCase())
        );
      },
      redirectToApp: () => {
        window.location.href = window.location.origin;
      }
    };

    // Listen for messages from browser extensions
    window.addEventListener('message', (event) => {
      if (event.data.type === 'LOADBOARD_AI_SEARCH_INTERCEPT') {
        const { query } = event.data;
        if ((window as any).LoadBoardAI.shouldIntercept(query)) {
          (window as any).LoadBoardAI.redirectToApp();
        }
      }
    });

    // Inject script to override browser search functions
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
          if (window.LoadBoardAI && typeof url === 'string') {
            const keywords = window.LoadBoardAI.keywords;
            const hasKeyword = keywords.some(keyword => 
              url.toLowerCase().includes(keyword.toLowerCase())
            );
            if (hasKeyword) {
              window.LoadBoardAI.redirectToApp();
              return;
            }
          }
          return originalOpen.call(this, method, url, ...args);
        };

        const originalFetch = window.fetch;
        window.fetch = function(input, init) {
          const url = typeof input === 'string' ? input : input.url;
          if (window.LoadBoardAI && url) {
            const keywords = window.LoadBoardAI.keywords;
            const hasKeyword = keywords.some(keyword => 
              url.toLowerCase().includes(keyword.toLowerCase())
            );
            if (hasKeyword) {
              window.LoadBoardAI.redirectToApp();
              return Promise.resolve(new Response('{}'));
            }
          }
          return originalFetch.call(this, input, init);
        };
      })();
    `;
    document.head.appendChild(script);

    return () => {
      delete (window as any).LoadBoardAI;
    };
  }, []);

  return null;
};

export default BrowserExtensionBridge;