import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, Truck, DollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FeeDisplaySection from './FeeDisplaySection';

interface AutoDispatchJob {
  id: string;
  loadId: string;
  carrierId: string;
  carrierName: string;
  route: string;
  rate: number;
  status: 'pending' | 'dispatched' | 'booked' | 'completed' | 'failed';
  timestamp: string;
  aiConfidence: number;
}

interface CarrierProfile {
  id: string;
  name: string;
  rating: number;
  capacity: number;
  equipmentType: string;
  preferredRoutes: string[];
  autoBookingEnabled: boolean;
}

const AutoDispatchService: React.FC = () => {
  const { toast } = useToast();
  const [isAutoDispatchEnabled, setIsAutoDispatchEnabled] = useState(false);
  const [dispatchJobs, setDispatchJobs] = useState<AutoDispatchJob[]>([]);
  const [carriers, setCarriers] = useState<CarrierProfile[]>([
    {
      id: 'CAR001',
      name: 'Swift Transport',
      rating: 4.8,
      capacity: 25,
      equipmentType: 'Dry Van',
      preferredRoutes: ['Chicago-Detroit', 'Atlanta-Miami'],
      autoBookingEnabled: true
    },
    {
      id: 'CAR002', 
      name: 'Prime Logistics',
      rating: 4.6,
      capacity: 15,
      equipmentType: 'Refrigerated',
      preferredRoutes: ['LA-Phoenix', 'Dallas-Houston'],
      autoBookingEnabled: true
    }
  ]);
  const [processingStats, setProcessingStats] = useState({
    totalProcessed: 1247,
    successfulJobs: 1183,
    successRate: 95,
    avgProcessingTime: 2.3
  });

  useEffect(() => {
    if (isAutoDispatchEnabled) {
      const interval = setInterval(() => {
        simulateAutoDispatch();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoDispatchEnabled]);

  const simulateAutoDispatch = () => {
    const routes = ['Chicago-Detroit', 'Atlanta-Miami', 'LA-Phoenix', 'Dallas-Houston', 'NYC-Boston', 'Denver-Salt Lake'];
    const route = routes[Math.floor(Math.random() * routes.length)];
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    
    const newJob: AutoDispatchJob = {
      id: `ADJ${Date.now()}`,
      loadId: `LD${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      carrierId: carrier.id,
      carrierName: carrier.name,
      route,
      rate: Math.floor(Math.random() * 2000 + 1500),
      status: 'pending',
      timestamp: new Date().toLocaleTimeString(),
      aiConfidence: Math.floor(Math.random() * 20 + 80)
    };

    setDispatchJobs(prev => [newJob, ...prev.slice(0, 9)]);
    
    // Simulate processing
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.1;
      setDispatchJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: isSuccessful ? 'dispatched' : 'failed' }
          : job
      ));
      
      setProcessingStats(prev => ({
        ...prev,
        totalProcessed: prev.totalProcessed + 1,
        successfulJobs: prev.successfulJobs + (isSuccessful ? 1 : 0),
        successRate: Math.round(((prev.successfulJobs + (isSuccessful ? 1 : 0)) / (prev.totalProcessed + 1)) * 100)
      }));
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'dispatched': return 'bg-blue-100 text-blue-800';
      case 'booked': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'dispatched': return <Truck className="h-4 w-4" />;
      case 'booked': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Auto Dispatch Service</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-dispatch" 
              checked={isAutoDispatchEnabled}
              onCheckedChange={setIsAutoDispatchEnabled}
            />
            <Label htmlFor="auto-dispatch">Enable Auto Dispatch</Label>
          </div>
          <Badge className={isAutoDispatchEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
            {isAutoDispatchEnabled ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      {isAutoDispatchEnabled && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bot className="h-4 w-4" />
          <AlertDescription>
            AI Auto Dispatch is active. The system will automatically match loads with carriers and complete bookings.
          </AlertDescription>
        </Alert>
      )}

      <FeeDisplaySection 
        totalJobs={processingStats.totalProcessed} 
        successfulJobs={processingStats.successfulJobs} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-2xl font-bold">{processingStats.totalProcessed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{processingStats.successRate}%</p>
                  <Progress value={processingStats.successRate} className="w-12 h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Processing</p>
                <p className="text-2xl font-bold">{processingStats.avgProcessingTime}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Recent Auto Dispatch Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dispatchJobs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {isAutoDispatchEnabled ? 'Monitoring for new loads...' : 'Enable auto dispatch to see activity'}
              </p>
            ) : (
              dispatchJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(job.status)}>
                        {getStatusIcon(job.status)}
                        {job.status}
                      </Badge>
                      <span className="font-semibold">{job.loadId}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${job.rate.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{job.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Route: </span>
                      <span className="font-medium">{job.route}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Carrier: </span>
                      <span className="font-medium">{job.carrierName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">AI Confidence:</span>
                      <Progress value={job.aiConfidence} className="w-16 h-2" />
                      <span className="text-xs font-medium">{job.aiConfidence}%</span>
                    </div>
                    {job.status === 'dispatched' && (
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoDispatchService;