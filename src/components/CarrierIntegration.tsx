import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Truck, Star, MapPin, DollarSign, Settings, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Carrier {
  id: string;
  name: string;
  rating: number;
  equipmentTypes: string[];
  coverage: string[];
  autoBookingEnabled: boolean;
  apiConnected: boolean;
  totalLoads: number;
  avgRate: number;
  onTimePerformance: number;
}

const CarrierIntegration: React.FC = () => {
  const { toast } = useToast();
  const [carriers, setCarriers] = useState<Carrier[]>([
    {
      id: 'CAR001',
      name: 'Swift Transport Solutions',
      rating: 4.8,
      equipmentTypes: ['Dry Van', 'Refrigerated'],
      coverage: ['Midwest', 'Southeast'],
      autoBookingEnabled: true,
      apiConnected: true,
      totalLoads: 1247,
      avgRate: 2150,
      onTimePerformance: 96
    },
    {
      id: 'CAR002',
      name: 'Prime Logistics Network',
      rating: 4.6,
      equipmentTypes: ['Flatbed', 'Step Deck'],
      coverage: ['West Coast', 'Southwest'],
      autoBookingEnabled: true,
      apiConnected: true,
      totalLoads: 892,
      avgRate: 2450,
      onTimePerformance: 94
    },
    {
      id: 'CAR003',
      name: 'Reliable Freight Co',
      rating: 4.4,
      equipmentTypes: ['Dry Van', 'Box Truck'],
      coverage: ['Northeast', 'Mid-Atlantic'],
      autoBookingEnabled: false,
      apiConnected: false,
      totalLoads: 634,
      avgRate: 1950,
      onTimePerformance: 91
    }
  ]);

  const [newCarrier, setNewCarrier] = useState({
    name: '',
    equipmentType: '',
    coverage: ''
  });

  const toggleAutoBooking = (carrierId: string) => {
    setCarriers(prev => prev.map(carrier => 
      carrier.id === carrierId 
        ? { ...carrier, autoBookingEnabled: !carrier.autoBookingEnabled }
        : carrier
    ));
    
    const carrier = carriers.find(c => c.id === carrierId);
    toast({
      title: 'Auto Booking Updated',
      description: `${carrier?.name} auto booking ${carrier?.autoBookingEnabled ? 'disabled' : 'enabled'}`,
    });
  };

  const connectAPI = (carrierId: string) => {
    setCarriers(prev => prev.map(carrier => 
      carrier.id === carrierId 
        ? { ...carrier, apiConnected: true }
        : carrier
    ));
    
    const carrier = carriers.find(c => c.id === carrierId);
    toast({
      title: 'API Connected',
      description: `Successfully connected to ${carrier?.name} API`,
    });
  };

  const addCarrier = () => {
    if (!newCarrier.name || !newCarrier.equipmentType || !newCarrier.coverage) {
      toast({
        title: 'Error',
        description: 'Please fill in all carrier details',
        variant: 'destructive'
      });
      return;
    }

    const carrier: Carrier = {
      id: `CAR${String(carriers.length + 1).padStart(3, '0')}`,
      name: newCarrier.name,
      rating: 4.0,
      equipmentTypes: [newCarrier.equipmentType],
      coverage: [newCarrier.coverage],
      autoBookingEnabled: false,
      apiConnected: false,
      totalLoads: 0,
      avgRate: 2000,
      onTimePerformance: 90
    };

    setCarriers(prev => [...prev, carrier]);
    setNewCarrier({ name: '', equipmentType: '', coverage: '' });
    
    toast({
      title: 'Carrier Added',
      description: `${carrier.name} has been added to your network`,
    });
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Carrier Integration</h2>
        <Badge className="bg-green-100 text-green-800">
          {carriers.filter(c => c.apiConnected).length} Connected
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Carrier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="carrier-name">Carrier Name</Label>
              <Input 
                id="carrier-name"
                value={newCarrier.name}
                onChange={(e) => setNewCarrier(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter carrier name"
              />
            </div>
            <div>
              <Label htmlFor="equipment-type">Equipment Type</Label>
              <Input 
                id="equipment-type"
                value={newCarrier.equipmentType}
                onChange={(e) => setNewCarrier(prev => ({ ...prev, equipmentType: e.target.value }))}
                placeholder="e.g., Dry Van"
              />
            </div>
            <div>
              <Label htmlFor="coverage">Coverage Area</Label>
              <Input 
                id="coverage"
                value={newCarrier.coverage}
                onChange={(e) => setNewCarrier(prev => ({ ...prev, coverage: e.target.value }))}
                placeholder="e.g., Midwest"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addCarrier} className="w-full">
                Add Carrier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {carriers.map((carrier) => (
          <Card key={carrier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {carrier.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {getRatingStars(carrier.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({carrier.rating})</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={carrier.apiConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {carrier.apiConnected ? 'Connected' : 'Disconnected'}
                  </Badge>
                  <Badge className={carrier.autoBookingEnabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                    {carrier.autoBookingEnabled ? 'Auto Booking' : 'Manual'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Equipment Types</p>
                    <p className="font-medium">{carrier.equipmentTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Coverage</p>
                    <p className="font-medium">{carrier.coverage.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Loads</p>
                    <p className="font-medium">{carrier.totalLoads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Rate</p>
                    <p className="font-medium">${carrier.avgRate.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`auto-booking-${carrier.id}`}
                      checked={carrier.autoBookingEnabled}
                      onCheckedChange={() => toggleAutoBooking(carrier.id)}
                      disabled={!carrier.apiConnected}
                    />
                    <Label htmlFor={`auto-booking-${carrier.id}`} className="text-sm">
                      Auto Booking
                    </Label>
                  </div>
                  
                  <div className="flex gap-2">
                    {!carrier.apiConnected && (
                      <Button 
                        size="sm" 
                        onClick={() => connectAPI(carrier.id)}
                        className="flex items-center gap-1"
                      >
                        <Settings className="h-4 w-4" />
                        Connect API
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarrierIntegration;