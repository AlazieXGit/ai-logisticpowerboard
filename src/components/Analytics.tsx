import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMembership } from './MembershipProvider';
import { BarChart3, TrendingUp, DollarSign, Lock, Users } from 'lucide-react';

interface AnalyticsProps {
  onOpenAuth: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onOpenAuth }) => {
  const { canAccessAnalytics, currentPlan, isAuthenticated } = useMembership();

  // Show visitor notice for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <Users className="h-4 w-4" />
          <AlertDescription>
            Welcome! You can explore Analytics features, but 
            <Button variant="link" onClick={onOpenAuth} className="p-0 h-auto ml-1 mr-1">
              sign in or register
            </Button>
            to access live analytics and detailed insights.
          </AlertDescription>
        </Alert>
        
        <Card className="p-8 text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Advanced Analytics Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Get detailed insights into your logistics performance, revenue trends, and optimization opportunities
          </p>
          <Button onClick={onOpenAuth} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Sign In to Access Analytics
          </Button>
        </Card>
      </div>
    );
  }

  if (!canAccessAnalytics) {
    return (
      <div className="space-y-6">
        <Alert className="border-yellow-200 bg-yellow-50">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Advanced Analytics available in Pro and Enterprise plans. 
            <Button variant="link" onClick={onOpenAuth} className="p-0 h-auto ml-2">
              Upgrade to unlock analytics
            </Button>
          </AlertDescription>
        </Alert>
        
        <Card className="p-8 text-center opacity-50">
          <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Advanced Analytics Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Get detailed insights into your logistics performance, revenue trends, and optimization opportunities
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
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">Revenue</p>
              <p className="text-2xl font-bold text-green-700">$125,430</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Growth</p>
              <p className="text-2xl font-bold text-blue-700">+23%</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Efficiency</p>
              <p className="text-2xl font-bold text-purple-700">94%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Loads Completed</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Rate per Mile</span>
              <span className="font-semibold">$2.45</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Top Lane</span>
              <span className="font-semibold">Chicago - Dallas</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Customer Satisfaction</span>
              <span className="font-semibold">4.8/5</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;