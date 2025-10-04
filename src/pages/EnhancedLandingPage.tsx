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
import EnhancedAdminLink from '@/components/EnhancedAdminLink';
import UpdatedPricingSection from '@/components/UpdatedPricingSection';
import EnhancedUpdatedOnboardingSteps from '@/components/EnhancedUpdatedOnboardingSteps';
import ExpandableSearchBar from '@/components/ExpandableSearchBar';
import LandingPageMenu from '@/components/LandingPageMenu';
import AIAdvertisementGenerator from '@/components/AIAdvertisementGenerator';
import InvestmentDataPackages from '@/components/InvestmentDataPackages';
import WorldSilhouetteBackground from '@/components/WorldSilhouetteBackground';
import EnhancedAutoEnrollmentSystem from '@/components/EnhancedAutoEnrollmentSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Youtube, Truck, BookOpen, Users, Calendar, Share2, TrendingUp, Shield, Building2, FileText, Zap, BarChart3, ExternalLink, UserPlus, Bot, Database, Mail } from 'lucide-react';

const EnhancedLandingPage = () => {
  const { user, updateSubscription } = useEnhancedAuth();
  const [activeTab, setActiveTab] = useState('loadboard');

  const handleUpgradeRequired = () => {
    setActiveTab('subscription');
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const userType = user ? 'subscriber' : 'guest';
  const subscriptionStatus = user?.subscriptionStatus || 'free';

  return (
    <>
      <WorldSilhouetteBackground />
      <AppLayout>
        <div className="space-y-6 relative z-10">
          <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-lime-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-lime-400" />
                  <CardTitle className="text-lime-400 futuristic-glow">
                    LOADBOARD AI + TMS - Enhanced Platform
                  </CardTitle>
                  <Badge variant="outline" className="border-lime-400 text-lime-400 animate-pulse">
                    4% Live AI Booking Fees | Enhanced Features
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <ExpandableSearchBar onSearch={handleSearch} />
                  <LandingPageMenu onNavigate={setActiveTab} currentSection={activeTab} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lime-300">
                Complete logistics platform with AI-powered auto booking, enhanced payment processing, premium investment packages, and 7K+ carrier auto-enrollment!
              </p>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-19 bg-blue-900/50 border-lime-500/30">
              <TabsTrigger value="loadboard"><Truck className="h-4 w-4" />Loads</TabsTrigger>
              <TabsTrigger value="dispatch"><Users className="h-4 w-4" />Dispatch</TabsTrigger>
              <TabsTrigger value="volume"><BarChart3 className="h-4 w-4" />Volume</TabsTrigger>
              <TabsTrigger value="onboarding"><UserPlus className="h-4 w-4" />Register</TabsTrigger>
              <TabsTrigger value="pricing"><TrendingUp className="h-4 w-4" />Pricing</TabsTrigger>
              <TabsTrigger value="training"><BookOpen className="h-4 w-4" />Training</TabsTrigger>
              <TabsTrigger value="social"><Youtube className="h-4 w-4" />Social</TabsTrigger>
              <TabsTrigger value="blog"><Calendar className="h-4 w-4" />News</TabsTrigger>
              <TabsTrigger value="share"><Share2 className="h-4 w-4" />Share</TabsTrigger>
              <TabsTrigger value="investors"><TrendingUp className="h-4 w-4" />Investors</TabsTrigger>
              <TabsTrigger value="vetting"><Shield className="h-4 w-4" />Vetting</TabsTrigger>
              <TabsTrigger value="directory"><Building2 className="h-4 w-4" />Directory</TabsTrigger>
              <TabsTrigger value="capabilities"><Zap className="h-4 w-4" />Features</TabsTrigger>
              <TabsTrigger value="proposal"><FileText className="h-4 w-4" />Proposal</TabsTrigger>
              <TabsTrigger value="ai-ads"><Bot className="h-4 w-4" />AI Ads</TabsTrigger>
              <TabsTrigger value="investment-data"><Database className="h-4 w-4" />Investment Data</TabsTrigger>
              <TabsTrigger value="enrollment"><Mail className="h-4 w-4" />Auto Enrollment</TabsTrigger>
              <TabsTrigger value="adminlink"><ExternalLink className="h-4 w-4" />Admin</TabsTrigger>
              <TabsTrigger value="subscription">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="loadboard"><LoadBoard /></TabsContent>
            <TabsContent value="dispatch"><DispatchDashboard /></TabsContent>
            <TabsContent value="volume"><RealTimeVolumeTracker /></TabsContent>
            <TabsContent value="onboarding"><EnhancedUpdatedOnboardingSteps /></TabsContent>
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
            <TabsContent value="ai-ads"><AIAdvertisementGenerator /></TabsContent>
            <TabsContent value="investment-data"><InvestmentDataPackages /></TabsContent>
            <TabsContent value="enrollment"><EnhancedAutoEnrollmentSystem /></TabsContent>
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
    </>
  );
};

export default EnhancedLandingPage;