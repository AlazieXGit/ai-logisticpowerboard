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
import EnhancedAdminLink from '@/components/EnhancedAdminLink';
import UpdatedPricingSection from '@/components/UpdatedPricingSection';
import UpdatedOnboardingSteps from '@/components/UpdatedOnboardingSteps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Youtube, Truck, BookOpen, Users, Calendar, Share2, TrendingUp, Shield, Building2, FileText, Zap, BarChart3, Settings, ExternalLink, UserPlus } from 'lucide-react';

const UpdatedEnhancedIndex = () => {
  const { user, updateSubscription } = useEnhancedAuth();
  const [activeTab, setActiveTab] = useState('loadboard');

  const handleUpgradeRequired = () => {
    setActiveTab('subscription');
  };

  const userType = user ? 'subscriber' : 'guest';
  const subscriptionStatus = user?.subscriptionStatus || 'free';
  const isAdmin = user?.email === 'alaziellcalln1@gmail.com' || user?.role === 'admin';

  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-lime-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lime-400 futuristic-glow">
              <Youtube className="h-6 w-6 text-lime-400" />
              LOADBOARD AI + TMS - Enhanced Platform
              <Badge variant="outline" className="border-lime-400 text-lime-400 animate-pulse">
                2% AI Fees | FMCSA Compliant
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lime-300">
              Complete logistics platform with updated 2% AI processing & dispatch fees, FMCSA compliant registration, and enhanced administrative controls!
            </p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-16 bg-blue-900/50 border-lime-500/30">
            <TabsTrigger value="loadboard" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Truck className="h-4 w-4" />
              Loads
            </TabsTrigger>
            <TabsTrigger value="dispatch" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Users className="h-4 w-4" />
              Dispatch
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <BarChart3 className="h-4 w-4" />
              Volume
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <UserPlus className="h-4 w-4" />
              Register
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <TrendingUp className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <BookOpen className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Youtube className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Calendar className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Share2 className="h-4 w-4" />
              Share
            </TabsTrigger>
            <TabsTrigger value="investors" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <TrendingUp className="h-4 w-4" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="vetting" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Shield className="h-4 w-4" />
              Vetting
            </TabsTrigger>
            <TabsTrigger value="directory" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Building2 className="h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="capabilities" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <Zap className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="proposal" className="flex items-center gap-1 text-lime-400 data-[state=active]:bg-lime-500/20">
              <FileText className="h-4 w-4" />
              Proposal
            </TabsTrigger>
            <TabsTrigger value="adminlink" className="flex items-center gap-1 text-orange-400 data-[state=active]:bg-orange-500/20">
              <ExternalLink className="h-4 w-4" />
              Admin
            </TabsTrigger>
            <TabsTrigger value="subscription" className="text-lime-400 data-[state=active]:bg-lime-500/20">
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loadboard"><LoadBoard /></TabsContent>
          <TabsContent value="dispatch"><DispatchDashboard /></TabsContent>
          <TabsContent value="volume"><RealTimeVolumeTracker /></TabsContent>
          <TabsContent value="onboarding"><UpdatedOnboardingSteps /></TabsContent>
          <TabsContent value="pricing"><UpdatedPricingSection /></TabsContent>
          <TabsContent value="training">
            <EnhancedTrainingScreen 
              userId={user?.id || 'guest'}
              subscriptionStatus={subscriptionStatus}
              onUpgradeRequired={handleUpgradeRequired}
            />
          </TabsContent>
          <TabsContent value="social"><SocialMediaPlatform userType={userType} /></TabsContent>
          <TabsContent value="blog"><BlogFeed /></TabsContent>
          <TabsContent value="share"><ShareSection /></TabsContent>
          <TabsContent value="investors">
            <AppOverview />
            <InvestorSection />
          </TabsContent>
          <TabsContent value="vetting"><VettingSystem /></TabsContent>
          <TabsContent value="directory"><CompanyDirectory /></TabsContent>
          <TabsContent value="capabilities"><AppCapabilities /></TabsContent>
          <TabsContent value="proposal"><InvestmentProposal /></TabsContent>
          <TabsContent value="adminlink"><EnhancedAdminLink /></TabsContent>
          <TabsContent value="subscription">
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

export default UpdatedEnhancedIndex;