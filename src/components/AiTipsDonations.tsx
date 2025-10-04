import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Zap, Brain, Star, Coffee } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const AiTipsDonations: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [5, 10, 25, 50, 100];

  const handleTip = async () => {
    if (!isAuthenticated) {
      toast({ title: 'Error', description: 'Please log in to send tips', variant: 'destructive' });
      return;
    }

    if (!amount) {
      toast({ title: 'Error', description: 'Please enter a tip amount', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Thank You! 🎉',
        description: `Your $${amount} tip helps improve our AI services!`,
      });
      
      setAmount('');
      setMessage('');
    } catch (error) {
      toast({ title: 'Error', description: 'Tip failed. Please try again.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          Support AI Development
        </h2>
        <p className="text-gray-600">Help us improve our AI matching and optimization algorithms</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Tips & Donations
            </CardTitle>
            <CardDescription>
              Support our AI development with a voluntary contribution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tip-amount">Tip Amount ($)</Label>
              <Input
                id="tip-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-xs"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
            
            <div>
              <Label htmlFor="tip-message">Message (Optional)</Label>
              <Textarea
                id="tip-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message for our AI team..."
                rows={3}
              />
            </div>
            
            <Button 
              onClick={handleTip} 
              disabled={isProcessing || !amount || !isAuthenticated}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : `Send $${amount || '0'} Tip`}
            </Button>
            
            {!isAuthenticated && (
              <p className="text-sm text-gray-500 text-center">
                Please log in to send tips
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              How Your Tips Help
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">AI Algorithm Enhancement</p>
                  <p className="text-xs text-gray-600">Improve load matching accuracy and route optimization</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">New Feature Development</p>
                  <p className="text-xs text-gray-600">Fund development of advanced logistics features</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-brown-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Support Our Team</p>
                  <p className="text-xs text-gray-600">Keep our developers caffeinated and motivated</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                100% goes to AI development
              </Badge>
              <p className="text-xs text-gray-500">
                All tips and donations directly fund AI research and development
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Recent AI Improvements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">40%</div>
                <div className="text-sm text-gray-600">Better Load Matching</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12%</div>
                <div className="text-sm text-gray-600">Fuel Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-gray-600">Fraud Reduction</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiTipsDonations;