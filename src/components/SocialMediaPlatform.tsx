import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Calendar, ExternalLink } from 'lucide-react';

interface SocialMediaPlatformProps {
  userType: 'guest' | 'subscriber';
}

const SocialMediaPlatform: React.FC<SocialMediaPlatformProps> = ({ userType }) => {
  const [isLive, setIsLive] = useState(false);

  const handleYouTubeRedirect = () => {
    window.open('https://www.youtube.com/@AlazieXpressAnythang', '_blank');
  };

  const handleGoLive = () => {
    if (userType === 'subscriber') {
      setIsLive(true);
      // Integrate with streaming service
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Social Media Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">AlazieXpress Anythang</h3>
              <p className="text-sm text-gray-600">Official YouTube Channel</p>
            </div>
            <Button onClick={handleYouTubeRedirect} variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Channel
            </Button>
          </div>
          
          {userType === 'subscriber' && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Live Streaming</span>
                {isLive && <Badge variant="destructive">LIVE</Badge>}
              </div>
              <Button onClick={handleGoLive} disabled={isLive}>
                <Users className="h-4 w-4 mr-2" />
                {isLive ? 'Streaming Live' : 'Go Live'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaPlatform;