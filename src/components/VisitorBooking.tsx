import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CreditCard } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

interface VisitorBookingProps {
  loadValue: number;
  loadId: string;
  onClose: () => void;
}

const VisitorBooking: React.FC<VisitorBookingProps> = ({ loadValue, loadId, onClose }) => {
  const { register } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const visitorFee = loadValue * 0.10; // 10% visitor booking fee
  const adminFee = loadValue * 0.03; // 3% administrative fee
  const totalFees = visitorFee + adminFee;
  const totalAmount = loadValue + totalFees;

  const handleVisitorBooking = async () => {
    if (!email || !password) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Register user with free plan
      const success = await register(email, password, 'free');
      
      if (success) {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
          title: 'Booking Successful!',
          description: `Load ${loadId} booked. Total charged: $${totalAmount.toFixed(2)}`,
        });
        
        onClose();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Booking failed. Please try again.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Visitor Booking
        </CardTitle>
        <CardDescription>
          Book this load as a visitor with instant registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Visitor Booking Fees</p>
              <p className="text-xs text-yellow-700 mt-1">
                Higher fees apply for non-members. Consider upgrading for better rates.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Load Value:</span>
            <span>${loadValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-orange-600">
            <span>Visitor Fee (10%):</span>
            <span>${visitorFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-red-600">
            <span>Admin Fee (3%):</span>
            <span>${adminFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleVisitorBooking} 
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By booking, you agree to create a free account and our terms of service.
        </p>
      </CardContent>
    </Card>
  );
};

export default VisitorBooking;