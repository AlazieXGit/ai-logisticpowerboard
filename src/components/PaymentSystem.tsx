import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Send, Download, DollarSign, AlertCircle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { CancellationFeeCalculator } from './CancellationFeeCalculator';

const PaymentSystem: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);

  const processingFee = parseFloat(amount) * 0.03 || 0;
  const totalAmount = parseFloat(amount) + processingFee || 0;
  const CANCELLATION_FEE_RATE = 0.05; // 5% cancellation fee

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast({ title: 'Error', description: 'Please log in to use payment system', variant: 'destructive' });
      return;
    }

    if (!amount || !recipient) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Payment Successful!',
        description: `$${amount} sent to ${recipient}. Processing fee: $${processingFee.toFixed(2)}`,
      });
      
      setAmount('');
      setRecipient('');
    } catch (error) {
      toast({ title: 'Error', description: 'Payment failed. Please try again.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancellation = async () => {
    if (!amount) {
      toast({ title: 'Error', description: 'Please enter amount to calculate cancellation', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const cancellationFee = parseFloat(amount) * CANCELLATION_FEE_RATE;
      const refundAmount = parseFloat(amount) - cancellationFee;
      
      toast({
        title: 'Cancellation Processed',
        description: `Refund of $${refundAmount.toFixed(2)} will be processed in 3-5 business days`,
      });
      
      setAmount('');
      setShowCancellation(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Cancellation failed. Please contact support.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold">Payment System</h3>
            <p className="text-gray-600">Please log in to access the payment system</p>
            <Button>Sign In</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Payment System</h2>
        <p className="text-gray-600">Secure payments with 5% cancellation fee policy</p>
        <div className="flex gap-2 justify-center mt-2">
          <Badge variant="outline">3% Processing Fee</Badge>
          <Badge variant="destructive">5% Cancellation Fee</Badge>
        </div>
      </div>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Payment</TabsTrigger>
          <TabsTrigger value="request">Request Payment</TabsTrigger>
          <TabsTrigger value="advance">Cash Advance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Payment
              </CardTitle>
              <CardDescription>
                Send payments to carriers, brokers, or vendors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Email or ID"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Amount:</span>
                  <span>${amount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>Processing Fee (3%):</span>
                  <span>${processingFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Deducted:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handlePayment} 
                  disabled={isProcessing || !amount || !recipient}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : `Send $${amount || '0.00'}`}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowCancellation(!showCancellation)}
                  disabled={!amount}
                >
                  Cancel Policy
                </Button>
              </div>
              
              {showCancellation && amount && (
                <div className="mt-4">
                  <CancellationFeeCalculator originalAmount={parseFloat(amount)} />
                  <Button 
                    onClick={handleCancellation}
                    disabled={isProcessing}
                    variant="destructive"
                    className="w-full mt-3"
                  >
                    {isProcessing ? 'Processing Cancellation...' : 'Cancel Payment'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Request Payment
              </CardTitle>
              <CardDescription>
                Request payment from clients or partners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="request-amount">Amount ($)</Label>
                  <Input
                    id="request-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="payer">From</Label>
                  <Input
                    id="payer"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Payer email or ID"
                  />
                </div>
              </div>
              
              <CancellationFeeCalculator originalAmount={parseFloat(amount) || 0} showDetails={false} />
              
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing || !amount || !recipient}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : 'Send Payment Request'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cash Advance
              </CardTitle>
              <CardDescription>
                Request cash advance on pending loads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="advance-amount">Advance Amount ($)</Label>
                <Input
                  id="advance-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Advance Amount:</span>
                  <span>${amount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>Processing Fee (3%):</span>
                  <span>${processingFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>You Receive:</span>
                  <span>${(parseFloat(amount) - processingFee || 0).toFixed(2)}</span>
                </div>
              </div>
              
              <CancellationFeeCalculator originalAmount={parseFloat(amount) || 0} showDetails={false} />
              
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing || !amount}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : 'Request Advance'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSystem;