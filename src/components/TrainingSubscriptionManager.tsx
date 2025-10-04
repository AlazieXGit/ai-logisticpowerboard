import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Subscription {
  id: string;
  plan: 'beginner' | 'advanced' | 'innovation';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  nextBilling: string;
  price: number;
}

export default function TrainingSubscriptionManager() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      plan: 'beginner',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-02-15',
      price: 29
    }
  ]);

  const [showCancellation, setShowCancellation] = useState<string | null>(null);

  const handleCancelSubscription = (subscriptionId: string) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (subscription) {
      const cancellationFee = subscription.price * 0.05;
      const confirmed = window.confirm(
        `Cancel subscription? A 5% cancellation fee of $${cancellationFee.toFixed(2)} will be charged.`
      );
      
      if (confirmed) {
        setSubscriptions(prev => 
          prev.map(s => 
            s.id === subscriptionId 
              ? { ...s, status: 'cancelled' as const }
              : s
          )
        );
      }
    }
    setShowCancellation(null);
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'beginner': return 'Beginner Training';
      case 'advanced': return 'Advanced Training';
      case 'innovation': return 'Innovation Training';
      default: return plan;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Subscriptions</h2>
        <Badge variant="outline">
          {subscriptions.filter(s => s.status === 'active').length} Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="hover:shadow-md transition">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {getPlanName(subscription.plan)}
                </CardTitle>
                <Badge className={getStatusColor(subscription.status)}>
                  {subscription.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Monthly Price</p>
                  <p className="font-semibold">${subscription.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-semibold">{new Date(subscription.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Billing</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(subscription.nextBilling).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {subscription.status === 'active' && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Modify Plan
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setShowCancellation(subscription.id)}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              )}
              
              {showCancellation === subscription.id && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-semibold">Cancellation Fee</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-3">
                    A 5% cancellation fee of ${(subscription.price * 0.05).toFixed(2)} will be charged.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleCancelSubscription(subscription.id)}
                    >
                      Confirm Cancellation
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowCancellation(null)}
                    >
                      Keep Subscription
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}