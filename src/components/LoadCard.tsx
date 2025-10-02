import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Package, DollarSign, Clock, Truck, AlertTriangle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import VisitorBooking from './VisitorBooking';
import TransactionFeeCalculator from './TransactionFeeCalculator';

interface LoadCardProps {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  rate: number;
  distance: string;
  pickupDate: string;
  equipment: string;
  company: string;
  urgent?: boolean;
}

const LoadCard: React.FC<LoadCardProps> = ({
  id,
  origin,
  destination,
  weight,
  rate,
  distance,
  pickupDate,
  equipment,
  company,
  urgent = false
}) => {
  const { user, isAuthenticated, canBookLoad, bookLoad } = useAppContext();
  const [showVisitorBooking, setShowVisitorBooking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handleMemberBooking = async () => {
    if (!canBookLoad(rate)) {
      if (user?.membershipTier === 'free') {
        if (user.dailyLoadsBooked >= 3) {
          toast({
            title: 'Daily Limit Reached',
            description: 'Free tier allows 3 loads per day. Upgrade for unlimited booking.',
            variant: 'destructive'
          });
        } else if (rate > 1000) {
          toast({
            title: 'Load Value Too High',
            description: 'Free tier limited to $1,000 loads. Upgrade for higher value loads.',
            variant: 'destructive'
          });
        }
      }
      return;
    }

    setIsBooking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (bookLoad(rate)) {
        toast({
          title: 'Load Booked Successfully!',
          description: `Load ${id} has been booked. You'll receive confirmation shortly.`,
        });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Booking failed. Please try again.', variant: 'destructive' });
    } finally {
      setIsBooking(false);
    }
  };

  const getBookingButton = () => {
    if (!isAuthenticated) {
      return (
        <div className="space-y-2">
          <Dialog open={showVisitorBooking} onOpenChange={setShowVisitorBooking}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                Book as Visitor (10% fee)
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-900 border-lime-500/30">
              <DialogHeader>
                <DialogTitle className="text-lime-400">Visitor Booking</DialogTitle>
              </DialogHeader>
              <VisitorBooking 
                loadValue={rate} 
                loadId={id} 
                onClose={() => setShowVisitorBooking(false)} 
              />
            </DialogContent>
          </Dialog>
          <Button className="w-full bg-gradient-to-r from-lime-600 to-black hover:from-lime-700 hover:to-gray-900 text-white" size="sm">
            Sign In to Book
          </Button>
        </div>
      );
    }

    const canBook = canBookLoad(rate);
    const isFreeTier = user?.membershipTier === 'free';
    
    return (
      <div className="space-y-2">
        <Button 
          onClick={handleMemberBooking} 
          disabled={!canBook || isBooking}
          className="w-full bg-gradient-to-r from-lime-600 to-black hover:from-lime-700 hover:to-gray-900 text-white"
        >
          {isBooking ? 'Booking...' : 'Book Load'}
        </Button>
        
        {isFreeTier && !canBook && (
          <div className="text-xs text-red-400 space-y-1">
            {user.dailyLoadsBooked >= 3 && (
              <p>Daily limit reached (<span className="text-number">3</span>/<span className="text-number">3</span>)</p>
            )}
            {rate > 1000 && (
              <p>Load exceeds $<span className="text-number">1,000</span> free tier limit</p>
            )}
            <p className="text-lime-400">Upgrade for unlimited booking</p>
          </div>
        )}
        
        {isFreeTier && canBook && (
          <p className="text-xs text-lime-300">
            Free tier: <span className="text-number">{user.dailyLoadsBooked}</span>/<span className="text-number">3</span> loads today
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg bg-blue-900/50 border-lime-500/30 ${urgent ? 'border-pink-500/50 bg-pink-900/20' : 'hover:border-lime-400/50'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2 text-lime-400">
              <Truck className="h-5 w-5 text-lime-400" />
              Load #<span className="text-number">{id}</span>
              {urgent && <Badge variant="destructive" className="bg-pink-600 text-white">Urgent</Badge>}
            </CardTitle>
            <CardDescription className="text-sm text-lime-300">
              {company}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-lime-400 futuristic-glow">
              $<span className="text-number">{rate.toLocaleString()}</span>
            </div>
            <div className="text-sm text-lime-300">{distance}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-lime-300">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="font-medium text-black bg-lime-400 px-1 rounded">From:</span>
              <span>{origin}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-lime-300">
              <MapPin className="h-4 w-4 text-red-400" />
              <span className="font-medium text-black bg-lime-400 px-1 rounded">To:</span>
              <span>{destination}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-lime-300">
              <Package className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-black bg-lime-400 px-1 rounded">Weight:</span>
              <span>{weight}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-lime-300">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-black bg-lime-400 px-1 rounded">Pickup:</span>
              <span>{pickupDate}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-lime-500/30 text-lime-400">{equipment}</Badge>
          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">Available</Badge>
        </div>
        
        <TransactionFeeCalculator 
          baseAmount={rate} 
          membershipTier={user?.membershipTier || 'visitor'} 
          isVisitor={!isAuthenticated}
        />
        
        {getBookingButton()}
      </CardContent>
    </Card>
  );
};

export default LoadCard;