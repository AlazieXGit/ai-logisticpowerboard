import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const PaymentIntegrationInstructions = () => (
  <Card className="bg-gray-800/50 border-cyan-500">
    <CardHeader>
      <CardTitle className="text-cyan-400 flex items-center gap-2">
        <CreditCard className="h-6 w-6" />
        Payment Integration Instructions
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-300 space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-2">Payment Providers</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Stripe - Credit card processing</li>
            <li>Plaid - Bank account verification</li>
            <li>Wise - International transfers</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Configuration</h3>
          <p className="text-sm">Configure your payment providers in the .env file with the required API keys.</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PaymentIntegrationInstructions;
