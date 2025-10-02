import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Edit, Trash2, Plus, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataPackage {
  id: string;
  name: string;
  type: 'view' | 'investment' | 'purchase';
  price: number;
  description: string;
  features: string[];
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export const AdminDataPackageManager: React.FC = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<DataPackage[]>([
    {
      id: 'view-only',
      name: 'View Only',
      type: 'view',
      price: 29,
      description: 'Read-only access to data insights',
      features: ['View load data trends', 'Market analytics dashboard', 'Historical pricing data'],
      isActive: false,
      isPublished: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'investment',
      name: 'Investment Package',
      type: 'investment',
      price: 149,
      description: 'Advanced analytics for investment decisions',
      features: ['All View Only features', 'Investment analytics', 'ROI calculations'],
      isActive: false,
      isPublished: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'purchase',
      name: 'Full Purchase',
      type: 'purchase',
      price: 499,
      description: 'Complete data ownership and access',
      features: ['All Investment features', 'Unlimited data export', 'API access'],
      isActive: false,
      isPublished: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ]);

  const [editingPackage, setEditingPackage] = useState<DataPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const togglePackageStatus = (packageId: string, field: 'isActive' | 'isPublished') => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, [field]: !pkg[field], updatedAt: new Date().toISOString().split('T')[0] }
        : pkg
    ));
    
    const pkg = packages.find(p => p.id === packageId);
    toast({
      title: `Package ${field === 'isActive' ? 'Activation' : 'Publication'} Updated`,
      description: `${pkg?.name} has been ${field === 'isActive' ? (pkg?.isActive ? 'deactivated' : 'activated') : (pkg?.isPublished ? 'unpublished' : 'published')}`
    });
  };

  const savePackage = (packageData: Partial<DataPackage>) => {
    if (editingPackage) {
      setPackages(prev => prev.map(pkg => 
        pkg.id === editingPackage.id 
          ? { ...pkg, ...packageData, updatedAt: new Date().toISOString().split('T')[0] }
          : pkg
      ));
      toast({ title: 'Package Updated', description: 'Data package has been updated successfully' });
    } else {
      const newPackage: DataPackage = {
        id: `pkg-${Date.now()}`,
        ...packageData as DataPackage,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setPackages(prev => [...prev, newPackage]);
      toast({ title: 'Package Created', description: 'New data package has been created successfully' });
    }
    setEditingPackage(null);
    setIsCreating(false);
  };

  const deletePackage = (packageId: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
    toast({ title: 'Package Deleted', description: 'Data package has been removed' });
  };

  const getStatusBadge = (pkg: DataPackage) => {
    if (pkg.isActive && pkg.isPublished) return <Badge className="bg-green-100 text-green-800">Live</Badge>;
    if (pkg.isActive) return <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>;
    if (pkg.isPublished) return <Badge className="bg-blue-100 text-blue-800">Published</Badge>;
    return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Data Package Management</h3>
        <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Package
        </Button>
      </div>

      <div className="grid gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <p className="text-sm text-gray-600">${pkg.price}/month</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(pkg)}
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => setEditingPackage(pkg)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deletePackage(pkg.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{pkg.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={pkg.isActive}
                      onCheckedChange={() => togglePackageStatus(pkg.id, 'isActive')}
                    />
                    <span className="text-sm">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={pkg.isPublished}
                      onCheckedChange={() => togglePackageStatus(pkg.id, 'isPublished')}
                    />
                    <span className="text-sm">Published</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Updated: {pkg.updatedAt}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDataPackageManager;