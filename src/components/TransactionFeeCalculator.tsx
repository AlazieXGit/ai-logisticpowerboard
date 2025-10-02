import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, Zap, CreditCard, AlertTriangle } from 'lucide-react';

interface TransactionFeeCalculatorProps {
  baseAmount: number;
  membershipTier: 'free' | 'pro' | 'enterprise' | 'visitor';
  isVisitor?: boolean;
}

const TransactionFeeCalculator: React.FC<TransactionFeeCalculatorProps> = ({
  baseAmount,
  membershipTier,
  isVisitor = false
}) => {
  const safeBaseAmount = typeof baseAmount === 'number' && !isNaN(baseAmount) ? baseAmount : 0;
  
  const aiGenerationFee = safeBaseAmount * 0.03;
  const adminFee = isVisitor ? safeBaseAmount * 0.05 : 0;
  
  const paymentProcessingRate = membershipTier === 'enterprise' ? 0.025 : 0.03;
  const paymentProcessingFee = safeBaseAmount * paymentProcessingRate;
  
  const totalFees = aiGenerationFee + adminFee + paymentProcessingFee;
  const totalAmount = safeBaseAmount + totalFees;
  
  const getBadgeColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-green-100 text-black';
      case 'pro': return 'bg-blue-100 text-black';
      case 'enterprise': return 'bg-purple-100 text-black';
      case 'visitor': return 'bg-orange-100 text-black';
      default: return 'bg-gray-100 text-black';
    }
  };

  return (
    <Card className="bg-blue-900/50 border-lime-500/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-lime-400" />
            <span className="text-sm font-medium text-lime-400">Fee Breakdown</span>
          </div>
          <Badge className={getBadgeColor(membershipTier)}>
            {membershipTier === 'visitor' ? 'Visitor' : `${membershipTier} Member`}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-lime-300">Load Value:</span>
            <span className="font-medium text-lime-400">$<span className="text-number">{safeBaseAmount.toFixed(2)}</span></span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-lime-400" />
              <span className="text-lime-300">AI Generation Fee (<span className="text-number">3</span>%):</span>
            </div>
            <span className="text-lime-400 font-medium">$<span className="text-number">{aiGenerationFee.toFixed(2)}</span></span>
          </div>
          
          {isVisitor && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                <span className="text-lime-300">Administrative Fee (<span className="text-number">5</span>%):</span>
              </div>
              <span className="text-red-400 font-medium">$<span className="text-number">{adminFee.toFixed(2)}</span></span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <CreditCard className="h-3 w-3 text-lime-400" />
              <span className="text-lime-300">Payment Processing (<span className="text-number">{(paymentProcessingRate * 100).toFixed(1)}</span>%):</span>
            </div>
            <span className="text-lime-400 font-medium">$<span className="text-number">{paymentProcessingFee.toFixed(2)}</span></span>
          </div>
          
          <Separator className="my-2 bg-lime-500/30" />
          
          <div className="flex justify-between font-semibold">
            <span className="text-lime-400">Total Amount:</span>
            <span className="text-lg text-lime-400">$<span className="text-number">{totalAmount.toFixed(2)}</span></span>
          </div>
          
          <div className="flex justify-between text-xs text-lime-300">
            <span>Total Fees:</span>
            <span>$<span className="text-number">{totalFees.toFixed(2)}</span> (<span className="text-number">{safeBaseAmount > 0 ? ((totalFees / safeBaseAmount) * 100).toFixed(1) : '0.0'}</span>%)</span>
          </div>
        </div>
        
        {isVisitor && (
          <div className="bg-blue-800/50 p-2 rounded text-xs border border-lime-500/30">
            <p className="text-lime-400 font-medium">💡 Save on fees!</p>
            <p className="text-lime-300">Sign up for free membership to eliminate administrative fees</p>
          </div>
        )}
        
        <div className="bg-green-800/50 p-2 rounded text-xs border border-lime-500/30">
          <p className="text-lime-400 font-medium">🤖 AI Value Delivered:</p>
          <p className="text-lime-300"><span className="text-number">40</span>% better matching • <span className="text-number">12</span>% fuel savings • <span className="text-number">85</span>% fraud reduction</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionFeeCalculator;