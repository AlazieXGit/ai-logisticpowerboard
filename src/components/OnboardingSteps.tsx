import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Truck, User, CreditCard } from 'lucide-react';

interface OnboardingStepsProps {
  onComplete: () => void;
}

export const OnboardingSteps = ({ onComplete }: OnboardingStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferences: [] as string[]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold">Welcome to Ai Nukie Load Board</h2>
              <p className="text-gray-600 mt-2">Let's get you set up in just a few steps</p>
            </div>
            <div className="space-y-4">
              <Label>What best describes you?</Label>
              <Select value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipper">Shipper</SelectItem>
                  <SelectItem value="carrier">Carrier</SelectItem>
                  <SelectItem value="broker">Broker</SelectItem>
                  <SelectItem value="driver">Independent Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold">Company Information</h2>
              <p className="text-gray-600 mt-2">Tell us about your business</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="Enter company name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="First name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Last name" />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold">Contact Details</h2>
              <p className="text-gray-600 mt-2">How can we reach you?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(555) 123-4567" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold">You're All Set!</h2>
              <p className="text-gray-600 mt-2">Welcome to the Ai Nukie Load Board community</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Browse available loads</li>
                <li>• Set up payment preferences</li>
                <li>• Connect with carriers and shippers</li>
                <li>• Access AI-powered logistics tools</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        {renderStep()}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={currentStep === 2 && !formData.userType}>
            {currentStep === totalSteps ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};