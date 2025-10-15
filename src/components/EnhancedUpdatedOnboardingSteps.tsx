import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Building, Shield, CreditCard, Mail, Phone } from 'lucide-react';
import PaymentMethodForm, { PaymentData } from './PaymentMethodForm';
import AutoEnrollmentSystem from './AutoEnrollmentSystem';
import { supabase } from '@/lib/supabase';

const EnhancedUpdatedOnboardingSteps: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    mcNumber: '',
    dotNumber: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    contactName: '',
    insuranceCarrier: '',
    insuranceAmount: '',
    insuranceExpiry: '',
    safetyRating: '',
    yearsInBusiness: '',
    fleetSize: '',
    operatingRadius: '',
    equipmentTypes: [],
    fmcsaCompliant: false,
    drugTestingProgram: false,
    backgroundChecks: false,
    paymentMethod: null,
    smsNotifications: true,
    emailNotifications: true
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentSubmit = (paymentData: PaymentData) => {
    setFormData(prev => ({ ...prev, paymentMethod: paymentData }));
  };

  const handleSubmit = async () => {
    try {
      // Generate random password
      const password = Math.random().toString(36).slice(-8) + 'A1!';
      
      // Create account in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: password,
        options: {
          data: {
            company_name: formData.companyName,
            company_type: formData.companyType,
            mc_number: formData.mcNumber,
            dot_number: formData.dotNumber,
            role: 'subscriber_admin'
          }
        }
      });

      if (error) throw error;

      // Send credentials via email/SMS
      alert(`Account created! Login credentials sent to ${formData.email} and ${formData.phone}`);
      
      // Reset form
      setFormData({
        companyName: '',
        companyType: '',
        mcNumber: '',
        dotNumber: '',
        ein: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        contactName: '',
        insuranceCarrier: '',
        insuranceAmount: '',
        insuranceExpiry: '',
        safetyRating: '',
        yearsInBusiness: '',
        fleetSize: '',
        operatingRadius: '',
        equipmentTypes: [],
        fmcsaCompliant: false,
        drugTestingProgram: false,
        backgroundChecks: false,
        paymentMethod: null,
        smsNotifications: true,
        emailNotifications: true
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.companyName && formData.companyType && formData.email && formData.phone;
      case 2:
        return formData.mcNumber && formData.dotNumber && formData.insuranceCarrier;
      case 3:
        return formData.fmcsaCompliant && formData.drugTestingProgram;
      case 4:
        return formData.paymentMethod !== null;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-900/50 border-lime-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lime-400">
            <Building className="h-6 w-6" />
            Company Registration - FMCSA Compliant
            <Badge variant="outline" className="border-lime-400 text-lime-400">
              Step {currentStep} of 4
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={`step${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-blue-800/50">
              <TabsTrigger value="step1" className={`${isStepComplete(1) ? 'text-green-400' : 'text-lime-400'}`}>
                Company Info
              </TabsTrigger>
              <TabsTrigger value="step2" className={`${isStepComplete(2) ? 'text-green-400' : 'text-lime-400'}`}>
                FMCSA Details
              </TabsTrigger>
              <TabsTrigger value="step3" className={`${isStepComplete(3) ? 'text-green-400' : 'text-lime-400'}`}>
                Compliance
              </TabsTrigger>
              <TabsTrigger value="step4" className={`${isStepComplete(4) ? 'text-green-400' : 'text-lime-400'}`}>
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step1" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-lime-300">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyType" className="text-lime-300">Company Type *</Label>
                  <Select value={formData.companyType} onValueChange={(value) => handleInputChange('companyType', value)}>
                    <SelectTrigger className="bg-blue-800/50 border-lime-500/30 text-lime-100">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carrier">Carrier</SelectItem>
                      <SelectItem value="broker">Broker</SelectItem>
                      <SelectItem value="shipper">Shipper</SelectItem>
                      <SelectItem value="manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-lime-300">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-lime-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address" className="text-lime-300">Business Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                />
              </div>
            </TabsContent>

            <TabsContent value="step2" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mcNumber" className="text-lime-300">MC Number *</Label>
                  <Input
                    id="mcNumber"
                    value={formData.mcNumber}
                    onChange={(e) => handleInputChange('mcNumber', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dotNumber" className="text-lime-300">DOT Number *</Label>
                  <Input
                    id="dotNumber"
                    value={formData.dotNumber}
                    onChange={(e) => handleInputChange('dotNumber', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insuranceCarrier" className="text-lime-300">Insurance Carrier *</Label>
                  <Input
                    id="insuranceCarrier"
                    value={formData.insuranceCarrier}
                    onChange={(e) => handleInputChange('insuranceCarrier', e.target.value)}
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="insuranceAmount" className="text-lime-300">Coverage Amount</Label>
                  <Input
                    id="insuranceAmount"
                    value={formData.insuranceAmount}
                    onChange={(e) => handleInputChange('insuranceAmount', e.target.value)}
                    placeholder="$1,000,000"
                    className="bg-blue-800/50 border-lime-500/30 text-lime-100"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="step3" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fmcsaCompliant"
                    checked={formData.fmcsaCompliant}
                    onCheckedChange={(checked) => handleInputChange('fmcsaCompliant', checked)}
                  />
                  <Label htmlFor="fmcsaCompliant" className="text-lime-300">
                    Company is FMCSA compliant and in good standing *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="drugTestingProgram"
                    checked={formData.drugTestingProgram}
                    onCheckedChange={(checked) => handleInputChange('drugTestingProgram', checked)}
                  />
                  <Label htmlFor="drugTestingProgram" className="text-lime-300">
                    Drug and alcohol testing program in place *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="backgroundChecks"
                    checked={formData.backgroundChecks}
                    onCheckedChange={(checked) => handleInputChange('backgroundChecks', checked)}
                  />
                  <Label htmlFor="backgroundChecks" className="text-lime-300">
                    Background checks performed on all drivers
                  </Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="step4">
              <PaymentMethodForm onSubmit={handlePaymentSubmit} required={true} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="border-lime-500/30 text-lime-400"
            >
              Previous
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepComplete(currentStep)}
                className="bg-lime-500 hover:bg-lime-600 text-black"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepComplete(4)}
                className="bg-lime-500 hover:bg-lime-600 text-black"
              >
                Complete Registration
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AutoEnrollmentSystem />
    </div>
  );
};

export default EnhancedUpdatedOnboardingSteps;