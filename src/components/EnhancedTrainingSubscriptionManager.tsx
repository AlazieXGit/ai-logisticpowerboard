import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTrainingSubscription } from '@/hooks/useTrainingSubscription';

export default function EnhancedTrainingSubscriptionManager() {
  const { user } = useAuth();
  const { subscriptions, loading, cancelSubscription } = useTrainingSubscription();
  const [showCancellation, setShowCancellation] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCancelSubscription = async (subscriptionId: string) => {
    const result = await cancelSubscription(subscriptionId);
    
    if (result.success) {
      setAlert({
        type: 'success',
        message: `Subscription cancelled. Cancellation fee: $${result.cancellationFee?.toFixed(2)}`
      });
    } else {
      setAlert({
        type: 'error',
        message: result.error || 'Failed to cancel subscription'
      });
    }
    
    setShowCancellation(null);
    setTimeout(() => setAlert(null), 5000);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Subscriptions</h2>
        <Badge variant="outline">
          {subscriptions.filter(s => s.status === 'active').length} Active
        </Badge>
      </div>

      {alert && (
        <Alert className={alert.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className={alert.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Training Subscriptions</h3>
            <p className="text-gray-500">You don't have any active training subscriptions yet.</p>
          </CardContent>
        </Card>
      ) : (
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
                
                {subscription.status === 'cancelled' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Subscription cancelled</span>
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
      )}
    </div>
  );
}