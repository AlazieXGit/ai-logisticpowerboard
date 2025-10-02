import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download, Apple, Play, QrCode } from 'lucide-react';

const MobileApp: React.FC = () => {
  const handleDownload = (platform: string) => {
    // In a real app, this would redirect to app stores
    console.log(`Downloading ${platform} app`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Mobile App</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take LoadBoard AI + TMS with you anywhere. Full functionality on mobile.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="text-center">
            <div className="mx-auto p-4 bg-blue-600 rounded-full w-fit">
              <Apple className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">iOS App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge className="mb-2">Coming Soon</Badge>
              <p className="text-sm text-gray-600 mb-4">
                Native iOS app with full TMS integration
              </p>
              <Button 
                onClick={() => handleDownload('iOS')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled
              >
                <Apple className="h-4 w-4 mr-2" />
                Download for iOS
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="text-center">
            <div className="mx-auto p-4 bg-green-600 rounded-full w-fit">
              <Play className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">Android App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge className="mb-2">Coming Soon</Badge>
              <p className="text-sm text-gray-600 mb-4">
                Native Android app with offline capabilities
              </p>
              <Button 
                onClick={() => handleDownload('Android')}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled
              >
                <Play className="h-4 w-4 mr-2" />
                Download for Android
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl flex items-center justify-center gap-2">
            <Smartphone className="h-6 w-6" />
            Progressive Web App (PWA)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Badge className="bg-green-600">Available Now</Badge>
          <p className="text-sm text-gray-600">
            Install our web app on your mobile device for app-like experience
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Install PWA
            </Button>
            <Button 
              variant="outline"
              onClick={() => alert('QR Code: Point your phone camera at this screen')}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <h3 className="font-semibold mb-2">Real-time Updates</h3>
          <p className="text-sm text-gray-600">Get instant notifications for new loads and dispatch updates</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="font-semibold mb-2">Offline Mode</h3>
          <p className="text-sm text-gray-600">Access critical data even without internet connection</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="font-semibold mb-2">GPS Integration</h3>
          <p className="text-sm text-gray-600">Real-time location tracking and route optimization</p>
        </Card>
      </div>
    </div>
  );
};

export default MobileApp;