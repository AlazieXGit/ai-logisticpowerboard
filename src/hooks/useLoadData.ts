import { useState, useEffect } from 'react';

interface Load {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  rate: string;
  distance: string;
  pickupDate: string;
  equipment: string;
  status: 'available' | 'pending' | 'booked';
  company: string;
  urgency: 'low' | 'medium' | 'high';
  commodity: string;
}

const generateRandomLoad = (): Load => {
  const origins = [
    'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA',
    'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA', 'Austin, TX',
    'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'San Francisco, CA',
    'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC', 'Boston, MA',
    'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK', 'Portland, OR',
    'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD', 'Milwaukee, WI'
  ];
  
  const companies = [
    'Global Logistics Inc', 'Swift Transport Co', 'Prime Freight Solutions', 'Apex Shipping',
    'Elite Cargo Services', 'Nationwide Trucking', 'Express Delivery Corp', 'Metro Freight',
    'Alliance Transport', 'Superior Logistics', 'Rapid Transit Co', 'Continental Shipping',
    'Premier Freight Lines', 'Dynamic Logistics', 'Unified Transport'
  ];
  
  const equipment = ['Dry Van', 'Flatbed', 'Refrigerated', 'Step Deck', 'Tanker', 'Box Truck'];
  const commodities = ['Electronics', 'Food Products', 'Machinery', 'Textiles', 'Chemicals', 'Auto Parts'];
  
  const origin = origins[Math.floor(Math.random() * origins.length)];
  let destination = origins[Math.floor(Math.random() * origins.length)];
  while (destination === origin) {
    destination = origins[Math.floor(Math.random() * origins.length)];
  }
  
  const weight = (Math.random() * 40000 + 10000).toFixed(0);
  const distance = Math.floor(Math.random() * 2000 + 100);
  const rate = (distance * (Math.random() * 2 + 1.5)).toFixed(0);
  
  const today = new Date();
  const pickupDate = new Date(today.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
  
  return {
    id: `L${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    origin,
    destination,
    weight: `${weight} lbs`,
    rate: `$${rate}`,
    distance: `${distance} mi`,
    pickupDate: pickupDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    equipment: equipment[Math.floor(Math.random() * equipment.length)],
    status: Math.random() > 0.7 ? 'pending' : 'available',
    company: companies[Math.floor(Math.random() * companies.length)],
    urgency: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
    commodity: commodities[Math.floor(Math.random() * commodities.length)]
  };
};

export const useLoadData = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initial load generation
    const initialLoads = Array.from({ length: 50 }, generateRandomLoad);
    setLoads(initialLoads);
    setIsLoading(false);
    
    // Real-time updates - add new loads every 5-15 seconds
    const interval = setInterval(() => {
      setLoads(prevLoads => {
        const newLoad = generateRandomLoad();
        const updatedLoads = [newLoad, ...prevLoads.slice(0, 99)]; // Keep max 100 loads
        return updatedLoads;
      });
    }, Math.random() * 10000 + 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshLoads = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newLoads = Array.from({ length: 50 }, generateRandomLoad);
      setLoads(newLoads);
      setIsLoading(false);
    }, 1000);
  };
  
  return { loads, isLoading, refreshLoads };
};