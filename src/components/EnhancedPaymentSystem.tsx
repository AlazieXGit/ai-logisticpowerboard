import React, { useState } from 'react';
import { CreditCard, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from './ui/use-toast';
import { CancellationFeeCalculator } from './CancellationFeeCalculator';

interface PaymentDetails {
  amount: number;
  type: 'subscription' | 'data-package' | 'cancellation';
  packageName: string;
  features: string[];
}

interface EnhancedPaymentSystemProps {
  paymentDetails: PaymentDetails;
  onPaymentSuccess?: () => void;
  onPaymentCancel?: () => void;
}

export const EnhancedPaymentSystem: React.FC<EnhancedPaymentSystemProps> = ({
  paymentDetails,
  onPaymentSuccess,
  onPaymentCancel
}) => {
  const { user } = useAppContext();
  const [processing, setProcessing] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const CANCELLATION_FEE_RATE = 0.05;
  const cancellationFee = paymentDetails.amount * CANCELLATION_FEE_RATE;
  const processingFee = paymentDetails.amount * 0.029; // 2.9% processing fee
  const totalAmount = paymentDetails.amount + processingFee;

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Payment Successful',
        description: `${paymentDetails.packageName} activated successfully`,
      });
      
      onPaymentSuccess?.();
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'Please try again or contact support',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleCancellation = async () => {
    setProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const refundAmount = paymentDetails.amount - cancellationFee;
      
      toast({
        title: 'Cancellation Processed',
        description: `Refund of $${refundAmount.toFixed(2)} will be processed in 3-5 business days`,
      });
      
      onPaymentCancel?.();
    } catch (error) {
      toast({
        title: 'Cancellation Failed',
        description: 'Please contact support for assistance',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Summary
          </CardTitle>
          <CardDescription>
            {paymentDetails.packageName} - {paymentDetails.type}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Package Price:</span>
              <span>${paymentDetails.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Processing Fee (2.9%):</span>
              <span>${processingFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Included Features:</h4>
            <ul className="text-sm space-y-1">
              {paymentDetails.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentMethod.cardNumber}
                onChange={(e) => setPaymentMethod(prev => ({ ...prev, cardNumber: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={paymentMethod.name}
                onChange={(e) => setPaymentMethod(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={paymentMethod.expiryDate}
                onChange={(e) => setPaymentMethod(prev => ({ ...prev, expiryDate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentMethod.cvv}
                onChange={(e) => setPaymentMethod(prev => ({ ...prev, cvv: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handlePayment}
              disabled={processing}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setShowCancellation(!showCancellation)}
              className="flex-1"
            >
              View Cancellation Policy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      {showCancellation && (
        <div className="space-y-4">
          <CancellationFeeCalculator originalAmount={paymentDetails.amount} />
          
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <XCircle className="h-5 w-5" />
                Cancel Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-red-700 mb-4">
                <AlertTriangle className="h-4 w-4" />
                <span>This action cannot be undone. A 5% cancellation fee will be deducted.</span>
              </div>
              <Button 
                onClick={handleCancellation}
                disabled={processing}
                variant="destructive"
                className="w-full"
              >
                {processing ? 'Processing Cancellation...' : 'Confirm Cancellation'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedPaymentSystem;