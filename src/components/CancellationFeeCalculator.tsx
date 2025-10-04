import React from 'react';
import { AlertTriangle, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface CancellationFeeCalculatorProps {
  originalAmount: number;
  showDetails?: boolean;
}

export const CancellationFeeCalculator: React.FC<CancellationFeeCalculatorProps> = ({ 
  originalAmount, 
  showDetails = true 
}) => {
  const CANCELLATION_FEE_RATE = 0.05; // 5%
  const cancellationFee = originalAmount * CANCELLATION_FEE_RATE;
  const refundAmount = originalAmount - cancellationFee;

  if (!showDetails) {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-600">
        <AlertTriangle className="h-4 w-4" />
        <span>5% cancellation fee applies</span>
      </div>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <Calculator className="h-5 w-5" />
          Cancellation Fee Breakdown
        </CardTitle>
        <CardDescription className="text-amber-700">
          A 5% cancellation fee applies to all cancelled subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">Original Amount:</span>
          <span className="font-semibold">${originalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Cancellation Fee (5%):</span>
          <Badge variant="destructive">-${cancellationFee.toFixed(2)}</Badge>
        </div>
        <div className="border-t pt-2 flex justify-between items-center font-semibold">
          <span>Refund Amount:</span>
          <span className="text-green-600">${refundAmount.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CancellationFeeCalculator;