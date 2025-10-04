import React, { useState } from 'react';
import { Eye, TrendingUp, ShoppingCart, Download, Lock, Unlock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from './ui/use-toast';
import { CancellationFeeCalculator } from './CancellationFeeCalculator';

interface DataPackage {
  id: string;
  name: string;
  type: 'view' | 'investment' | 'purchase';
  price: number;
  icon: React.ReactNode;
  description: string;
  features: string[];
  dataAccess: string[];
  limitations?: string[];
  popular?: boolean;
}

export const DataPackagePricing: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();
  const [showCancellation, setShowCancellation] = useState<string | null>(null);

  // All data packages are now inactive/canceled
  const dataPackages: DataPackage[] = [
    {
      id: 'view-only',
      name: 'View Only',
      type: 'view',
      price: 29,
      icon: <Eye className="h-6 w-6" />,
      description: 'Read-only access to data insights',
      features: [
        'View load data trends',
        'Market analytics dashboard',
        'Historical pricing data',
        'Basic reporting tools'
      ],
      dataAccess: [
        'Load board data (read-only)',
        'Market trends',
        'Pricing analytics'
      ],
      limitations: [
        'No data export',
        'No API access',
        'Limited to 100 queries/month'
      ]
    },
    {
      id: 'investment',
      name: 'Investment Package',
      type: 'investment',
      price: 149,
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Advanced analytics for investment decisions',
      features: [
        'All View Only features',
        'Investment analytics',
        'ROI calculations',
        'Market predictions',
        'Custom reports'
      ],
      dataAccess: [
        'Full market data access',
        'Investment metrics',
        'Predictive analytics',
        'Custom data queries'
      ],
      limitations: [
        'Limited data export (50 records/month)',
        'No commercial redistribution'
      ],
      popular: true
    },
    {
      id: 'purchase',
      name: 'Full Purchase',
      type: 'purchase',
      price: 499,
      icon: <ShoppingCart className="h-6 w-6" />,
      description: 'Complete data ownership and access',
      features: [
        'All Investment features',
        'Unlimited data export',
        'API access',
        'White-label options',
        'Commercial usage rights'
      ],
      dataAccess: [
        'Complete database access',
        'Raw data exports',
        'API endpoints',
        'Real-time data feeds'
      ]
    }
  ];

  const handlePurchase = (pkg: DataPackage) => {
    if (!isAuthenticated) {
      toast({ title: 'Please sign in', description: 'Sign in to purchase data package' });
      return;
    }
    
    toast({ 
      title: 'Service Temporarily Unavailable', 
      description: 'Data subscription packages are currently suspended. Please contact admin for more information.' 
    });
  };

  const toggleCancellation = (packageId: string) => {
    setShowCancellation(showCancellation === packageId ? null : packageId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Data Package Pricing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the right data access level for your needs
        </p>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertDescription className="text-yellow-800">
          <strong>Notice:</strong> All data subscription packages are currently suspended for maintenance and updates. 
          Existing subscribers will maintain access. New subscriptions will be available soon.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-3 gap-6">
        {dataPackages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative transition-all duration-300 opacity-60 ${pkg.popular ? 'border-gray-300' : 'border-gray-200'}`}
          >
            <div className="absolute inset-0 bg-gray-100 opacity-20 rounded-lg"></div>
            
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gray-400 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mx-auto p-3 rounded-full bg-gray-100 text-gray-400">
                {pkg.icon}
              </div>
              <CardTitle className="text-xl text-gray-500">{pkg.name}</CardTitle>
              <CardDescription className="text-sm text-gray-400">{pkg.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-400">
                  ${pkg.price}
                </span>
                <span className="text-gray-400">/month</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <h4 className="font-semibold text-xs text-gray-500">Features:</h4>
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-xs text-gray-500">Data Access:</h4>
                {pkg.dataAccess.map((access, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span>{access}</span>
                  </div>
                ))}
              </div>
              
              {pkg.limitations && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-gray-500">Limitations:</h4>
                  {pkg.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                      <Lock className="h-3 w-3 text-gray-400" />
                      <span>{limitation}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-2 pt-4">
                <Button 
                  onClick={() => handlePurchase(pkg)}
                  disabled={true}
                  className="w-full text-xs bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                >
                  Currently Unavailable
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCancellation(pkg.id)}
                  className="w-full text-xs border-gray-300 text-gray-500"
                >
                  View Cancellation Policy
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

export default DataPackagePricing;