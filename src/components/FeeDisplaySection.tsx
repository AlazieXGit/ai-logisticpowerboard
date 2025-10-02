import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, Calculator, TrendingUp, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FeeDisplaySectionProps {
  totalJobs: number;
  successfulJobs: number;
}

const FeeDisplaySection: React.FC<FeeDisplaySectionProps> = ({ totalJobs, successfulJobs }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  // Only show to admin users
  if (!isAdmin) {
    return null;
  }

  const aiGenerationFee = 0.03; // 3%
  const administrativeFee = 0.05; // 5%
  const cancellationFee = 0.05; // 5%
  const liveAiAutoBookingFee = 0.04; // 4% - NEW FEE
  
  const avgJobValue = 1750;
  const totalRevenue = successfulJobs * avgJobValue;
  const aiFeesCollected = totalRevenue * aiGenerationFee;
  const adminFeesCollected = totalRevenue * administrativeFee;
  const liveAiBookingFees = totalRevenue * liveAiAutoBookingFee;
  const estimatedCancellationFees = (totalJobs - successfulJobs) * avgJobValue * cancellationFee;
  const totalFeesCollected = aiFeesCollected + adminFeesCollected + liveAiBookingFees + estimatedCancellationFees;

  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <DollarSign className="h-5 w-5" />
          Fee Collection Summary (Admin Only)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calculator className="h-4 w-4 text-blue-600" />
              <Badge variant="outline" className="text-xs">3%</Badge>
            </div>
            <div className="text-lg font-bold text-blue-600">${aiFeesCollected.toLocaleString()}</div>
            <div className="text-xs text-gray-600">AI Generation</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="h-4 w-4 text-yellow-600" />
              <Badge variant="outline" className="text-xs">4%</Badge>
            </div>
            <div className="text-lg font-bold text-yellow-600">${liveAiBookingFees.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Live AI Booking</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CreditCard className="h-4 w-4 text-purple-600" />
              <Badge variant="outline" className="text-xs">5%</Badge>
            </div>
            <div className="text-lg font-bold text-purple-600">${adminFeesCollected.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Administrative</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <Badge variant="outline" className="text-xs">5%</Badge>
            </div>
            <div className="text-lg font-bold text-orange-600">${estimatedCancellationFees.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Cancellation</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <Badge className="text-xs bg-green-100 text-green-800">Total</Badge>
            </div>
            <div className="text-lg font-bold text-green-600">${totalFeesCollected.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Collected</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Jobs Processed:</span>
            <span className="font-semibold">{totalJobs.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Successful Jobs:</span>
            <span className="font-semibold text-green-600">{successfulJobs.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Success Rate:</span>
            <span className="font-semibold">{((successfulJobs / totalJobs) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeDisplaySection;