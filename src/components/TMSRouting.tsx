import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Clock, Fuel, Route, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RouteStop {
  id: string;
  address: string;
  type: 'pickup' | 'delivery';
  timeWindow: string;
  duration: number;
  completed: boolean;
}

interface OptimizedRoute {
  id: string;
  driver: string;
  vehicle: string;
  stops: RouteStop[];
  totalDistance: number;
  estimatedTime: number;
  fuelCost: number;
  status: 'planned' | 'active' | 'completed';
}

const TMSRouting: React.FC = () => {
  const { toast } = useToast();
  const [routes, setRoutes] = useState<OptimizedRoute[]>([
    {
      id: 'RT001',
      driver: 'John Smith',
      vehicle: 'TR-101',
      stops: [
        {
          id: 'ST001',
          address: '123 Main St, Chicago, IL',
          type: 'pickup',
          timeWindow: '08:00-10:00',
          duration: 30,
          completed: true
        },
        {
          id: 'ST002',
          address: '456 Oak Ave, Milwaukee, WI',
          type: 'delivery',
          timeWindow: '12:00-14:00',
          duration: 45,
          completed: false
        }
      ],
      totalDistance: 425,
      estimatedTime: 480,
      fuelCost: 127.50,
      status: 'active'
    }
  ]);

  const handleOptimizeRoutes = () => {
    toast({
      title: 'Routes Optimized',
      description: 'Saved 67 minutes and $18.50 in fuel costs',
    });
  };

  const handleStartRoute = (routeId: string) => {
    setRoutes(prev => prev.map(route => 
      route.id === routeId 
        ? { ...route, status: 'active' as const }
        : route
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStopTypeColor = (type: string) => {
    return type === 'pickup' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Route Optimization</h2>
        <Button onClick={handleOptimizeRoutes} className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Optimize Routes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold">425 mi</p>
              </div>
              <Route className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-2xl font-bold">8h 0m</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fuel Cost</p>
                <p className="text-2xl font-bold">$127.50</p>
              </div>
              <Fuel className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Routes</p>
                <p className="text-2xl font-bold">{routes.filter(r => r.status === 'active').length}</p>
              </div>
              <Navigation className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {routes.map((route) => (
          <Card key={route.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{route.id}</CardTitle>
                  <Badge className={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Driver: {route.driver}</span>
                  <span>Vehicle: {route.vehicle}</span>
                  {route.status === 'planned' && (
                    <Button size="sm" onClick={() => handleStartRoute(route.id)}>
                      Start Route
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{route.totalDistance} miles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{Math.floor(route.estimatedTime / 60)}h {route.estimatedTime % 60}m</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">${route.fuelCost.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Route Stops:</h4>
                {route.stops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center gap-3 p-2 border rounded">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getStopTypeColor(stop.type)} size="sm">
                          {stop.type}
                        </Badge>
                        <span className="text-sm font-medium">{stop.address}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stop.timeWindow} • {stop.duration} min
                      </div>
                    </div>
                    <div className="flex items-center">
                      {stop.completed ? (
                        <Badge className="bg-green-100 text-green-800" size="sm">
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800" size="sm">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TMSRouting;