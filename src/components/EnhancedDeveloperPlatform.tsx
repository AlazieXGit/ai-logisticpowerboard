import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, Settings, Zap, Brain, Smartphone, 
  Monitor, Globe, Upload, Play, Save, ArrowUp,
  Cpu, CheckCircle, AlertTriangle
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://www.alazie.express';

interface UpgradeRequest {
  id: string;
  type: string;
  title: string;
  status: string;
  priority: string;
  description: string;
  estimatedCost: string;
}

interface AIIntegration {
  name: string;
  status: string;
  usage: string;
  performance: string;
}

const EnhancedDeveloperPlatform = () => {
  const [upgradeRequests, setUpgradeRequests] = useState<UpgradeRequest[]>([]);
  const [aiIntegrations, setAiIntegrations] = useState<AIIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [upgradesRes, aiRes] = await Promise.all([
          axios.get<UpgradeRequest[]>(`${API_URL}/api/upgrade-requests`),
          axios.get<AIIntegration[]>(`${API_URL}/api/ai-integrations`)
        ]);
        setUpgradeRequests(upgradesRes.data);
        setAiIntegrations(aiRes.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Deploying': return 'bg-yellow-500';
      case 'Pending': return 'bg-orange-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Approved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-cyan-500">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Code className="h-6 w-6" />
            Enhanced Developer Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            Advanced development tools, AI integration management, and platform upgrade requests.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="upgrades" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="upgrades">Upgrade Requests</TabsTrigger>
          <TabsTrigger value="ai-integrations">AI Integrations</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="upgrades" className="space-y-4">
          <Card className="bg-gray-800/30 border-cyan-500">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <ArrowUp className="h-5 w-5" />
                Platform Upgrade Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <p className="text-gray-400">Loading...</p>}
              {error && <p className="text-red-400">Error: {error}</p>}
              {!loading && !error && (
                <div className="space-y-4">
                  {upgradeRequests.map((request) => (
                    <div key={request.id} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${getPriorityColor(request.priority)} text-white`}>
                              {request.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(request.status)} text-white`}>
                              {request.status}
                            </Badge>
                          </div>
                          <h3 className="text-white font-semibold text-lg">{request.title}</h3>
                          <p className="text-gray-400 text-sm">{request.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-cyan-400 font-bold">{request.estimatedCost}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{request.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-integrations" className="space-y-4">
          <Card className="bg-gray-800/30 border-purple-500">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Active AI Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <p className="text-gray-400">Loading...</p>}
              {error && <p className="text-red-400">Error: {error}</p>}
              {!loading && !error && (
                <div className="grid gap-4">
                  {aiIntegrations.map((ai, index) => (
                    <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-semibold">{ai.name}</h3>
                        <Badge className={`${getStatusColor(ai.status)} text-white`}>
                          {ai.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Usage:</span>
                          <span className="text-cyan-400">{ai.usage}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-cyan-500 h-2 rounded-full" 
                            style={{ width: ai.usage }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Performance:</span>
                          <span className="text-blue-400">{ai.performance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card className="bg-gray-800/30 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Deployment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-white font-semibold mb-2">Production Domain</h3>
                  <p className="text-cyan-400 font-mono">https://www.alazie.express</p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-white font-semibold mb-2">API Endpoints</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• GET /api/upgrade-requests</li>
                    <li>• GET /api/ai-integrations</li>
                    <li>• POST /api/upgrade-requests</li>
                    <li>• POST /api/ai-integrations</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Play className="h-4 w-4 mr-2" />
                    Deploy to Production
                  </Button>
                  <Button variant="outline" className="border-gray-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDeveloperPlatform;
