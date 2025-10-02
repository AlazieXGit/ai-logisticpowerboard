import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, Youtube, CreditCard } from 'lucide-react';

interface SubscriptionManagerProps {
  userId: string;
  onSubscriptionChange: (status: string) => void;
}

interface SubscriptionData {
  status: 'trial' | 'active' | 'expired' | 'free';
  trialEndsAt?: string;
  trainingExpiresAt?: string;
  youtubeSubscribed: boolean;
  plan: 'free' | 'basic' | 'premium';
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ userId, onSubscriptionChange }) => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    status: 'free',
    youtubeSubscribed: false,
    plan: 'free',
    trainingExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  });

  const handleYouTubeSubscribe = () => {
    window.open('https://www.youtube.com/@AlazieXpressAnythang?sub_confirmation=1', '_blank');
    setSubscription(prev => ({ ...prev, youtubeSubscribed: true }));
  };

  const handleStartTrial = () => {
    const trialEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    setSubscription(prev => ({
      ...prev,
      status: 'trial',
      trialEndsAt: trialEnd.toISOString()
    }));
    onSubscriptionChange('trial');
  };

  const handleUpgrade = (plan: 'basic' | 'premium') => {
    setSubscription(prev => ({
      ...prev,
      status: 'active',
      plan
    }));
    onSubscriptionChange('active');
  };

  const isTrainingExpired = subscription.trainingExpiresAt && 
    new Date() > new Date(subscription.trainingExpiresAt);

  const daysUntilTrainingExpires = subscription.trainingExpiresAt ? 
    Math.ceil((new Date(subscription.trainingExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Current Plan:</span>
            <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
              {subscription.plan.toUpperCase()}
            </Badge>
          </div>

          {subscription.status === 'trial' && subscription.trialEndsAt && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Trial expires: {new Date(subscription.trialEndsAt).toLocaleDateString()}
              </AlertDescription>
            </Alert>
          )}

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Training Access</h4>
            {isTrainingExpired ? (
              <Alert variant="destructive">
                <AlertDescription>
                  Free training period expired. Upgrade to continue learning.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  Free training expires in {daysUntilTrainingExpires} days
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">YouTube Membership</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Subscribe to AlazieXpress Anythang
              </span>
              <Button 
                onClick={handleYouTubeSubscribe}
                variant={subscription.youtubeSubscribed ? 'outline' : 'default'}
                size="sm"
              >
                <Youtube className="h-4 w-4 mr-2" />
                {subscription.youtubeSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </div>
          </div>

          {subscription.status === 'free' && (
            <div className="border-t pt-4 space-y-2">
              <Button onClick={handleStartTrial} className="w-full">
                Start 30-Day Free Trial
              </Button>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleUpgrade('basic')} 
                  variant="outline" 
                  className="flex-1"
                >
                  Basic Plan - $29/mo
                </Button>
                <Button 
                  onClick={() => handleUpgrade('premium')} 
                  className="flex-1"
                >
                  Premium Plan - $49/mo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManager;