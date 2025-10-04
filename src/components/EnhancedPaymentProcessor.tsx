import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentAttempt {
  attempt: number;
  status: 'processing' | 'failed' | 'success';
  timestamp: string;
  errorMessage?: string;
}

interface PaymentProcessorProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
  onFinalFailure?: () => void;
}

const EnhancedPaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  description,
  onSuccess,
  onFinalFailure
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [attempts, setAttempts] = useState<PaymentAttempt[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [finalStatus, setFinalStatus] = useState<'success' | 'failed' | null>(null);

  const processPayment = async (attemptNumber: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment success/failure with increasing success rate per attempt
        const successRate = attemptNumber === 1 ? 0.6 : attemptNumber === 2 ? 0.8 : 0.95;
        const success = Math.random() < successRate;
        resolve(success);
      }, 2000);
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setAttempts([]);
    setCurrentAttempt(0);
    setFinalStatus(null);

    const maxAttempts = 3;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      setCurrentAttempt(attempt);
      
      const newAttempt: PaymentAttempt = {
        attempt,
        status: 'processing',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setAttempts(prev => [...prev, newAttempt]);
      
      try {
        const success = await processPayment(attempt);
        
        if (success) {
          setAttempts(prev => prev.map(a => 
            a.attempt === attempt ? { ...a, status: 'success' } : a
          ));
          setFinalStatus('success');
          setIsProcessing(false);
          
          toast({
            title: 'Payment Successful!',
            description: `Payment of $${amount.toLocaleString()} processed successfully on attempt ${attempt}`,
          });
          
          onSuccess?.();
          return;
        } else {
          const errorMessage = attempt === 1 ? 'Card declined' : 
                              attempt === 2 ? 'Insufficient funds' : 
                              'Network timeout';
          
          setAttempts(prev => prev.map(a => 
            a.attempt === attempt ? { ...a, status: 'failed', errorMessage } : a
          ));
          
          if (attempt < maxAttempts) {
            toast({
              title: `Payment Attempt ${attempt} Failed`,
              description: `${errorMessage}. Retrying in 3 seconds...`,
              variant: 'destructive'
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      } catch (error) {
        setAttempts(prev => prev.map(a => 
          a.attempt === attempt ? { ...a, status: 'failed', errorMessage: 'Processing error' } : a
        ));
      }
    }
    
    // All attempts failed
    setFinalStatus('failed');
    setIsProcessing(false);
    
    toast({
      title: 'Payment Failed',
      description: 'All payment attempts failed. Please try again later or contact support.',
      variant: 'destructive'
    });
    
    onFinalFailure?.();
  };

  const getAttemptStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttemptIcon = (status: string) => {
    switch (status) {
      case 'processing': return <RotateCcw className="h-4 w-4 animate-spin" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Processing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${amount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Processing attempt {currentAttempt} of 3</span>
              <span>{Math.round((currentAttempt / 3) * 100)}%</span>
            </div>
            <Progress value={(currentAttempt / 3) * 100} className="h-2" />
          </div>
        )}

        {attempts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Payment Attempts:</h4>
            {attempts.map((attempt) => (
              <div key={attempt.attempt} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Badge className={getAttemptStatusColor(attempt.status)}>
                    {getAttemptIcon(attempt.status)}
                    Attempt {attempt.attempt}
                  </Badge>
                  <span className="text-sm">{attempt.timestamp}</span>
                </div>
                {attempt.errorMessage && (
                  <span className="text-xs text-red-600">{attempt.errorMessage}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {finalStatus === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              Payment processed successfully! You will receive a confirmation email shortly.
            </AlertDescription>
          </Alert>
        )}

        {finalStatus === 'failed' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              Payment failed after 3 attempts. Please check your payment method or contact support.
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Processing Payment...' : 'Process Payment'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedPaymentProcessor;