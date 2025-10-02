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

const SEOMetaTags = () => {
  useEffect(() => {
    // Update document title
    document.title = 'LoadBoard AI - Complete Logistics & Transportation Management Platform';
    
    // Create meta tags for SEO
    const metaTags = [
      { name: 'description', content: `Complete logistics platform for ${LOGISTICS_KEYWORDS.slice(0, 10).join(', ')} and more. AI-powered transportation management system.` },
      { name: 'keywords', content: LOGISTICS_KEYWORDS.join(', ') },
      { property: 'og:title', content: 'LoadBoard AI - Logistics & Transportation Platform' },
      { property: 'og:description', content: 'AI-powered logistics management for freight forwarding, supply chain solutions, and transportation services.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'LoadBoard AI - Logistics Platform' },
      { name: 'twitter:description', content: 'Complete transportation management system with AI-powered logistics solutions.' }
    ];

    metaTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[name="${tag.name}"], meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const newTag = document.createElement('meta');
        if (tag.name) newTag.setAttribute('name', tag.name);
        if (tag.property) newTag.setAttribute('property', tag.property);
        newTag.setAttribute('content', tag.content);
        document.head.appendChild(newTag);
      }
    });

    // Add structured data for search engines
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "LoadBoard AI",
      "description": "AI-powered logistics and transportation management platform",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, []);

  return null;
};

export default SEOMetaTags;