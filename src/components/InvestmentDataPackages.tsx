import React, { useState } from 'react';
import { TrendingUp, ShoppingCart, Download, Lock, Unlock, Crown, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from './ui/use-toast';
import { CancellationFeeCalculator } from './CancellationFeeCalculator';

interface InvestmentPackage {
  id: string;
  name: string;
  type: 'investment' | 'buyout';
  price: number;
  icon: React.ReactNode;
  description: string;
  features: string[];
  dataAccess: string[];
  projectedROI: string;
  timeframe: string;
  popular?: boolean;
  exclusive?: boolean;
}

export const InvestmentDataPackages: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();
  const [showCancellation, setShowCancellation] = useState<string | null>(null);
  const hasInvestmentPlan = user?.subscriptionType === 'investment' || user?.role === 'admin';

  // Only show if user has investment plan activated
  if (!hasInvestmentPlan) {
    return (
      <div className="text-center py-12">
        <Lock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Investment Plan Required</h3>
        <p className="text-gray-500">Activate your investment plan to access these premium data packages.</p>
      </div>
    );
  }

  const investmentPackages: InvestmentPackage[] = [
    {
      id: 'premium-investment',
      name: 'Premium Investment Data Package',
      type: 'investment',
      price: 12500,
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Elite-level analytics for serious investors with 3-year revenue projections',
      features: [
        'Complete 7K+ FMCSA carrier database',
        'Real-time market intelligence',
        'AI-powered revenue forecasting',
        'Exclusive industry insights',
        'Custom investment analytics',
        'Quarterly market reports',
        'Direct access to platform metrics',
        'Priority customer support'
      ],
      dataAccess: [
        'Full carrier compliance data',
        'Historical revenue patterns',
        'Market penetration analytics',
        'Competitive intelligence',
        'Growth trajectory modeling',
        'Risk assessment matrices'
      ],
      projectedROI: '340% over 3 years',
      timeframe: '36 months',
      popular: true
    },
    {
      id: 'complete-buyout',
      name: 'Complete Data Ownership Buyout',
      type: 'buyout',
      price: 75000,
      icon: <Crown className="h-6 w-6" />,
      description: 'Full ownership of all platform data and proprietary algorithms',
      features: [
        'Complete database ownership',
        'Proprietary AI algorithms',
        'Source code access',
        'White-label licensing rights',
        'Unlimited commercial usage',
        'Exclusive market position',
        'Full technical documentation',
        'Ongoing technical support',
        'Revenue sharing agreements',
        'Expansion territory rights'
      ],
      dataAccess: [
        'Complete FMCSA database',
        'All historical transactions',
        'Proprietary matching algorithms',
        'User behavior analytics',
        'Financial performance data',
        'Competitive advantage metrics',
        'Future development roadmap'
      ],
      projectedROI: '850% over 3 years',
      timeframe: 'Lifetime ownership',
      exclusive: true
    }
  ];

  const handlePurchase = (pkg: InvestmentPackage) => {
    if (!isAuthenticated) {
      toast({ title: 'Please sign in', description: 'Sign in to purchase investment package' });
      return;
    }
    
    toast({ 
      title: 'Investment Package Purchase', 
      description: `Processing ${pkg.name} - ${pkg.price.toLocaleString()} USD...` 
    });
  };

  const toggleCancellation = (packageId: string) => {
    setShowCancellation(showCancellation === packageId ? null : packageId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Investment Data Packages
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Premium data packages designed for serious investors seeking maximum ROI in the logistics technology sector
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {investmentPackages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative transition-all duration-300 hover:shadow-2xl ${
              pkg.exclusive ? 'border-purple-500 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50' :
              pkg.popular ? 'border-blue-500 shadow-lg' : 'hover:border-blue-300'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            {pkg.exclusive && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-4 py-1">
                  <Crown className="h-3 w-3 mr-1" />
                  Exclusive
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto p-4 rounded-full ${
                pkg.exclusive ? 'bg-purple-100 text-purple-600' :
                pkg.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {pkg.icon}
              </div>
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <CardDescription className="text-sm">{pkg.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-green-600">
                  ${pkg.price.toLocaleString()}
                </span>
                <div className="text-sm text-gray-500 mt-1">
                  {pkg.timeframe}
                </div>
              </div>
              <div className="mt-2 p-2 bg-green-50 rounded-lg">
                <div className="text-sm font-semibold text-green-700">
                  Projected ROI: {pkg.projectedROI}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-green-700">Premium Features:</h4>
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Unlock className="h-4 w-4 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-blue-700">Data Access:</h4>
                {pkg.dataAccess.map((access, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4 text-blue-600" />
                    <span>{access}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4">
                <Button 
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full ${
                    pkg.exclusive 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Invest in {pkg.name}
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCancellation(pkg.id)}
                  className="w-full text-sm"
                >
                  View Investment Terms
                </Button>
              </div>
              
              {showCancellation === pkg.id && (
                <div className="mt-4">
                  <CancellationFeeCalculator originalAmount={pkg.price} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestmentDataPackages;