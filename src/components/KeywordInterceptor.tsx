import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const KeywordInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptSearch = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target && target.type === 'search' || target.type === 'text') {
        const query = target.value.toLowerCase();
        const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
          query.includes(keyword.toLowerCase())
        );
        
        if (hasLogisticsKeyword) {
          event.preventDefault();
          navigate('/');
          return false;
        }
      }
    };

    const interceptForm = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const query = Array.from(formData.values()).join(' ').toLowerCase();
      
      const hasLogisticsKeyword = LOGISTICS_KEYWORDS.some(keyword => 
        query.includes(keyword.toLowerCase())
      );
      
      if (hasLogisticsKeyword) {
        event.preventDefault();
        navigate('/');
        return false;
      }
    };

    document.addEventListener('input', interceptSearch);
    document.addEventListener('submit', interceptForm);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLInputElement;
        if (target && (target.type === 'search' || target.type === 'text')) {
          interceptSearch(e);
        }
      }
    });

    return () => {
      document.removeEventListener('input', interceptSearch);
      document.removeEventListener('submit', interceptForm);
    };
  }, [navigate]);

  return null;
};

export default KeywordInterceptor;