import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Cpu, Shield, Globe, Truck, Users, DollarSign, BarChart3 } from 'lucide-react';

const AppOverview = () => {
  const keyFeatures = [
    { icon: <Cpu className="w-5 h-5" />, title: 'AI-Powered Dispatch', description: 'Advanced AI algorithms optimize load matching and routing' },
    { icon: <Shield className="w-5 h-5" />, title: 'Live Vetting System', description: 'Real-time verification of all logistics partners worldwide' },
    { icon: <Globe className="w-5 h-5" />, title: 'Global Network', description: 'International database of certified carriers and shippers' },
    { icon: <Truck className="w-5 h-5" />, title: 'TMS Integration', description: 'Complete Transportation Management System' },
    { icon: <Users className="w-5 h-5" />, title: 'Multi-Platform', description: 'Web, mobile, and browser extension support' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Analytics Dashboard', description: 'Real-time performance metrics and insights' }
  ];

  const marketOpportunity = [
    { metric: 'Market Size', value: '$8.1 Trillion', description: 'Global logistics market by 2030' },
    { metric: 'Growth Rate', value: '6.5% CAGR', description: 'Annual compound growth rate' },
    { metric: 'Digital Adoption', value: '23%', description: 'Current digitalization in logistics' },
    { metric: 'Efficiency Gains', value: '30-40%', description: 'Potential cost reduction with AI' }
  ];

  const revenueStreams = [
    { stream: 'Subscription Plans', description: 'Tiered monthly/annual subscriptions for different user types' },
    { stream: 'Transaction Fees', description: 'Commission on successful load bookings and transactions' },
    { stream: 'Premium Features', description: 'Advanced analytics, priority support, and custom integrations' },
    { stream: 'API Licensing', description: 'Third-party integrations and white-label solutions' },
    { stream: 'Training Services', description: 'Professional training and certification programs' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-navy-900/50 border-lime-500/30">
        <CardHeader>
          <CardTitle className="text-lime-400 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            LOADBOARD AI + TMS - Executive Summary
          </CardTitle>
          <p className="text-lime-400/70">
            Revolutionary AI-powered logistics platform transforming freight management globally
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/30">
              <TabsTrigger value="overview" className="text-lime-400 data-[state=active]:bg-lime-500/20">Overview</TabsTrigger>
              <TabsTrigger value="market" className="text-lime-400 data-[state=active]:bg-lime-500/20">Market</TabsTrigger>
              <TabsTrigger value="revenue" className="text-lime-400 data-[state=active]:bg-lime-500/20">Revenue</TabsTrigger>
              <TabsTrigger value="tech" className="text-lime-400 data-[state=active]:bg-lime-500/20">Technology</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded border border-lime-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-lime-400">{feature.icon}</div>
                      <h3 className="text-lime-400 font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-lime-400/70 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="market" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketOpportunity.map((item, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded border border-lime-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lime-400 font-semibold">{item.metric}</h3>
                      <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30">
                        {item.value}
                      </Badge>
                    </div>
                    <p className="text-lime-400/70 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4">
              <div className="space-y-3">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded border border-lime-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-lime-400" />
                      <h3 className="text-lime-400 font-semibold">{stream.stream}</h3>
                    </div>
                    <p className="text-lime-400/70 text-sm">{stream.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tech" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-black/30 rounded border border-lime-500/20">
                  <h3 className="text-lime-400 font-semibold mb-2">Core Technologies</h3>
                  <ul className="text-lime-400/70 text-sm space-y-1">
                    <li>• React + TypeScript Frontend</li>
                    <li>• Supabase Backend & Database</li>
                    <li>• AI/ML Load Optimization</li>
                    <li>• Real-time WebSocket Connections</li>
                    <li>• Progressive Web App (PWA)</li>
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded border border-lime-500/20">
                  <h3 className="text-lime-400 font-semibold mb-2">Integrations</h3>
                  <ul className="text-lime-400/70 text-sm space-y-1">
                    <li>• FMCSA Database Integration</li>
                    <li>• Payment Processing (Stripe)</li>
                    <li>• GPS Tracking Systems</li>
                    <li>• ELD Device Connectivity</li>
                    <li>• Third-party TMS APIs</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppOverview;