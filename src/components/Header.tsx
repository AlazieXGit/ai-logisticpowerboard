import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Truck, Zap, Bell, User, DollarSign, LogOut, CreditCard, Settings, BookOpen, Download, Database } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !localStorage.getItem('onboarding_completed')) {
      setShowOnboardingPrompt(true);
    }
  }, [user]);

  const handlePaymentsClick = () => {
    navigate('/payments');
  };

  const handleTrainingClick = () => {
    navigate('/training');
  };

  const handleDownloadsClick = () => {
    navigate('/downloads');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleOnboardingClick = () => {
    navigate('/onboarding');
    setShowOnboardingPrompt(false);
  };

  const dismissOnboardingPrompt = () => {
    setShowOnboardingPrompt(false);
  };

  const handleDownloadTraining = () => {
    const link = document.createElement('a');
    link.href = '/scorm-training-package.zip';
    link.download = 'LoadBoard-AI-Training-Course.zip';
    link.click();
  };

  const handleDownloadData = () => {
    const link = document.createElement('a');
    link.href = '/loadboard-ai-complete-data.zip';
    link.download = 'LoadBoard-AI-Complete-Data.zip';
    link.click();
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-lg border-b border-lime-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleHomeClick}>
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/683080706131f9f711a66935_1752360483796_8a435281.jpg" 
                alt="AI Nukie Logo" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-lime-400 futuristic-glow">
                  LOADBOARD AI + TMS
                </h1>
                <p className="text-xs text-lime-300">Powered by AI NUKIE</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-lime-400 hover:bg-lime-500/20">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Free Training
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-blue-900 border-lime-500/30">
                  <DropdownMenuItem onClick={handleTrainingClick} className="text-lime-400 hover:bg-lime-500/20">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Training Course
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadTraining} className="text-lime-400 hover:bg-lime-500/20">
                    <Download className="h-4 w-4 mr-2" />
                    Download SCORM Package
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-lime-400 hover:bg-lime-500/20">
                    <Database className="h-4 w-4 mr-2" />
                    Data Package
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-blue-900 border-lime-500/30">
                  <DropdownMenuItem onClick={handleDownloadsClick} className="text-lime-400 hover:bg-lime-500/20">
                    <Database className="h-4 w-4 mr-2" />
                    View All Downloads
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadData} className="text-lime-400 hover:bg-lime-500/20">
                    <Download className="h-4 w-4 mr-2" />
                    Quick Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" onClick={handlePaymentsClick} className="text-lime-400 hover:bg-lime-500/20">
                <CreditCard className="h-4 w-4 mr-2" />
                Payments
              </Button>
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-lime-300">Live Updates</span>
              </div>
              <Badge className="bg-gradient-to-r from-lime-500 to-black text-white">
                <Zap className="h-3 w-3 mr-1" />
                AI Active
              </Badge>
              {user && (
                <Badge className="bg-gradient-to-r from-black to-lime-500 text-white">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {user && (
                <Button variant="ghost" size="sm" className="relative text-lime-400 hover:bg-lime-500/20">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-lime-500 rounded-full"></span>
                </Button>
              )}
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-lime-400 hover:bg-lime-500/20">
                      <User className="h-4 w-4 mr-2" />
                      {user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-blue-900 border-lime-500/30">
                    <DropdownMenuItem onClick={handleTrainingClick} className="text-lime-400 hover:bg-lime-500/20">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Free Training Course
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadTraining} className="text-lime-400 hover:bg-lime-500/20">
                      <Download className="h-4 w-4 mr-2" />
                      Download Training
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadsClick} className="text-lime-400 hover:bg-lime-500/20">
                      <Database className="h-4 w-4 mr-2" />
                      Data Downloads
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOnboardingClick} className="text-lime-400 hover:bg-lime-500/20">
                      <Settings className="h-4 w-4 mr-2" />
                      Setup Guide
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePaymentsClick} className="text-lime-400 hover:bg-lime-500/20">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment System
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="text-lime-400 hover:bg-lime-500/20">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20">
                        <Download className="h-4 w-4 mr-2" />
                        Free Downloads
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-blue-900 border-lime-500/30">
                      <DropdownMenuItem onClick={handleTrainingClick} className="text-lime-400 hover:bg-lime-500/20">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Training Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadTraining} className="text-lime-400 hover:bg-lime-500/20">
                        <Download className="h-4 w-4 mr-2" />
                        Download Training
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadsClick} className="text-lime-400 hover:bg-lime-500/20">
                        <Database className="h-4 w-4 mr-2" />
                        All Data Downloads
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    className="bg-gradient-to-r from-lime-600 to-black hover:from-lime-700 hover:to-gray-900 text-white"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Onboarding Prompt */}
        {showOnboardingPrompt && (
          <div className="bg-gradient-to-r from-lime-500 to-black text-white px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Complete your setup to get the most out of LOADBOARD AI + TMS</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={handleOnboardingClick}>
                  Start Setup
                </Button>
                <Button size="sm" variant="ghost" onClick={dismissOnboardingPrompt} className="text-white hover:bg-white/20">
                  ×
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Header;