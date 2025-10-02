import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, MapPin, Clock, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
  driver: string;
  vehicle: string;
  estimatedDelivery: string;
  value: number;
  priority: 'high' | 'medium' | 'low';
}

interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  driver: string;
  status: 'available' | 'in_use' | 'maintenance';
  location: string;
  capacity: number;
}

const TMSCore: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: 'SH001',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      status: 'in_transit',
      driver: 'John Smith',
      vehicle: 'TR-101',
      estimatedDelivery: '2024-01-15 14:30',
      value: 15000,
      priority: 'high'
    },
    {
      id: 'SH002',
      origin: 'Dallas, TX',
      destination: 'Houston, TX',
      status: 'pending',
      driver: 'Mike Johnson',
      vehicle: 'TR-102',
      estimatedDelivery: '2024-01-16 09:00',
      value: 8500,
      priority: 'medium'
    }
  ]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'TR-101',
      plateNumber: 'ABC-1234',
      type: 'Semi-Truck',
      driver: 'John Smith',
      status: 'in_use',
      location: 'En Route to Phoenix',
      capacity: 40000
    },
    {
      id: 'TR-102',
      plateNumber: 'XYZ-5678',
      type: 'Box Truck',
      driver: 'Mike Johnson',
      status: 'available',
      location: 'Dallas Terminal',
      capacity: 26000
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Shipments</p>
                <p className="text-2xl font-bold">{shipments.filter(s => s.status === 'in_transit').length}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Vehicles</p>
                <p className="text-2xl font-bold">{vehicles.filter(v => v.status === 'available').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${shipments.reduce((sum, s) => sum + s.value, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold">{shipments.filter(s => s.priority === 'high').length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="shipments" className="w-full">
        <TabsList>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="vehicles">Fleet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{shipment.id}</h3>
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(shipment.priority)}>
                          {shipment.priority}
                        </Badge>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        ${shipment.value.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{shipment.origin} → {shipment.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>ETA: {shipment.estimatedDelivery}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        <span>Driver: {shipment.driver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Vehicle: {shipment.vehicle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{vehicle.id}</h3>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">
                        {vehicle.plateNumber}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {vehicle.type}
                      </div>
                      <div>
                        <span className="font-medium">Driver:</span> {vehicle.driver}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {vehicle.location}
                      </div>
                      <div>
                        <span className="font-medium">Capacity:</span> {vehicle.capacity.toLocaleString()} lbs
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TMSCore;