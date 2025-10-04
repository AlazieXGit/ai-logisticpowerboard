import React from 'react';
import { Download, FileArchive, Database, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function DataDownload() {
  const handleDownload = (packageType: string) => {
    const link = document.createElement('a');
    link.href = `/loadboard-ai-complete-data.zip`;
    link.download = `loadboard-ai-${packageType}-package.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Download Complete Data Package</h2>
        <p className="text-gray-600">Access all LoadBoard AI application files, training materials, and deployment configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Complete Application
            </CardTitle>
            <CardDescription>
              Full React TypeScript application with all components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 mb-4">
              <li>• All React components and pages</li>
              <li>• Training system with 10 lessons</li>
              <li>• UI components and styling</li>
              <li>• Context providers and hooks</li>
            </ul>
            <Button onClick={() => handleDownload('complete')} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Application
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database & Backend
            </CardTitle>
            <CardDescription>
              Supabase configuration and deployment files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 mb-4">
              <li>• Database schemas and migrations</li>
              <li>• Edge functions and API endpoints</li>
              <li>• Authentication configuration</li>
              <li>• Deployment scripts</li>
            </ul>
            <Button onClick={() => handleDownload('backend')} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Backend
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileArchive className="h-5 w-5" />
            Master Package
          </CardTitle>
          <CardDescription>
            Everything included - complete application ready for deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold mb-2">Frontend Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• AI Auto Dispatch System</li>
                <li>• Load Board with filters</li>
                <li>• Training modules (FREE)</li>
                <li>• PWA capabilities</li>
                <li>• Mobile responsive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Multi-tier pricing</li>
                <li>• Transaction processing</li>
                <li>• Analytics dashboard</li>
                <li>• Carrier integration</li>
                <li>• Payment management</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold text-blue-800">Estimated Value: $250,000+</p>
            <p className="text-sm text-blue-600">Development Time Saved: 6-8 months</p>
          </div>
          <Button onClick={() => handleDownload('master')} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download Master Package
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}