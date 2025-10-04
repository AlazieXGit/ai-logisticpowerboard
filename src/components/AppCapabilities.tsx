import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Zap, Shield, Globe, DollarSign, Users } from 'lucide-react';

const AppCapabilities = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lime-400 mb-4">AI NUKIE $ LOAD BOARD</h1>
          <h2 className="text-2xl font-semibold mb-2">Complete App Capabilities & Functions</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Comprehensive overview of all features, pricing models, and advanced capabilities
          </p>
        </div>

        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-lime-400/20">
            <TabsTrigger value="core" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">Core Features</TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">AI Capabilities</TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">Pricing Model</TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Live Load Board
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Real-time load postings</div>
                    <div>• Advanced search filters</div>
                    <div>• Distance-based matching</div>
                    <div>• Load value restrictions by tier</div>
                    <div>• Instant booking capabilities</div>
                    <div>• Mobile-responsive interface</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Integrated payment processing</div>
                    <div>• 24-hour payment cycles</div>
                    <div>• 3% processing fee</div>
                    <div>• Advance payment options</div>
                    <div>• Automated invoicing</div>
                    <div>• Multi-currency support</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Vetting System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• International live verification</div>
                    <div>• FMCSA certification checks</div>
                    <div>• Real-time company validation</div>
                    <div>• Insurance verification</div>
                    <div>• Credit score monitoring</div>
                    <div>• Fraud detection algorithms</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Fleet Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Multi-vehicle tracking</div>
                    <div>• Driver performance metrics</div>
                    <div>• Maintenance scheduling</div>
                    <div>• Fuel consumption monitoring</div>
                    <div>• Hours of service tracking</div>
                    <div>• Equipment management</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Company Directory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• FMCSA certified companies</div>
                    <div>• Shippers database</div>
                    <div>• Carriers directory</div>
                    <div>• Brokers listing</div>
                    <div>• Export/Import companies</div>
                    <div>• Manufacturers database</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Matching Engine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Matching Accuracy Improvement</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">40%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Load Fill Time Reduction</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">65%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fraud Detection Rate</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">85%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Predictive Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>• Demand forecasting</div>
                    <div>• Price prediction models</div>
                    <div>• Capacity planning</div>
                    <div>• Seasonal trend analysis</div>
                    <div>• Market volatility alerts</div>
                    <div>• Performance optimization</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Free Starter</CardTitle>
                  <div className="text-2xl font-bold text-lime-400">$0<span className="text-sm text-gray-300">/month</span></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>• 3 loads per day</div>
                    <div>• Max $1,000 per load</div>
                    <div>• 50-mile search radius</div>
                    <div>• Email support only</div>
                    <div>• All transaction fees apply</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Pro Hauler</CardTitle>
                  <div className="text-2xl font-bold text-lime-400">$49<span className="text-sm text-gray-300">/month</span></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>• Unlimited loads</div>
                    <div>• No load value restrictions</div>
                    <div>• AI matching & insights</div>
                    <div>• 500-mile search radius</div>
                    <div>• Priority support</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Fleet Master</CardTitle>
                  <div className="text-2xl font-bold text-lime-400">$149<span className="text-sm text-gray-300">/month</span></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>• Everything in Pro</div>
                    <div>• Multi-user access (10 users)</div>
                    <div>• Custom integrations</div>
                    <div>• White-label options</div>
                    <div>• Dedicated support</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppCapabilities;