import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const InvestorSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investmentStage: '',
    priceRequest: '',
    inquiry: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const investmentStages = [
    { value: 'seed', label: 'Seed Round - $100K - $500K' },
    { value: 'series-a', label: 'Series A - $1M - $5M' },
    { value: 'series-b', label: 'Series B - $5M - $15M' },
    { value: 'growth', label: 'Growth Stage - $15M+' },
    { value: 'strategic', label: 'Strategic Partnership' },
    { value: 'acquisition', label: 'Acquisition Interest' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('investor-inquiry', {
        body: formData
      });

      if (error) throw error;

      // Also send email
      const emailBody = `
Investor Inquiry - LOADBOARD AI + TMS

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Investment Stage: ${formData.investmentStage}
Price Request: ${formData.priceRequest}
Inquiry Type: ${formData.inquiry}

Message:
${formData.message}

---
Submitted via LOADBOARD AI + TMS Investor Portal
      `;

      const subject = encodeURIComponent('LOADBOARD AI + TMS - Investor Inquiry');
      const body = encodeURIComponent(emailBody);
      
      window.open(`mailto:alaziellc.innovation@gmail.com?subject=${subject}&body=${body}`);
      
      toast({
        title: 'Success!',
        description: 'Your investor inquiry has been submitted successfully'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        investmentStage: '',
        priceRequest: '',
        inquiry: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit inquiry. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-navy-900/50 border-lime-500/30">
      <CardHeader>
        <CardTitle className="text-lime-400 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Investor Portal
        </CardTitle>
        <p className="text-lime-400/70 text-sm">
          Submit investment inquiries and partnership proposals
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-black/50 border-lime-500/30 text-lime-400"
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-black/50 border-lime-500/30 text-lime-400"
              required
            />
          </div>
          
          <Input
            placeholder="Company/Organization"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="bg-black/50 border-lime-500/30 text-lime-400"
          />
          
          <Select value={formData.investmentStage} onValueChange={(value) => setFormData({...formData, investmentStage: value})}>
            <SelectTrigger className="bg-black/50 border-lime-500/30 text-lime-400">
              <SelectValue placeholder="Select Investment Stage" />
            </SelectTrigger>
            <SelectContent className="bg-navy-900 border-lime-500/30">
              {investmentStages.map((stage) => (
                <SelectItem key={stage.value} value={stage.value} className="text-lime-400">
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Price Request/Budget Range"
            value={formData.priceRequest}
            onChange={(e) => setFormData({...formData, priceRequest: e.target.value})}
            className="bg-black/50 border-lime-500/30 text-lime-400"
          />
          
          <Textarea
            placeholder="Inquiry Details and Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="bg-black/50 border-lime-500/30 text-lime-400 min-h-[100px]"
            required
          />
          
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500/20 border border-lime-500/30 text-lime-400 hover:bg-lime-500/30"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Submitting...' : 'Submit Investor Inquiry'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-black/30 rounded border border-lime-500/20">
          <p className="text-lime-400/70 text-xs">
            All inquiries will be sent to: alaziellc.innovation@gmail.com
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorSection;