import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMembership } from './MembershipProvider';
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Route, 
  Fuel, 
  Shield,
  Zap,
  Lock,
  Users
} from 'lucide-react';

interface LogisticsFeaturesProps {
  onOpenAuth: () => void;
}

const LogisticsFeatures: React.FC<LogisticsFeaturesProps> = ({ onOpenAuth }) => {
  const { canAccessAI, canAccessAnalytics, currentPlan, isAuthenticated } = useMembership();

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Fleet Management',
      description: 'Track and manage your entire fleet in real-time',
      premium: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Route className="h-6 w-6" />,
      title: 'Route Optimization',
      description: 'AI-powered route planning for maximum efficiency',
      premium: true,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Deep insights into your logistics performance',
      premium: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Fuel className="h-6 w-6" />,
      title: 'Fuel Optimization',
      description: 'Find cheapest fuel stops along your routes',
      premium: false,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Load Insurance',
      description: 'Comprehensive coverage for your cargo',
      premium: true,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Real-time Tracking',
      description: 'Live GPS tracking for all shipments',
      premium: false,
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Visitor Notice */}
      {!isAuthenticated && (
        <Alert className="border-blue-200 bg-blue-50">
          <Users className="h-4 w-4" />
          <AlertDescription>
            Welcome! You can explore all logistics features, but 
            <Button variant="link" onClick={onOpenAuth} className="p-0 h-auto ml-1 mr-1">
              sign in or register
            </Button>
            to access premium tools and AI-powered optimization.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Logistics Command Center
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Powerful tools to streamline your logistics operations with AI-driven insights and automation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const hasAccess = !feature.premium || (isAuthenticated && feature.premium && (canAccessAI || canAccessAnalytics));
          
          return (
            <Card key={index} className={`relative overflow-hidden transition-all hover:shadow-lg ${
              !hasAccess ? 'opacity-75' : ''
            }`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.icon}
                  </div>
                  {feature.premium && (
                    <Badge className={hasAccess ? 'bg-green-500' : 'bg-gray-400'}>
                      {hasAccess ? 'ACTIVE' : 'PREMIUM'}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                {!hasAccess && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Lock className="h-4 w-4" />
                    <span>{!isAuthenticated ? 'Sign in to access' : 'Upgrade to unlock'}</span>
                  </div>
                )}
                
                {hasAccess && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Zap className="h-4 w-4" />
                    <span>Available in your plan</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to optimize your logistics?</h3>
            <p className="text-gray-600">
              {!isAuthenticated 
                ? 'Sign in to access premium logistics features and AI optimization'
                : currentPlan === 'free' 
                ? 'Upgrade to unlock advanced AI features and unlimited access'
                : 'You have access to all premium logistics features'}
            </p>
          </div>
          <div className="flex gap-3">
            {(!isAuthenticated || currentPlan === 'free') && (
              <Button onClick={onOpenAuth} className="bg-gradient-to-r from-green-600 to-blue-600">
                {!isAuthenticated ? 'Sign In' : 'Upgrade Now'}
              </Button>
            )}
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LogisticsFeatures;