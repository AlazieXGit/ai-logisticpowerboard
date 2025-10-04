import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Share2, Mail, MessageCircle, Link, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ShareSection = () => {
  const [copied, setCopied] = useState(false);
  const appUrl = window.location.origin;
  const shareText = 'Check out LOADBOARD AI + TMS - The future of logistics powered by AI NUKIE!';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      toast({ title: 'Link copied!', description: 'Share link copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to copy link', variant: 'destructive' });
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('LOADBOARD AI + TMS - Revolutionary Logistics Platform');
    const body = encodeURIComponent(`${shareText}\n\nExplore the platform: ${appUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`${shareText} ${appUrl}`);
    window.open(`sms:?body=${message}`);
  };

  return (
    <Card className="bg-navy-900/50 border-lime-500/30">
      <CardHeader>
        <CardTitle className="text-lime-400 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share LOADBOARD AI + TMS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input 
            value={appUrl} 
            readOnly 
            className="bg-black/50 border-lime-500/30 text-lime-400"
          />
          <Button 
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={shareViaEmail}
            className="bg-lime-500/20 border border-lime-500/30 text-lime-400 hover:bg-lime-500/30"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          
          <Button 
            onClick={shareViaSMS}
            className="bg-lime-500/20 border border-lime-500/30 text-lime-400 hover:bg-lime-500/30"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            SMS
          </Button>
          
          <Button 
            onClick={copyToClipboard}
            className="bg-lime-500/20 border border-lime-500/30 text-lime-400 hover:bg-lime-500/30"
          >
            <Link className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
        
        <p className="text-lime-400/70 text-sm text-center">
          Share with potential customers and partners
        </p>
      </CardContent>
    </Card>
  );
};

export default ShareSection;