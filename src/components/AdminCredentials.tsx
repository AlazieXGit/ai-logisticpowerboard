import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCredentials: React.FC = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Admin credentials should be loaded from secure environment variables
  // DO NOT hardcode credentials in source code
  const adminCredentials = {
    email: import.meta.env.VITE_ADMIN_EMAIL || '[Configure in .env]',
    password: import.meta.env.VITE_ADMIN_PASSWORD || '[Configure in .env]',
    backupEmail: import.meta.env.VITE_BACKUP_EMAIL || '[Configure in .env]',
    backupPassword: import.meta.env.VITE_BACKUP_PASSWORD || '[Configure in .env]',
    masterKey: import.meta.env.VITE_MASTER_KEY || '[Configure in .env]',
    systemId: import.meta.env.VITE_SYSTEM_ID || '[Configure in .env]'
  };

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
        <h2 className="text-2xl font-bold text-red-600">Admin Access Credentials</h2>
        <Badge className="bg-red-100 text-red-800">
          <Lock className="h-3 w-3 mr-1" />
          Confidential
        </Badge>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>SECURITY WARNING:</strong> These are the master admin credentials for LoadBoard AI + TMS. 
          Keep this information secure and only share with authorized personnel.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-700 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Primary Admin Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-red-600 font-semibold">Email:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={adminCredentials.email} 
                  readOnly 
                  className="bg-red-50 border-red-200 text-red-800 font-mono"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(adminCredentials.email, 'Admin Email')}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  {copiedItem === 'Admin Email' ? 'Copied!' : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-red-600 font-semibold">Password:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={adminCredentials.password} 
                  readOnly 
                  type={showPassword ? 'text' : 'password'}
                  className="bg-red-50 border-red-200 text-red-800 font-mono"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowPassword(!showPassword)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(adminCredentials.password, 'Admin Password')}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  {copiedItem === 'Admin Password' ? 'Copied!' : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Backup Admin Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-orange-600 font-semibold">Backup Email:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={adminCredentials.backupEmail} 
                  readOnly 
                  className="bg-orange-50 border-orange-200 text-orange-800 font-mono"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(adminCredentials.backupEmail, 'Backup Email')}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  {copiedItem === 'Backup Email' ? 'Copied!' : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-orange-600 font-semibold">Backup Password:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={adminCredentials.backupPassword} 
                  readOnly 
                  type={showPassword ? 'text' : 'password'}
                  className="bg-orange-50 border-orange-200 text-orange-800 font-mono"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(adminCredentials.backupPassword, 'Backup Password')}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  {copiedItem === 'Backup Password' ? 'Copied!' : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-700">System Access Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-600 font-semibold">Master Key:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={adminCredentials.masterKey} 
                  readOnly 
                  className="bg-blue-50 border-blue-200 text-blue-800 font-mono text-sm"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(adminCredentials.masterKey, 'Master Key')}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  {copiedItem === 'Master Key' ? 'Copied!' : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-blue-600 font-semibold">System ID:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={adminCredentials.systemId} 
                  readOnly 
                  className="bg-blue-50 border-blue-200 text-blue-800 font-mono"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(adminCredentials.systemId, 'System ID')}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  {copiedItem === 'System ID' ? 'Copied!' : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-green-200 bg-green-50">
        <AlertDescription>
          <strong>Access Instructions:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Use primary admin credentials for regular administrative tasks</li>
            <li>• Backup credentials are for emergency access only</li>
            <li>• Master key provides system-level access to all components</li>
            <li>• System ID is required for API authentication</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AdminCredentials;