import React, { createContext, useContext, useState } from 'react';

interface MembershipContextType {
  membershipTier: 'free' | 'pro' | 'enterprise';
  aiGenerationFeeRate: number;
  paymentProcessingRate: number;
  calculateAiFee: (amount: number) => number;
  calculatePaymentFee: (amount: number) => number;
  calculateVisitorFees: (amount: number) => { visitorFee: number; adminFee: number; total: number };
}

const MembershipContext = createContext<MembershipContextType>({
  membershipTier: 'free',
  aiGenerationFeeRate: 0.01,
  paymentProcessingRate: 0.03,
  calculateAiFee: () => 0,
  calculatePaymentFee: () => 0,
  calculateVisitorFees: () => ({ visitorFee: 0, adminFee: 0, total: 0 }),
});

export const useMembership = () => useContext(MembershipContext);

export const MembershipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [membershipTier] = useState<'free' | 'pro' | 'enterprise'>('free');
  
  const aiGenerationFeeRate = 0.01; // 1% AI generation fee for all tiers
  const paymentProcessingRate = membershipTier === 'enterprise' ? 0.025 : 0.03;
  
  const calculateAiFee = (amount: number) => amount * aiGenerationFeeRate;
  const calculatePaymentFee = (amount: number) => amount * paymentProcessingRate;
  
  const calculateVisitorFees = (amount: number) => {
    const visitorFee = amount * 0.10; // 10% visitor booking fee
    const adminFee = amount * 0.03; // 3% administrative fee
    const total = visitorFee + adminFee;
    return { visitorFee, adminFee, total };
  };
  
  return (
    <MembershipContext.Provider value={{
      membershipTier,
      aiGenerationFeeRate,
      paymentProcessingRate,
      calculateAiFee,
      calculatePaymentFee,
      calculateVisitorFees,
    }}>
      {children}
    </MembershipContext.Provider>
  );
};