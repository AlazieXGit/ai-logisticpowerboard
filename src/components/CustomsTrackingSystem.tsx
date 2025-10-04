import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck } from 'lucide-react';

const CustomsTrackingSystem = () => (
  <Card className="bg-gray-800/50 border-cyan-500">
    <CardHeader>
      <CardTitle className="text-cyan-400 flex items-center gap-2">
        <FileCheck className="h-6 w-6" />
        Customs Tracking System
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-gray-300">Customs tracking module coming soon...</div>
    </CardContent>
  </Card>
);

export default CustomsTrackingSystem;
