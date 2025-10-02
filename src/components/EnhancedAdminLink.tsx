import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Shield, Users, Settings, Mail, Lock } from 'lucide-react';

const EnhancedAdminLink = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    if (adminEmail === 'alaziellcalln1@gmail.com' && adminPassword === 'Innovation777!$') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const adminFeatures = [
    {
      title: 'Subscription Management',
      description: 'Manage all paid subscriptions and services',
      icon: Users,
      access: 'Full Control'
    },
    {
      title: 'Vendor Management',
      description: 'Oversee carriers, shippers, brokers, and independent companies',
      icon: Settings,
      access: 'Full Control'
    },
    {
      title: 'Email/SMS Verification',
      description: 'Manage auto-generated accounts and notifications',
      icon: Mail,
      access: 'System Control'
    },
    {
      title: 'Company Registration',
      description: 'Approve and manage company registrations',
      icon: Shield,
      access: 'Administrative'
    }
  ];

  if (!isAuthenticated) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-lime-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lime-400">
            <Lock className="h-6 w-6" />
            Administrative Access
            <Badge variant="outline" className="border-orange-400 text-orange-400">
              Restricted
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-500/30 bg-orange-900/20">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-orange-300">
              Administrative access required. Please enter your credentials.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                placeholder="Enter admin email"
              />
            </div>
            <div>
              <Label htmlFor="adminPassword">Admin Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="bg-blue-900/30 border-lime-500/30 text-lime-300"
                placeholder="Enter admin password"
              />
            </div>
            <Button
              onClick={handleAdminLogin}
              className="w-full bg-lime-500/20 text-lime-400 border border-lime-500/30 hover:bg-lime-500/30"
            >
              Access Admin Panel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-lime-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lime-400">
            <ExternalLink className="h-6 w-6" />
            Administrative Control Panel
            <Badge variant="outline" className="border-green-400 text-green-400">
              Authenticated
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="border-green-500/30 bg-green-900/20">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-green-300">
                Welcome, Administrator! You have full access to all system controls.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-blue-900/30 border-lime-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-lime-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-lime-300">{feature.title}</h4>
                          <p className="text-sm text-lime-400 mb-2">{feature.description}</p>
                          <Badge variant="outline" className="border-lime-400 text-lime-400 text-xs">
                            {feature.access}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="pt-4 border-t border-lime-500/30">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-lime-400">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lime-300 font-semibold">Admin Account</div>
                    <div className="text-lime-400">alaziellcalln1@gmail.com</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lime-300 font-semibold">Access Level</div>
                    <div className="text-lime-400">Full Administrative</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lime-300 font-semibold">User Category</div>
                    <div className="text-lime-400">Subscriber Admin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAdminLink;