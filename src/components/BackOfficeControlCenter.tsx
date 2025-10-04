import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AIAutomotiveShippingPlatform from './AIAutomotiveShippingPlatform';
import InternationalVendorManager from './InternationalVendorManager';
import CustomsTrackingSystem from './CustomsTrackingSystem';
import EnhancedDeveloperPlatform from './EnhancedDeveloperPlatform';
import CompletePlatformAnalytics from './CompletePlatformAnalytics';
import PaymentIntegrationInstructions from './PaymentIntegrationInstructions';
import { 
  Truck, Globe, FileCheck, Code, BarChart, CreditCard 
} from 'lucide-react';

const BackOfficeControlCenter = () => {
  const [activeTab, setActiveTab] = useState('shipping');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Back Office Control Center
          </h1>
          <p className="text-gray-400">
            Comprehensive Management Dashboard for AI Logistics Platform
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800/50 mb-8">
            <TabsTrigger 
              value="shipping" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20"
            >
              <Truck className="h-4 w-4" />
              Shipping
            </TabsTrigger>
            <TabsTrigger 
              value="vendors" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20"
            >
              <Globe className="h-4 w-4" />
              Vendors
            </TabsTrigger>
            <TabsTrigger 
              value="customs" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20"
            >
              <FileCheck className="h-4 w-4" />
              Customs
            </TabsTrigger>
            <TabsTrigger 
              value="developer" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20"
            >
              <Code className="h-4 w-4" />
              Developer
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20"
            >
              <BarChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20"
            >
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shipping">
            <AIAutomotiveShippingPlatform />
          </TabsContent>

          <TabsContent value="vendors">
            <InternationalVendorManager />
          </TabsContent>

          <TabsContent value="customs">
            <CustomsTrackingSystem />
          </TabsContent>

          <TabsContent value="developer">
            <EnhancedDeveloperPlatform />
          </TabsContent>

          <TabsContent value="analytics">
            <CompletePlatformAnalytics />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentIntegrationInstructions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BackOfficeControlCenter;
