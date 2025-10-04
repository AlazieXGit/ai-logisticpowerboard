import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Users, Globe, Zap, Shield } from 'lucide-react';

const InvestmentProposal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lime-400 mb-4">AI NUKIE $ LOAD BOARD</h1>
          <h2 className="text-2xl font-semibold mb-2">Comprehensive Investment Proposal</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Revolutionary AI-powered logistics platform transforming freight matching, route optimization, and supply chain management
          </p>
        </div>

        <Tabs defaultValue="executive" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-lime-400/20">
            <TabsTrigger value="executive" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">Executive</TabsTrigger>
            <TabsTrigger value="market" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">Market</TabsTrigger>
            <TabsTrigger value="financials" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">Financials</TabsTrigger>
            <TabsTrigger value="investment" className="data-[state=active]:bg-lime-400 data-[state=active]:text-black">Investment</TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Key Investment Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lime-400">$800B+</div>
                      <div className="text-sm text-gray-300">Global Market Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lime-400">8.6%</div>
                      <div className="text-sm text-gray-300">Market CAGR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lime-400">$27.3M</div>
                      <div className="text-sm text-gray-300">Year 3 Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lime-400">42%</div>
                      <div className="text-sm text-gray-300">Net Margin</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Subscription Revenue</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">$11.9M</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>AI Generation Fees (1%)</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">$6.2M</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Payment Processing (3%)</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">$4.8M</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Visitor Booking Fees (13%)</span>
                      <Badge variant="outline" className="border-lime-400 text-lime-400">$2.6M</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Market Opportunity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-lg font-semibold text-lime-400">$800B</div>
                      <div className="text-sm text-gray-300">Total Addressable Market</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-lime-400">$180B</div>
                      <div className="text-sm text-gray-300">North American Freight</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-lime-400">$12B</div>
                      <div className="text-sm text-gray-300">Digital Freight Matching</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Target Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-lg font-semibold text-lime-400">3.5M</div>
                      <div className="text-sm text-gray-300">US Truckers</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-lime-400">17K+</div>
                      <div className="text-sm text-gray-300">Freight Brokers</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-lime-400">15%</div>
                      <div className="text-sm text-gray-300">Current Digital Adoption</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Problems We Solve</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>• 40% of trucks run empty</div>
                    <div>• $87B lost to inefficient routing</div>
                    <div>• 78% lack predictive analytics</div>
                    <div>• Traditional brokers charge 10-20%</div>
                    <div>• 30-45 day payment delays</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">3-Year Financial Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-lime-400/20">
                          <th className="text-left py-2 text-lime-400">Metric</th>
                          <th className="text-right py-2 text-lime-400">Year 1</th>
                          <th className="text-right py-2 text-lime-400">Year 2</th>
                          <th className="text-right py-2 text-lime-400">Year 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">Total Users</td>
                          <td className="text-right py-2 text-lime-400">15,000</td>
                          <td className="text-right py-2 text-lime-400">75,000</td>
                          <td className="text-right py-2 text-lime-400">200,000</td>
                        </tr>
                        <tr>
                          <td className="py-2">Total Revenue</td>
                          <td className="text-right py-2 text-lime-400">$2.75M</td>
                          <td className="text-right py-2 text-lime-400">$10.3M</td>
                          <td className="text-right py-2 text-lime-400">$27.3M</td>
                        </tr>
                        <tr>
                          <td className="py-2">Net Profit</td>
                          <td className="text-right py-2 text-lime-400">$650K</td>
                          <td className="text-right py-2 text-lime-400">$4.1M</td>
                          <td className="text-right py-2 text-lime-400">$11.5M</td>
                        </tr>
                        <tr>
                          <td className="py-2">Net Margin</td>
                          <td className="text-right py-2 text-lime-400">24%</td>
                          <td className="text-right py-2 text-lime-400">40%</td>
                          <td className="text-right py-2 text-lime-400">42%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investment" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Series A Funding: $12M</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Product Development</span>
                      <span className="text-lime-400">$4.2M (35%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales & Marketing</span>
                      <span className="text-lime-400">$3.6M (30%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team Expansion</span>
                      <span className="text-lime-400">$2.4M (20%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operations</span>
                      <span className="text-lime-400">$1.2M (10%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Working Capital</span>
                      <span className="text-lime-400">$0.6M (5%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-lime-400/20">
                <CardHeader>
                  <CardTitle className="text-lime-400">Return Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-lg font-semibold text-lime-400">8x</div>
                      <div className="text-sm text-gray-300">Conservative Return (5 years)</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-lime-400">15x</div>
                      <div className="text-sm text-gray-300">Base Case Return (5 years)</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-lime-400">25x</div>
                      <div className="text-sm text-gray-300">Optimistic Return (5 years)</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-lime-400 text-black hover:bg-lime-500">
                    Contact for Investment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentProposal;