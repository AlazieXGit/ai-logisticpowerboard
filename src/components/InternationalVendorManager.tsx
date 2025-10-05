import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const InternationalVendorManager = () => (
  <Card className="bg-gray-800/50 border-cyan-500">
    <CardHeader>
      <CardTitle className="text-cyan-400 flex items-center gap-2">
        <Globe className="h-6 w-6" />
        International Vendor Manager
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-300">Vendor management module coming soon...</div>
    </CardContent>
  </Card>
);

export default InternationalVendorManager;
