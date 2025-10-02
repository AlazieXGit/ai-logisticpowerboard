import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Truck, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DispatchOrder {
  id: string;
  customer: string;
  pickup: string;
  delivery: string;
  weight: number;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  status: 'unassigned' | 'assigned' | 'dispatched';
  assignedDriver?: string;
  assignedVehicle?: string;
  scheduledPickup: string;
  estimatedDelivery: string;
}

const TMSDispatch: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<DispatchOrder[]>([
    {
      id: 'ORD001',
      customer: 'ABC Manufacturing',
      pickup: 'Chicago, IL',
      delivery: 'Detroit, MI',
      weight: 15000,
      priority: 'urgent',
      status: 'unassigned',
      scheduledPickup: '2024-01-15 08:00',
      estimatedDelivery: '2024-01-15 18:00'
    },
    {
      id: 'ORD002',
      customer: 'XYZ Logistics',
      pickup: 'Atlanta, GA',
      delivery: 'Miami, FL',
      weight: 8500,
      priority: 'high',
      status: 'assigned',
      assignedDriver: 'Sarah Wilson',
      assignedVehicle: 'TR-105',
      scheduledPickup: '2024-01-16 06:00',
      estimatedDelivery: '2024-01-16 14:00'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [dispatchForm, setDispatchForm] = useState({
    driver: '',
    vehicle: '',
    notes: ''
  });

  const availableDrivers = [
    'John Smith',
    'Mike Johnson',
    'Sarah Wilson',
    'David Brown',
    'Lisa Davis'
  ];

  const availableVehicles = [
    'TR-101',
    'TR-102',
    'TR-103',
    'TR-104',
    'TR-105'
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unassigned': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDispatch = (orderId: string) => {
    if (!dispatchForm.driver || !dispatchForm.vehicle) {
      toast({
        title: 'Error',
        description: 'Please select both driver and vehicle',
        variant: 'destructive'
      });
      return;
    }

    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: 'dispatched' as const,
            assignedDriver: dispatchForm.driver,
            assignedVehicle: dispatchForm.vehicle
          }
        : order
    ));

    setSelectedOrder(null);
    setDispatchForm({ driver: '', vehicle: '', notes: '' });
    
    toast({
      title: 'Success',
      description: `Order ${orderId} dispatched successfully`,
    });
  };

  const handleAutoDispatch = () => {
    const unassignedOrders = orders.filter(o => o.status === 'unassigned');
    if (unassignedOrders.length === 0) {
      toast({
        title: 'Info',
        description: 'No unassigned orders to dispatch',
      });
      return;
    }

    // Simple auto-dispatch logic
    const updatedOrders = orders.map(order => {
      if (order.status === 'unassigned') {
        const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
        const randomVehicle = availableVehicles[Math.floor(Math.random() * availableVehicles.length)];
        return {
          ...order,
          status: 'assigned' as const,
          assignedDriver: randomDriver,
          assignedVehicle: randomVehicle
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    toast({
      title: 'Success',
      description: `Auto-dispatched ${unassignedOrders.length} orders`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dispatch Management</h2>
        <div className="flex gap-2">
          <Button onClick={handleAutoDispatch} className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Auto Dispatch
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Dispatch Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.weight.toLocaleString()} lbs</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span>Pickup: {order.pickup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span>Delivery: {order.delivery}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Pickup: {order.scheduledPickup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Delivery: {order.estimatedDelivery}</span>
                      </div>
                    </div>
                    
                    {order.assignedDriver && (
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Driver: {order.assignedDriver}</span>
                        <span>Vehicle: {order.assignedVehicle}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      {order.status === 'unassigned' && (
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedOrder(order.id)}
                          className="flex items-center gap-2"
                        >
                          <Truck className="h-4 w-4" />
                          Dispatch
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Dispatch Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedOrder ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="driver">Select Driver</Label>
                    <Select value={dispatchForm.driver} onValueChange={(value) => setDispatchForm(prev => ({ ...prev, driver: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose driver" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDrivers.map(driver => (
                          <SelectItem key={driver} value={driver}>{driver}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="vehicle">Select Vehicle</Label>
                    <Select value={dispatchForm.vehicle} onValueChange={(value) => setDispatchForm(prev => ({ ...prev, vehicle: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVehicles.map(vehicle => (
                          <SelectItem key={vehicle} value={vehicle}>{vehicle}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDispatch(selectedOrder)}
                      className="flex-1"
                    >
                      Confirm Dispatch
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedOrder(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Select an order to dispatch
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TMSDispatch;