import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Header from './Header';
import LoadBoard from './LoadBoard';
import AIAgent from './AIAgent';
import Analytics from './Analytics';
import UpdatedPricingSection from './UpdatedPricingSection';
import TMSMain from './TMSMain';
import DispatchDashboard from './DispatchDashboard';
import MobileApp from './MobileApp';
import PaymentSystem from './PaymentSystem';
import UpdatedTrainingScreen from './UpdatedTrainingScreen';
import AutoEnrollmentSystem from './AutoEnrollmentSystem';
import AutoDispatchService from './AutoDispatchService';
import AdminLinks from './AdminLinks';
import { Truck, Brain, BarChart3, CreditCard, Settings, Bot, Smartphone, DollarSign, GraduationCap, Users, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AppLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            LoadBoard AI + TMS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary AI-powered logistics platform with integrated Transportation Management System, 
            real-time load matching, automated dispatch, and intelligent optimization
          </p>
          {user && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <p className="text-green-800">Welcome back, {user.email}! You're on the {user.plan} plan.</p>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Live Updates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">AI Powered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-700">Auto Dispatch</span>
            </div>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl">
          <Tabs defaultValue="loadboard" className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-lg">
              <TabsTrigger 
                value="loadboard" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Load Board</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dispatch" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Dispatch</span>
              </TabsTrigger>
              <TabsTrigger 
                value="enrollment" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Enrollment</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tms" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">TMS</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ai-agent" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">AI Agent</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="training" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Training</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pricing" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Pricing</span>
              </TabsTrigger>
              <TabsTrigger 
                value="payments" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Payments</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mobile" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="auto-dispatch" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Auto Dispatch</span>
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="loadboard" className="mt-0">
                <LoadBoard />
              </TabsContent>
              
              <TabsContent value="dispatch" className="mt-0">
                <DispatchDashboard />
              </TabsContent>
              
              <TabsContent value="enrollment" className="mt-0">
                <AutoEnrollmentSystem />
              </TabsContent>
              
              <TabsContent value="tms" className="mt-0">
                <TMSMain />
              </TabsContent>
              
              <TabsContent value="ai-agent" className="mt-0">
                <AIAgent />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <Analytics />
              </TabsContent>
              
              <TabsContent value="training" className="mt-0">
                <UpdatedTrainingScreen />
              </TabsContent>
              
              <TabsContent value="pricing" className="mt-0">
                <UpdatedPricingSection />
              </TabsContent>
              
              <TabsContent value="payments" className="mt-0">
                <PaymentSystem />
              </TabsContent>
              
              <TabsContent value="mobile" className="mt-0">
                <MobileApp />
              </TabsContent>
              
              <TabsContent value="auto-dispatch" className="mt-0">
                <AutoDispatchService />
              </TabsContent>
              
              <TabsContent value="admin" className="mt-0">
                <AdminLinks />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Deployed at: <a href="https://loadboard-ai.onrender.com" className="text-blue-600 hover:underline font-medium">
              https://loadboard-ai.onrender.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export { AppLayout };
export default AppLayout;