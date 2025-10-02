import React from 'react';
import AppLayout from '@/components/AppLayout';
import PaymentManagement from '@/components/PaymentManagement';

const PaymentPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <PaymentManagement />
      </div>
    </AppLayout>
  );
};

export default PaymentPage;