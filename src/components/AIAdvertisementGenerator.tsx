import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Share2, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Advertisement {
  id: string;
  platform: string;
  content: string;
  status: 'generating' | 'ready' | 'posted';
  timestamp: string;
  engagement?: number;
}

const AIAdvertisementGenerator: React.FC = () => {
  const { toast } = useToast();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'youtube', name: 'YouTube', icon: '📺' }
  ];

  const generateAdvertisements = async () => {
    setIsGenerating(true);
    const targetPlatforms = selectedPlatform === 'all' ? platforms : platforms.filter(p => p.id === selectedPlatform);
    
    const newAds: Advertisement[] = targetPlatforms.map(platform => ({
      id: `ad_${Date.now()}_${platform.id}`,
      platform: platform.name,
      content: generatePlatformContent(platform.id),
      status: 'generating',
      timestamp: new Date().toLocaleString()
    }));

    setAdvertisements(prev => [...newAds, ...prev]);

    // Simulate AI generation process
    setTimeout(() => {
      setAdvertisements(prev => prev.map(ad => 
        newAds.find(newAd => newAd.id === ad.id) 
          ? { ...ad, status: 'ready' }
          : ad
      ));
      setIsGenerating(false);
      toast({ title: 'Advertisements Generated', description: `Created ${newAds.length} platform-specific ads` });
    }, 3000);
  };

  const generatePlatformContent = (platform: string): string => {
    const basePerks = [
      '🚛 Connect with 7,000+ verified carriers instantly',
      '⚡ AI-powered load matching in seconds',
      '💰 Maximize profits with smart pricing',
      '📊 Real-time market analytics',
      '🔒 Secure payment processing',
      '📱 Mobile-first platform design'
    ];

    const platformContent = {
      facebook: `🌟 Transform Your Logistics Business Today! 🌟\n\n${basePerks.slice(0, 4).join('\n')}\n\nJoin thousands of successful carriers and brokers who've revolutionized their operations. Start your free trial now! #LogisticsTech #FreightBroker`,
      
      twitter: `🚛 Ready to dominate the freight game? \n\n✅ 7K+ verified carriers\n✅ AI load matching\n✅ Real-time analytics\n✅ Secure payments\n\nJoin the logistics revolution! 🚀 #FreightTech #LogisticsAI`,
      
      linkedin: `Attention Logistics Professionals! 📈\n\nElevate your freight operations with our cutting-edge platform:\n\n${basePerks.slice(0, 3).join('\n')}\n\nTrusted by industry leaders. Schedule your demo today! #LogisticsSolutions #B2B`,
      
      instagram: `🌟 Your logistics success story starts here! ✨\n\n📸 Swipe to see how we're changing the game:\n${basePerks.slice(0, 3).join('\n')}\n\n#LogisticsLife #FreightSuccess #TechInnovation`,
      
      tiktok: `POV: You discover the ultimate freight platform 🤯\n\n${basePerks.slice(0, 3).join('\n')}\n\nComment 'FREIGHT' for early access! 🔥 #FreightTok #LogisticsTech #BusinessGrowth`,
      
      youtube: `🎬 How We're Revolutionizing Logistics (You Won't Believe #3!)\n\nDiscover the platform that's helping carriers earn 40% more:\n\n${basePerks.join('\n')}\n\nWatch our success stories and start your journey today!`
    };

    return platformContent[platform as keyof typeof platformContent] || platformContent.facebook;
  };

  const postAdvertisement = (adId: string) => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === adId 
        ? { ...ad, status: 'posted', engagement: Math.floor(Math.random() * 1000 + 100) }
        : ad
    ));
    toast({ title: 'Advertisement Posted', description: 'Successfully posted to social media platform' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Advertisement Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map(platform => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.icon} {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={generateAdvertisements} 
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? <Clock className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isGenerating ? 'Generating...' : 'Generate Ads'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {advertisements.map(ad => (
          <Card key={ad.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{platforms.find(p => p.name === ad.platform)?.icon}</span>
                  <span className="font-semibold">{ad.platform}</span>
                  <Badge 
                    className={`ml-2 ${
                      ad.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                      ad.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {ad.status === 'generating' && <Clock className="h-3 w-3 mr-1" />}
                    {ad.status === 'ready' && <Sparkles className="h-3 w-3 mr-1" />}
                    {ad.status === 'posted' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {ad.status}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{ad.timestamp}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={ad.content} 
                readOnly 
                className="mb-4 min-h-32 resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {ad.status === 'ready' && (
                    <Button 
                      size="sm" 
                      onClick={() => postAdvertisement(ad.id)}
                      className="flex items-center gap-1"
                    >
                      <Share2 className="h-4 w-4" />
                      Post Now
                    </Button>
                  )}
                </div>
                
                {ad.engagement && (
                  <Badge variant="outline" className="text-green-600">
                    {ad.engagement} engagements
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIAdvertisementGenerator;