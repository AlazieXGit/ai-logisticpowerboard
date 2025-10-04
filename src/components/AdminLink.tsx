import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ExternalLink, Settings, Database, Users, BarChart3 } from 'lucide-react';

const AdminLink: React.FC = () => {
  const adminUrl = window.location.origin + '/#admin';
  const directAdminUrl = `${window.location.origin}/admin`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(adminUrl);
    alert('Admin link copied to clipboard!');
  };

  const handleOpenAdmin = () => {
    window.open(adminUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Administrative Access</h2>
        <Badge className="bg-red-100 text-red-800">
          <Shield className="h-3 w-3 mr-1" />
          Restricted Access
        </Badge>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Administrative access is restricted to authorized personnel only. This link provides access to company registrations, transaction monitoring, and system settings.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Admin Dashboard Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-mono break-all">{adminUrl}</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleCopyLink}
                className="flex items-center gap-2"
                variant="outline"
              >
                <ExternalLink className="h-4 w-4" />
                Copy Link
              </Button>
              
              <Button 
                onClick={handleOpenAdmin}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <Shield className="h-4 w-4" />
                Open Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Admin Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Company Registration Management</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-600" />
                <span className="text-sm">Real-time Transaction Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Email Monitoring System</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-600" />
                <span className="text-sm">System Configuration</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Fee Structure</h4>
              <ul className="text-sm space-y-1">
                <li>• AI Processing Fee: 2%</li>
                <li>• AI Dispatching Fee: 2%</li>
                <li>• Real-time Processing: Active</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Monitoring</h4>
              <ul className="text-sm space-y-1">
                <li>• aarlucius@gmail.com</li>
                <li>• alford</li>
                <li>• arlucius@gmail.com</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Auto-Registration</h4>
              <ul className="text-sm space-y-1">
                <li>• Carrier/Broker Detection</li>
                <li>• Email-based Registration</li>
                <li>• Approval Workflow</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLink;