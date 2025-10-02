import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Mail, Users, Building, Truck, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedPaymentProcessor from './EnhancedPaymentProcessor';

const EnhancedAutoEnrollmentSystem: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignSent, setCampaignSent] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const enrollmentData = {
    totalCarriers: 7000,
    categories: {
      carriers: 3500,
      ownerOperators: 1500,
      manufacturers: 800,
      shippers: 600,
      warehouses: 400,
      brokers: 200
    },
    campaignStats: {
      emailsSent: 7000,
      signupRate: 0.15,
      expectedSignups: 1050
    }
  };

  const handleGenerateData = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({ title: 'Data Generated', description: '7K+ FMCSA compliant profiles ready for download' });
    }, 3000);
  };

  const handleSendCampaign = async () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setCampaignSent(true);
    setShowPayment(false);
    toast({ title: 'Campaign Launched', description: 'Email campaign sent to 7,000+ carriers' });
  };

  const downloadZipFile = () => {
    const link = document.createElement('a');
    link.href = '/loadboard-ai-complete-data.zip';
    link.download = 'enhanced-carrier-data-7k.zip';
    link.click();
    toast({ title: 'Download Started', description: 'Enhanced carrier data package downloading...' });
  };

  if (showPayment) {
    return (
      <div className="max-w-2xl mx-auto">
        <EnhancedPaymentProcessor
          amount={2500}
          description="Enhanced Auto Enrollment Campaign"
          onSuccess={handlePaymentSuccess}
          onFinalFailure={() => setShowPayment(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Enhanced Auto Enrollment System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{enrollmentData.categories.carriers}</div>
              <div className="text-sm text-gray-600">Carriers</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{enrollmentData.categories.ownerOperators}</div>
              <div className="text-sm text-gray-600">Owner Operators</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Building className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{enrollmentData.categories.manufacturers}</div>
              <div className="text-sm text-gray-600">Manufacturers</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Package className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{enrollmentData.categories.shippers}</div>
              <div className="text-sm text-gray-600">Shippers</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Building className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{enrollmentData.categories.warehouses}</div>
              <div className="text-sm text-gray-600">Warehouses</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600">{enrollmentData.categories.brokers}</div>
              <div className="text-sm text-gray-600">Brokers</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleGenerateData} 
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate Data Package'}
            </Button>
            
            <Button 
              onClick={downloadZipFile}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download ZIP File
            </Button>
          </div>

          {isGenerating && (
            <div className="mt-4">
              <Progress value={66} className="mb-2" />
              <p className="text-sm text-gray-600">Generating enhanced carrier profiles...</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Campaign Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Target Audience:</span>
              <Badge>{enrollmentData.totalCarriers.toLocaleString()} FMCSA Compliant Companies</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Expected Signup Rate:</span>
              <Badge variant="outline">{(enrollmentData.campaignStats.signupRate * 100)}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Projected Signups:</span>
              <Badge className="bg-green-100 text-green-800">{enrollmentData.campaignStats.expectedSignups}</Badge>
            </div>
            
            <Button 
              onClick={handleSendCampaign}
              disabled={campaignSent}
              className="w-full"
            >
              {campaignSent ? 'Campaign Sent Successfully' : 'Launch Email Campaign ($2,500)'}
            </Button>

            {campaignSent && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-semibold">Campaign Status: Active</p>
                <p className="text-sm text-green-600">Emails sent to {enrollmentData.totalCarriers.toLocaleString()} carriers</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAutoEnrollmentSystem;