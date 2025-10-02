import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, Activity, Calculator } from 'lucide-react';

interface VolumeData {
  totalVolume: number;
  dailyVolume: number;
  weeklyVolume: number;
  monthlyVolume: number;
  totalAIFees: number;
  dispatchFees: number;
  transactionCount: number;
  avgTransactionSize: number;
}

const RealTimeVolumeTracker: React.FC = () => {
  const [volumeData, setVolumeData] = useState<VolumeData>({
    totalVolume: 2847350,
    dailyVolume: 125400,
    weeklyVolume: 876800,
    monthlyVolume: 3542100,
    totalAIFees: 56947,
    dispatchFees: 17056,
    transactionCount: 1247,
    avgTransactionSize: 2284
  });

  const [realtimeUpdates, setRealtimeUpdates] = useState<Array<{
    timestamp: string;
    amount: number;
    fee: number;
    type: 'ai' | 'dispatch';
  }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAmount = Math.floor(Math.random() * 5000 + 1000);
      const aiFeePct = 0.02; // Updated to 2%
      const dispatchFeePct = 0.02; // 2% dispatch fee
      const isDispatch = Math.random() > 0.7;
      const fee = newAmount * (isDispatch ? dispatchFeePct : aiFeePct);
      
      const update = {
        timestamp: new Date().toLocaleTimeString(),
        amount: newAmount,
        fee: Math.floor(fee),
        type: isDispatch ? 'dispatch' as const : 'ai' as const
      };
      
      setRealtimeUpdates(prev => [update, ...prev.slice(0, 9)]);
      
      setVolumeData(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + newAmount,
        dailyVolume: prev.dailyVolume + newAmount,
        totalAIFees: prev.totalAIFees + (isDispatch ? 0 : fee),
        dispatchFees: prev.dispatchFees + (isDispatch ? fee : 0),
        transactionCount: prev.transactionCount + 1,
        avgTransactionSize: Math.floor((prev.totalVolume + newAmount) / (prev.transactionCount + 1))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Real-Time Volume & Fee Tracking</h2>
        <Badge className="bg-green-100 text-green-800 animate-pulse">
          <Activity className="h-3 w-3 mr-1" />
          Live Updates
        </Badge>
      </div>

      <Tabs defaultValue="volume" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="volume">Volume Overview</TabsTrigger>
          <TabsTrigger value="fees">AI Fees</TabsTrigger>
          <TabsTrigger value="realtime">Real-Time Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Volume</p>
                    <p className="text-2xl font-bold">${volumeData.totalVolume.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Daily Volume</p>
                    <p className="text-2xl font-bold">${volumeData.dailyVolume.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-2xl font-bold">{volumeData.transactionCount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calculator className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Transaction</p>
                    <p className="text-2xl font-bold">${volumeData.avgTransactionSize.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  AI Processing Fees (2%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-green-600">
                    ${volumeData.totalAIFees.toLocaleString()}
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-gray-600">
                    Updated pricing: 2% AI processing fee on all transactions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Dispatch Fees (2%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-blue-600">
                    ${volumeData.dispatchFees.toLocaleString()}
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-sm text-gray-600">
                    AI dispatching service fee: 2% on automated dispatch
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Transaction Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realtimeUpdates.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Monitoring for new transactions...
                  </p>
                ) : (
                  realtimeUpdates.map((update, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge className={update.type === 'ai' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {update.type === 'ai' ? 'AI Fee' : 'Dispatch Fee'}
                          </Badge>
                          <span className="text-sm text-gray-600">{update.timestamp}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${update.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Fee: ${update.fee}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealTimeVolumeTracker;