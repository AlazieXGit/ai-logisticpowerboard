import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Lock, Calendar, CreditCard } from 'lucide-react';

interface TrainingTimeManagerProps {
  userId: string;
  subscriptionStatus: 'free' | 'trial' | 'active' | 'expired';
  onUpgradeRequired: () => void;
}

const TrainingTimeManager: React.FC<TrainingTimeManagerProps> = ({ 
  userId, 
  subscriptionStatus, 
  onUpgradeRequired 
}) => {
  const [trainingStartDate] = useState(() => {
    const saved = localStorage.getItem(`training_start_${userId}`);
    return saved ? new Date(saved) : new Date();
  });
  
  const [daysRemaining, setDaysRemaining] = useState(90);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(`training_start_${userId}`)) {
      localStorage.setItem(`training_start_${userId}`, trainingStartDate.toISOString());
    }

    const calculateDaysRemaining = () => {
      const now = new Date();
      const expiryDate = new Date(trainingStartDate);
      expiryDate.setDate(expiryDate.getDate() + 90);
      
      const timeDiff = expiryDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      setDaysRemaining(Math.max(0, daysDiff));
      setIsExpired(daysDiff <= 0 && subscriptionStatus === 'free');
    };

    calculateDaysRemaining();
    const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60); // Update hourly
    
    return () => clearInterval(interval);
  }, [userId, trainingStartDate, subscriptionStatus]);

  const getAccessLevel = () => {
    if (subscriptionStatus === 'active') return 'full';
    if (subscriptionStatus === 'trial') return 'trial';
    if (isExpired) return 'expired';
    return 'free';
  };

  const accessLevel = getAccessLevel();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Training Access Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Access Level:</span>
          <Badge variant={accessLevel === 'full' ? 'default' : 
                        accessLevel === 'trial' ? 'secondary' : 
                        accessLevel === 'expired' ? 'destructive' : 'outline'}>
            {accessLevel === 'full' ? 'UNLIMITED' :
             accessLevel === 'trial' ? 'TRIAL ACCESS' :
             accessLevel === 'expired' ? 'EXPIRED' : 'FREE (LIMITED)'}
          </Badge>
        </div>

        {accessLevel === 'free' && (
          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Free training expires in {daysRemaining} days
              <br />
              <small className="text-gray-500">
                Started: {trainingStartDate.toLocaleDateString()}
              </small>
            </AlertDescription>
          </Alert>
        )}

        {accessLevel === 'expired' && (
          <Alert variant="destructive">
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Your 90-day free training period has expired.
              Upgrade to continue accessing training materials.
            </AlertDescription>
          </Alert>
        )}

        {accessLevel === 'trial' && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Trial access active - Full training access until trial expires
            </AlertDescription>
          </Alert>
        )}

        {(accessLevel === 'expired' || (accessLevel === 'free' && daysRemaining <= 7)) && (
          <div className="border-t pt-4">
            <Button onClick={onUpgradeRequired} className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Upgrade for Unlimited Training Access
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-500 border-t pt-2">
          <p>• Free training: 90 days from first access</p>
          <p>• Trial/Premium: Unlimited access</p>
          <p>• All materials remain downloadable during free period</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingTimeManager;