import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Building, Shield } from 'lucide-react';

export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  authorizeACH: boolean;
  paymentType: string;
}

interface PaymentMethodFormProps {
  onSubmit: (paymentData: PaymentData) => void;
  required?: boolean;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ onSubmit, required = true }) => {
  const [paymentType, setPaymentType] = useState('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: 'checking',
    authorizeACH: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, paymentType });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-blue-900/50 border-lime-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lime-400">
          <Shield className="h-5 w-5" />
          Payment Method {required && <span className="text-red-400">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={paymentType === 'credit' ? 'default' : 'outline'}
              onClick={() => setPaymentType('credit')}
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Credit/Debit
            </Button>
            <Button
              type="button"
              variant={paymentType === 'ach' ? 'default' : 'outline'}
              onClick={() => setPaymentType('ach')}
              className="flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              ACH/Bank
            </Button>
          </div>

          {paymentType === 'credit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-lime-300">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required={required}
                  />
                </div>
                <div>
                  <Label htmlFor="cardholderName" className="text-lime-300">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required={required}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-lime-300">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required={required}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-lime-300">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required={required}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentType === 'ach' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bankName" className="text-lime-300">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                  required={required}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="routingNumber" className="text-lime-300">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required={required}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber" className="text-lime-300">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required={required}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="accountType" className="text-lime-300">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger className="bg-blue-800/50 border-lime-500/30 text-lime-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="authorizeACH"
                  checked={formData.authorizeACH}
                  onCheckedChange={(checked) => handleInputChange('authorizeACH', checked ? 'true' : 'false')}
                />
                <Label htmlFor="authorizeACH" className="text-lime-300">
                  I authorize ACH transactions and electronic debits
                </Label>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="billingAddress" className="text-lime-300">Billing Address</Label>
            <Input
              id="billingAddress"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              className="bg-blue-800/50 border-lime-500/30 text-lime-100"
              required={required}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="text-lime-300">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                required={required}
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-lime-300">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                required={required}
              />
            </div>
            <div>
              <Label htmlFor="zipCode" className="text-lime-300">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                required={required}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black">
            Save Payment Method
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodForm;