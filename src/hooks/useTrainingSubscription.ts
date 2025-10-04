import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface TrainingSubscription {
  id: string;
  plan: 'beginner' | 'advanced' | 'innovation';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  nextBilling: string;
  price: number;
}

export function useTrainingSubscription() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<TrainingSubscription[]>([]);
  const [loading, setLoading] = useState(false);

  const createSubscription = async (plan: 'beginner' | 'advanced' | 'innovation') => {
    setLoading(true);
    try {
      const prices = { beginner: 29, advanced: 79, innovation: 149 };
      const newSubscription: TrainingSubscription = {
        id: crypto.randomUUID(),
        plan,
        status: 'active',
        price: prices[plan],
        startDate: new Date().toISOString(),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setSubscriptions(prev => [...prev, newSubscription]);
      return { success: true, subscription: newSubscription };
    } catch (error) {
      return { success: false, error: 'Failed to create subscription' };
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string) => {
    setLoading(true);
    try {
      const subscription = subscriptions.find(s => s.id === subscriptionId);
      if (!subscription) throw new Error('Subscription not found');
      
      const cancellationFee = subscription.price * 0.05;
      
      setSubscriptions(prev => 
        prev.map(s => 
          s.id === subscriptionId 
            ? { ...s, status: 'cancelled' as const }
            : s
        )
      );
      
      return { success: true, cancellationFee };
    } catch (error) {
      return { success: false, error: 'Failed to cancel subscription' };
    } finally {
      setLoading(false);
    }
  };

  const getActiveSubscription = (plan: 'beginner' | 'advanced' | 'innovation') => {
    return subscriptions.find(s => s.plan === plan && s.status === 'active');
  };

  return {
    subscriptions,
    loading,
    createSubscription,
    cancelSubscription,
    getActiveSubscription
  };
}