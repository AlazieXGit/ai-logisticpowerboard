import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Truck, Building2, Shield, CheckCircle, Mail, Phone } from 'lucide-react';

const UpdatedOnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    mcNumber: '',
    dotNumber: '',
    email: '',
    phone: '',
    address: '',
    insuranceAmount: '',
    agreeFMCSA: false,
    agreeTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                />
              </div>
              <div>
                <Label htmlFor="companyType">Company Type *</Label>
                <Select value={formData.companyType} onValueChange={(value) => handleInputChange('companyType', value)}>
                  <SelectTrigger className="bg-blue-900/30 border-lime-500/30 text-lime-300">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carrier">Carrier</SelectItem>
                    <SelectItem value="broker">Broker</SelectItem>
                    <SelectItem value="shipper">Shipper</SelectItem>
                    <SelectItem value="independent">Independent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mcNumber">MC Number *</Label>
                <Input
                  id="mcNumber"
                  value={formData.mcNumber}
                  onChange={(e) => handleInputChange('mcNumber', e.target.value)}
                  className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                />
              </div>
              <div>
                <Label htmlFor="dotNumber">DOT Number *</Label>
                <Input
                  id="dotNumber"
                  value={formData.dotNumber}
                  onChange={(e) => handleInputChange('dotNumber', e.target.value)}
                  className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="insuranceAmount">Insurance Amount *</Label>
              <Input
                id="insuranceAmount"
                value={formData.insuranceAmount}
                onChange={(e) => handleInputChange('insuranceAmount', e.target.value)}
                placeholder="$1,000,000"
                className="bg-blue-900/30 border-lime-500/30 text-lime-300"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Business Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-blue-900/30 border-lime-500/30 text-lime-300"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeFMCSA"
                  checked={formData.agreeFMCSA}
                  onCheckedChange={(checked) => handleInputChange('agreeFMCSA', checked)}
                />
                <Label htmlFor="agreeFMCSA" className="text-sm text-lime-300">
                  I agree to comply with all FMCSA regulations and requirements
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                />
                <Label htmlFor="agreeTerms" className="text-sm text-lime-300">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-lime-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lime-400">
          <Building2 className="h-6 w-6" />
          Company Registration - FMCSA Compliant
          <Badge variant="outline" className="border-lime-400 text-lime-400">
            Step {currentStep} of 4
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
          >
            Previous
          </Button>
          <Button
            onClick={currentStep === 4 ? () => alert('Registration submitted!') : nextStep}
            className="bg-lime-500/20 text-lime-400 border border-lime-500/30 hover:bg-lime-500/30"
          >
            {currentStep === 4 ? 'Submit Registration' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdatedOnboardingSteps;