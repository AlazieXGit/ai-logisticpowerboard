import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';

interface TrainingPricingPlansProps {
  onSelectPlan: (plan: 'beginner' | 'advanced' | 'innovation') => void;
}

export default function TrainingPricingPlans({ onSelectPlan }: TrainingPricingPlansProps) {
  const plans = [
    {
      id: 'beginner' as const,
      name: 'Beginner Training',
      price: 29,
      icon: <Check className="h-5 w-5" />,
      color: 'bg-green-600',
      features: [
        'Basic LoadBoard navigation',
        'Account setup & profile',
        'Load searching fundamentals',
        'Basic booking process',
        'Platform overview',
        'Email support'
      ]
    },
    {
      id: 'advanced' as const,
      name: 'Advanced Training',
      price: 79,
      icon: <Star className="h-5 w-5" />,
      color: 'bg-blue-600',
      popular: true,
      features: [
        'Everything in Beginner',
        'Advanced filtering & search',
        'Dispatch dashboard mastery',
        'TMS integration training',
        'Analytics & reporting',
        'Priority support',
        'Live Q&A sessions'
      ]
    },
    {
      id: 'innovation' as const,
      name: 'Innovation Training',
      price: 149,
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-purple-600',
      features: [
        'Everything in Advanced',
        'AI automation setup',
        'Custom workflow creation',
        'API integration training',
        'Advanced analytics',
        'Dedicated support',
        'Monthly 1-on-1 coaching',
        'Beta feature access'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.id} className={`relative hover:shadow-lg transition ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-3 py-1">
                Most Popular
              </Badge>
            </div>
          )}
          <CardHeader className="text-center">
            <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center text-white mx-auto mb-2`}>
              {plan.icon}
            </div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="text-3xl font-bold text-gray-900">
              ${plan.price}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              className={`w-full ${plan.color} hover:opacity-90`}
              onClick={() => onSelectPlan(plan.id)}
            >
              Start {plan.name}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}