import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMembership } from './MembershipProvider';
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Lock, Users } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'alert' | 'recommendation' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  timestamp: string;
}

interface AIAgentProps {
  onOpenAuth: () => void;
}

const AIAgent: React.FC<AIAgentProps> = ({ onOpenAuth }) => {
  const { canAccessAI, currentPlan, isAuthenticated } = useMembership();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(87);

  const generateInsight = (): AIInsight => {
    const types: AIInsight['type'][] = ['optimization', 'alert', 'recommendation', 'trend'];
    const impacts: AIInsight['impact'][] = ['high', 'medium', 'low'];
    
    const insightTemplates = {
      optimization: [
        'Route optimization detected for Chicago-Dallas corridor',
        'Fuel efficiency improvement opportunity identified',
        'Load consolidation potential in Texas region',
        'Backhaul optimization available for West Coast routes'
      ],
      alert: [
        'High demand surge detected in Northeast region',
        'Weather delays expected in Denver area',
        'Capacity shortage alert for refrigerated loads',
        'Rate volatility warning for flatbed equipment'
      ],
      recommendation: [
        'Consider increasing rates for high-demand lanes',
        'Expand fleet capacity in Southeast region',
        'Partner with local carriers for better coverage',
        'Implement dynamic pricing for peak hours'
      ],
      trend: [
        'Seasonal demand increase predicted for Q4',
        'Emerging market opportunity in renewable energy transport',
        'Cross-border trade volume trending upward',
        'E-commerce logistics demand accelerating'
      ]
    };
    
    const type = types[Math.floor(Math.random() * types.length)];
    const templates = insightTemplates[type];
    const title = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      id: `AI${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      type,
      title,
      description: `AI analysis shows ${Math.floor(Math.random() * 30 + 10)}% improvement potential with ${Math.floor(Math.random() * 50 + 50)}% confidence level.`,
      impact: impacts[Math.floor(Math.random() * impacts.length)],
      confidence: Math.floor(Math.random() * 30 + 70),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  useEffect(() => {
    if (canAccessAI) {
      const initialInsights = Array.from({ length: 6 }, generateInsight);
      setInsights(initialInsights);

      const interval = setInterval(() => {
        const newInsight = generateInsight();
        setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
        
        setOptimizationScore(prev => {
          const change = (Math.random() - 0.5) * 4;
          return Math.max(60, Math.min(100, prev + change));
        });
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [canAccessAI]);

  const runAnalysis = () => {
    if (!canAccessAI) {
      onOpenAuth();
      return;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      const newInsights = Array.from({ length: 3 }, generateInsight);
      setInsights(prev => [...newInsights, ...prev.slice(0, 7)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      case 'recommendation': return <TrendingUp className="h-4 w-4" />;
      case 'trend': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommendation': return 'bg-green-100 text-green-800 border-green-200';
      case 'trend': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Show visitor notice for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <Users className="h-4 w-4" />
          <AlertDescription>
            Welcome! You can explore AI Agent features, but 
            <Button variant="link" onClick={onOpenAuth} className="p-0 h-auto ml-1 mr-1">
              sign in or register
            </Button>
            to access live AI insights and recommendations.
          </AlertDescription>
        </Alert>
        
        <Card className="p-8 text-center">
          <Brain className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI-Powered Logistics Intelligence</h3>
          <p className="text-gray-600 mb-4">
            Get real-time optimization insights, route recommendations, and predictive analytics
          </p>
          <Button onClick={onOpenAuth} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Sign In to Access AI Agent
          </Button>
        </Card>
      </div>
    );
  }

  if (!canAccessAI) {
    return (
      <div className="space-y-6">
        <Alert className="border-yellow-200 bg-yellow-50">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            AI Agent is available in Pro and Enterprise plans. 
            <Button variant="link" onClick={onOpenAuth} className="p-0 h-auto ml-2">
              Upgrade to unlock AI insights
            </Button>
          </AlertDescription>
        </Alert>
        
        <Card className="p-8 text-center opacity-50">
          <Brain className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI-Powered Logistics Intelligence</h3>
          <p className="text-gray-600 mb-4">
            Get real-time optimization insights, route recommendations, and predictive analytics
          </p>
          <Button onClick={onOpenAuth} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Upgrade to Pro
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">AI Optimization</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-blue-700">{optimizationScore}%</p>
                <Progress value={optimizationScore} className="w-16 h-2" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Active Insights</p>
              <p className="text-2xl font-bold text-green-700">{insights.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Processing</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-purple-700">Real-time</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">AI Analysis Engine</h3>
            <p className="text-sm text-gray-600">Real-time insights and optimization recommendations</p>
          </div>
          <Button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run Deep Analysis
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Live AI Insights</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Updates every 8 seconds
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getInsightColor(insight.type)}>
                      {getInsightIcon(insight.type)}
                      {insight.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{insight.timestamp}</span>
                  </div>
                  <Badge variant="outline" className={getImpactColor(insight.impact)}>
                    {insight.impact} impact
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <Progress value={insight.confidence} className="w-16 h-2" />
                    <span className="text-xs font-medium">{insight.confidence}%</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAgent;