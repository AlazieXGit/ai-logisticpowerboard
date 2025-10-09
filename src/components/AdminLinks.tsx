import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Key, Shield, Settings, Database, Users, DollarSign, BarChart3, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLinks: React.FC = () => {
  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const adminCodes = {
    masterAdmin: import.meta.env.VITE_ADMIN_CODE_MASTER || '[Configure in .env]',
    systemConfig: import.meta.env.VITE_ADMIN_CODE_SYSTEM || '[Configure in .env]',
    feeManagement: import.meta.env.VITE_ADMIN_CODE_FEE || '[Configure in .env]',
    userManagement: import.meta.env.VITE_ADMIN_CODE_USER || '[Configure in .env]',
    dataAccess: import.meta.env.VITE_ADMIN_CODE_DATA || '[Configure in .env]',
    apiKeys: {
      supabase: import.meta.env.VITE_SUPABASE_KEY || '[Configure in .env]',
      stripe: import.meta.env.VITE_STRIPE_KEY || '[Configure in .env]',
      twilio: import.meta.env.VITE_TWILIO_KEY || '[Configure in .env]',
      openai: import.meta.env.VITE_OPENAI_KEY || '[Configure in .env]'
    },
    databaseUrls: {
      production: import.meta.env.VITE_DB_URL_PROD || '[Configure in .env]',
      staging: import.meta.env.VITE_DB_URL_STAGING || '[Configure in .env]'
    }
  };

  const adminLinks = [
    {
      title: 'Master Admin Dashboard',
      url: '/admin/master',
      code: adminCodes.masterAdmin,
      description: 'Full system control and monitoring',
      icon: <Shield className="h-4 w-4" />
    },
    {
      title: 'Auto-Enrollment Management',
      url: '/admin/enrollment',
      code: adminCodes.systemConfig,
      description: 'Manage 7,000+ company auto-enrollment',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Fee Management System',
      url: '/admin/fees',
      code: adminCodes.feeManagement,
      description: 'Configure AI (3%) and Admin (5%) fees',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'User Management Portal',
      url: '/admin/users',
      code: adminCodes.userManagement,
      description: 'Manage user accounts and permissions',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'System Analytics',
      url: '/admin/analytics',
      code: adminCodes.dataAccess,
      description: 'View system performance and metrics',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      title: 'Database Management',
      url: '/admin/database',
      code: adminCodes.dataAccess,
      description: 'Direct database access and management',
      icon: <Database className="h-4 w-4" />
    }
  ];

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    toast({
      title: 'Copied to clipboard',
      description: `${item} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lime-400">Administrative Access Panel</h2>
        <Badge className="bg-red-100 text-red-800">
          <Lock className="h-3 w-3 mr-1" />
          Restricted Access
        </Badge>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Notice:</strong> These administrative links and codes provide full system access. 
          Only authorized personnel should have access to this information.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="links">Admin Links</TabsTrigger>
          <TabsTrigger value="codes">Access Codes</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminLinks.map((link, index) => (
              <Card key={index} className="bg-blue-900/50 border-lime-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lime-400 text-lg">
                    {link.icon}
                    {link.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-lime-300 text-sm">{link.description}</p>
                  <div className="space-y-2">
                    <Label className="text-lime-400 text-xs">URL:</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={link.url} 
                        readOnly 
                        className="bg-blue-800/50 border-lime-500/30 text-lime-100 text-sm"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(link.url, `${link.title} URL`)}
                        className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-lime-400 text-xs">Access Code:</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={link.code} 
                        readOnly 
                        className="bg-blue-800/50 border-lime-500/30 text-lime-100 text-sm font-mono"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(link.code, `${link.title} Code`)}
                        className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="codes" className="space-y-4">
          <Card className="bg-blue-900/50 border-lime-500/30">
            <CardHeader>
              <CardTitle className="text-lime-400">System Access Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(adminCodes).filter(([key]) => key !== 'apiKeys' && key !== 'databaseUrls').map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="text-lime-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={value as string} 
                      readOnly 
                      className="bg-blue-800/50 border-lime-500/30 text-lime-100 font-mono"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(value as string, key)}
                      className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
                    >
                      {copiedItem === key ? 'Copied!' : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-900/50 border-lime-500/30">
              <CardHeader>
                <CardTitle className="text-lime-400 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(adminCodes.apiKeys).map(([service, key]) => (
                  <div key={service} className="space-y-2">
                    <Label className="text-lime-400 capitalize">{service}:</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={key} 
                        readOnly 
                        type="password"
                        className="bg-blue-800/50 border-lime-500/30 text-lime-100 font-mono"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(key, `${service} API Key`)}
                        className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 border-lime-500/30">
              <CardHeader>
                <CardTitle className="text-lime-400 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Database URLs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(adminCodes.databaseUrls).map(([env, url]) => (
                  <div key={env} className="space-y-2">
                    <Label className="text-lime-400 capitalize">{env}:</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={url} 
                        readOnly 
                        type="password"
                        className="bg-blue-800/50 border-lime-500/30 text-lime-100 font-mono text-xs"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(url, `${env} Database URL`)}
                        className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLinks;