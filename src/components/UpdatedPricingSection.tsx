import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Crown, Star, Truck, Database, AlertTriangle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { CancellationFeeCalculator } from './CancellationFeeCalculator';
import { DataPackagePricing } from './DataPackagePricing';

const UpdatedPricingSection: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();

  const handleUpgrade = (tier: string) => {
    if (!isAuthenticated) {
      toast({ title: 'Please sign in', description: 'Sign in to upgrade your membership' });
      return;
    }
    
    toast({ 
      title: 'Upgrade initiated', 
      description: `Upgrading to ${tier} plan...` 
    });
  };

  const plans = [
    {
      name: 'Starter',
      price: 0,
      icon: <Star className="h-6 w-6" />,
      description: 'Perfect for new carriers and testing',
      features: [
        '2 loads per day',
        'Loads up to $500',
        'Basic AI matching',
        'Email support',
        '2% AI processing fee',
        '2% AI dispatching fee',
        '4% payment processing'
      ],
      limitations: [
        'Daily booking limit',
        'Load value cap',
        'No TMS access',
        'No priority support'
      ],
      buttonText: 'Get Started Free',
      popular: false
    },
    {
      name: 'Basic',
      price: 49,
      icon: <Zap className="h-6 w-6" />,
      description: 'Great for small carriers',
      features: [
        '10 loads per day',
        'Loads up to $2,000',
        'Enhanced AI matching',
        'Priority email support',
        '2% AI processing fee',
        '2% AI dispatching fee',
        '3.5% payment processing'
      ],
      limitations: [
        'Daily booking limit',
        'Load value cap'
      ],
      buttonText: 'Upgrade to Basic',
      popular: false
    },
    {
      name: 'Pro',
      price: 149,
      icon: <Truck className="h-6 w-6" />,
      description: 'Best for growing businesses',
      features: [
        'Unlimited daily loads',
        'No load value limits',
        'Advanced AI optimization',
        'Phone & chat support',
        '2% AI processing fee',
        '2% AI dispatching fee',
        '3% payment processing',
        'Route optimization'
      ],
      limitations: [],
      buttonText: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 399,
      icon: <Crown className="h-6 w-6" />,
      description: 'Complete solution for large operations',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        '2% AI processing fee',
        '2% AI dispatching fee',
        '2.5% payment processing',
        'White-label options'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="space-y-12">
      {/* Main Subscription Plans */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Subscription Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All plans include AI-powered load matching with 5% cancellation fee policy
          </p>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">5% Cancellation Fee applies to all plans</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-blue-500 shadow-lg scale-105' : 'hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto p-3 rounded-full ${
                  plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-green-700">Features:</h4>
                  {plan.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-xs text-red-700">Limitations:</h4>
                    {plan.limitations.slice(0, 2).map((limitation, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <X className="h-3 w-3 text-red-600" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <CancellationFeeCalculator originalAmount={plan.price} showDetails={false} />
                </div>
                
                <Button 
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full mt-4 text-xs ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                  disabled={user?.membershipTier === plan.name.toLowerCase()}
                >
                  {user?.membershipTier === plan.name.toLowerCase() 
                    ? 'Current Plan' 
                    : plan.buttonText
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Data Package Pricing Section */}
      <div className="border-t pt-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Database className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Data Packages</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access comprehensive load board data with flexible pricing options
          </p>
        </div>
        
        <DataPackagePricing />
      </div>
    </div>
  );
};

export default UpdatedPricingSection;