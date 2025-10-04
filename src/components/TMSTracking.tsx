import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Truck, Clock, AlertTriangle, CheckCircle, Navigation } from 'lucide-react';

interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  event: string;
  status: 'info' | 'warning' | 'success' | 'error';
}

interface TrackedShipment {
  id: string;
  origin: string;
  destination: string;
  currentLocation: string;
  driver: string;
  vehicle: string;
  status: 'in_transit' | 'delivered' | 'delayed' | 'pickup_pending';
  progress: number;
  estimatedArrival: string;
  lastUpdate: string;
  events: TrackingEvent[];
}

const TMSTracking: React.FC = () => {
  const [shipments, setShipments] = useState<TrackedShipment[]>([
    {
      id: 'SH001',
      origin: 'Chicago, IL',
      destination: 'Detroit, MI',
      currentLocation: 'Kalamazoo, MI',
      driver: 'John Smith',
      vehicle: 'TR-101',
      status: 'in_transit',
      progress: 75,
      estimatedArrival: '2024-01-15 16:30',
      lastUpdate: '2024-01-15 14:15',
      events: [
        {
          id: 'E001',
          timestamp: '2024-01-15 08:00',
          location: 'Chicago, IL',
          event: 'Pickup completed',
          status: 'success'
        },
        {
          id: 'E002',
          timestamp: '2024-01-15 12:30',
          location: 'Gary, IN',
          event: 'Checkpoint passed',
          status: 'info'
        },
        {
          id: 'E003',
          timestamp: '2024-01-15 14:15',
          location: 'Kalamazoo, MI',
          event: 'Traffic delay - 15 minutes',
          status: 'warning'
        }
      ]
    },
    {
      id: 'SH002',
      origin: 'Atlanta, GA',
      destination: 'Miami, FL',
      currentLocation: 'Jacksonville, FL',
      driver: 'Sarah Wilson',
      vehicle: 'TR-105',
      status: 'in_transit',
      progress: 85,
      estimatedArrival: '2024-01-15 18:00',
      lastUpdate: '2024-01-15 15:00',
      events: [
        {
          id: 'E004',
          timestamp: '2024-01-15 06:00',
          location: 'Atlanta, GA',
          event: 'Pickup completed',
          status: 'success'
        },
        {
          id: 'E005',
          timestamp: '2024-01-15 15:00',
          location: 'Jacksonville, FL',
          event: 'Fuel stop completed',
          status: 'info'
        }
      ]
    }
  ]);

  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setShipments(prev => prev.map(shipment => ({
        ...shipment,
        lastUpdate: new Date().toLocaleString(),
        progress: Math.min(shipment.progress + Math.random() * 2, 100)
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'pickup_pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <MapPin className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleRefreshTracking = (shipmentId: string) => {
    setShipments(prev => prev.map(shipment => 
      shipment.id === shipmentId 
        ? { ...shipment, lastUpdate: new Date().toLocaleString() }
        : shipment
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Real-Time Tracking</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Transit</p>
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
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold">{shipments.filter(s => s.status === 'delivered').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delayed</p>
                <p className="text-2xl font-bold">{shipments.filter(s => s.status === 'delayed').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold">{Math.round(shipments.reduce((sum, s) => sum + s.progress, 0) / shipments.length)}%</p>
              </div>
              <Navigation className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Shipments</h3>
          {shipments.map((shipment) => (
            <Card key={shipment.id} className={`cursor-pointer transition-all ${selectedShipment === shipment.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedShipment(shipment.id)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{shipment.id}</h4>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    handleRefreshTracking(shipment.id);
                  }}>
                    Refresh
                  </Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>{shipment.origin} → {shipment.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-blue-500" />
                    <span>Current: {shipment.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span>{shipment.driver} • {shipment.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>ETA: {shipment.estimatedArrival}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{shipment.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={shipment.progress} className="h-2" />
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Last updated: {shipment.lastUpdate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Tracking Details</h3>
          {selectedShipment ? (
            <Card>
              <CardHeader>
                <CardTitle>Shipment {selectedShipment}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold">Tracking Events</h4>
                  <div className="space-y-3">
                    {shipments.find(s => s.id === selectedShipment)?.events.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 border rounded">
                        <div className="mt-1">
                          {getEventIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{event.event}</p>
                              <p className="text-xs text-gray-500">{event.location}</p>
                            </div>
                            <span className="text-xs text-gray-500">{event.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a shipment to view tracking details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TMSTracking;