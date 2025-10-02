import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bot, Truck, DollarSign, TrendingUp, Users, Settings } from 'lucide-react';
import AutoDispatchService from './AutoDispatchService';
import CarrierIntegration from './CarrierIntegration';
import TransactionProcessor from './TransactionProcessor';

interface DashboardStats {
  totalDispatches: number;
  activeCarriers: number;
  automationRate: number;
  revenue: number;
  avgBookingTime: number;
  successRate: number;
}

const DispatchDashboard: React.FC = () => {
  const [stats] = useState<DashboardStats>({
    totalDispatches: 1247,
    activeCarriers: 23,
    automationRate: 87,
    revenue: 2450000,
    avgBookingTime: 2.3,
    successRate: 95.2
  });

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Dispatch Service</h1>
          <p className="text-gray-600">Automated carrier dispatch and booking system</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <Bot className="h-4 w-4 mr-1" />
            AI Active
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Dispatches</p>
                <p className="text-2xl font-bold">{stats.totalDispatches.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Carriers</p>
                <p className="text-2xl font-bold">{stats.activeCarriers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Automation Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{stats.automationRate}%</p>
                  <Progress value={stats.automationRate} className="w-12 h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${(stats.revenue / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Booking</p>
                <p className="text-2xl font-bold">{stats.avgBookingTime}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{stats.successRate}%</p>
                  <Progress value={stats.successRate} className="w-12 h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="auto-dispatch">Auto Dispatch</TabsTrigger>
          <TabsTrigger value="carriers">Carriers</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AI Matching Accuracy</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Auto Booking Success</span>
                    <div className="flex items-center gap-2">
                      <Progress value={stats.successRate} className="w-20 h-2" />
                      <span className="text-sm font-medium">{stats.successRate}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Payment Processing</span>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="w-20 h-2" />
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Carrier Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <Progress value={91} className="w-20 h-2" />
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Load LD789 auto-dispatched</p>
                      <p className="text-xs text-gray-500">Swift Transport - $2,450</p>
                    </div>
                    <span className="text-xs text-gray-500">2m ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment processed</p>
                      <p className="text-xs text-gray-500">TXN123456 - $1,890</p>
                    </div>
                    <span className="text-xs text-gray-500">5m ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New carrier connected</p>
                      <p className="text-xs text-gray-500">Express Logistics API</p>
                    </div>
                    <span className="text-xs text-gray-500">12m ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="auto-dispatch">
          <AutoDispatchService />
        </TabsContent>
        
        <TabsContent value="carriers">
          <CarrierIntegration />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TransactionProcessor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DispatchDashboard;