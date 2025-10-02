import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Truck, Navigation, MapPin, Settings, BarChart3 } from 'lucide-react';
import TMSCore from './TMSCore';
import TMSDispatch from './TMSDispatch';
import TMSRouting from './TMSRouting';
import TMSTracking from './TMSTracking';

const TMSMain: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Transportation Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive TMS integrated with AI-powered load matching for complete logistics management
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Real-Time Tracking</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Route Optimization</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-700">Smart Dispatch</span>
          </div>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-blue-100 to-purple-100 p-1 rounded-lg">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dispatch" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Dispatch</span>
            </TabsTrigger>
            <TabsTrigger 
              value="routing" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
            >
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">Routing</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tracking" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Tracking</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fleet" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
            >
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Fleet</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <TabsContent value="overview" className="mt-0">
              <TMSCore />
            </TabsContent>
            
            <TabsContent value="dispatch" className="mt-0">
              <TMSDispatch />
            </TabsContent>
            
            <TabsContent value="routing" className="mt-0">
              <TMSRouting />
            </TabsContent>
            
            <TabsContent value="tracking" className="mt-0">
              <TMSTracking />
            </TabsContent>
            
            <TabsContent value="fleet" className="mt-0">
              <div className="text-center py-12">
                <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Fleet Management</h3>
                <p className="text-gray-500">Advanced fleet management features coming soon</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default TMSMain;