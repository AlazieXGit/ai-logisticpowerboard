import React, { useState } from 'react';
import { useEnhancedAuth } from '@/components/EnhancedAuthContext';
import AppLayout from '@/components/AppLayout';
import LoadBoard from '@/components/LoadBoard';
import DispatchDashboard from '@/components/DispatchDashboard';
import EnhancedTrainingScreen from '@/components/EnhancedTrainingScreen';
import SubscriptionManager from '@/components/SubscriptionManager';
import SocialMediaPlatform from '@/components/SocialMediaPlatform';
import BlogFeed from '@/components/BlogFeed';
import ShareSection from '@/components/ShareSection';
import InvestorSection from '@/components/InvestorSection';
import VettingSystem from '@/components/VettingSystem';
import AppOverview from '@/components/AppOverview';
import CompanyDirectory from '@/components/CompanyDirectory';
import InvestmentProposal from '@/components/InvestmentProposal';
import AppCapabilities from '@/components/AppCapabilities';
import RealTimeVolumeTracker from '@/components/RealTimeVolumeTracker';
import AdminDashboard from '@/components/AdminDashboard';
import AdminLink from '@/components/AdminLink';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Youtube, Truck, BookOpen, Users, Calendar, Share2, TrendingUp, Shield, Building2, FileText, Zap, BarChart3, Settings, ExternalLink } from 'lucide-react';

const EnhancedIndex = () => {
  const { user, updateSubscription } = useEnhancedAuth();
  const [activeTab, setActiveTab] = useState('loadboard');

  const handleUpgradeRequired = () => {
    setActiveTab('subscription');
  };

  const userType = user ? 'subscriber' : 'guest';
  const subscriptionStatus = user?.subscriptionStatus || 'free';
  const isAdmin = user?.email === 'admin@loadboard.ai' || user?.role === 'admin';

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with Real-time Processing */}
        <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-lime-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lime-400 futuristic-glow">
              <Youtube className="h-6 w-6 text-lime-400" />
              LOADBOARD AI + TMS - Real-Time Processing Active
              <Badge variant="outline" className="border-lime-400 text-lime-400 animate-pulse">
                2% AI Fees | Live Volume Tracking
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lime-300">
              Complete logistics platform with real-time transaction processing, updated 2% AI processing & dispatch fees, international vetting, and comprehensive company directory!
            </p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-15 bg-blue-900/50 border-lime-500/30">
            <TabsTrigger value="loadboard" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Truck className="h-4 w-4" />
              Loads
            </TabsTrigger>
            <TabsTrigger value="dispatch" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Users className="h-4 w-4" />
              Dispatch
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <BarChart3 className="h-4 w-4" />
              Volume
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <BookOpen className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Youtube className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Calendar className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Share2 className="h-4 w-4" />
              Share
            </TabsTrigger>
            <TabsTrigger value="investors" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <TrendingUp className="h-4 w-4" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="vetting" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Shield className="h-4 w-4" />
              Vetting
            </TabsTrigger>
            <TabsTrigger value="directory" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Building2 className="h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="capabilities" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <Zap className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="proposal" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              <FileText className="h-4 w-4" />
              Proposal
            </TabsTrigger>
            <TabsTrigger value="adminlink" className="flex items-center gap-1 text-orange-400 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300">
              <ExternalLink className="h-4 w-4" />
              Admin Link
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="flex items-center gap-1 text-red-400 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300">
                <Settings className="h-4 w-4" />
                Admin
              </TabsTrigger>
            )}
            <TabsTrigger value="subscription" className="text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loadboard" className="space-y-4">
            <LoadBoard />
          </TabsContent>

          <TabsContent value="dispatch" className="space-y-4">
            <DispatchDashboard />
          </TabsContent>

          <TabsContent value="volume" className="space-y-4">
            <RealTimeVolumeTracker />
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <EnhancedTrainingScreen 
              userId={user?.id || 'guest'}
              subscriptionStatus={subscriptionStatus}
              onUpgradeRequired={handleUpgradeRequired}
            />
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <SocialMediaPlatform userType={userType} />
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <BlogFeed />
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <ShareSection />
          </TabsContent>

          <TabsContent value="investors" className="space-y-4">
            <AppOverview />
            <InvestorSection />
          </TabsContent>

          <TabsContent value="vetting" className="space-y-4">
            <VettingSystem />
          </TabsContent>

          <TabsContent value="directory" className="space-y-4">
            <CompanyDirectory />
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4">
            <AppCapabilities />
          </TabsContent>

          <TabsContent value="proposal" className="space-y-4">
            <InvestmentProposal />
          </TabsContent>

          <TabsContent value="adminlink" className="space-y-4">
            <AdminLink />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="space-y-4">
              <AdminDashboard />
            </TabsContent>
          )}

          <TabsContent value="subscription" className="space-y-4">
            {user && (
              <SubscriptionManager 
                userId={user.id}
                onSubscriptionChange={updateSubscription}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default EnhancedIndex;