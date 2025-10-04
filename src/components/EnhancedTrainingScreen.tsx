import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Download, Play, ArrowLeft, Gift, Clock, Lock } from 'lucide-react';
import TrainingModule from './TrainingModule';
import TrainingTimeManager from './TrainingTimeManager';
import { guestLessons, subscriberLessons } from '@/data/trainingData';

type ViewMode = 'home' | 'guest' | 'subscriber';

interface EnhancedTrainingScreenProps {
  userId?: string;
  subscriptionStatus?: 'free' | 'trial' | 'active' | 'expired';
  onUpgradeRequired?: () => void;
}

export default function EnhancedTrainingScreen({ 
  userId = 'guest', 
  subscriptionStatus = 'free',
  onUpgradeRequired = () => {}
}: EnhancedTrainingScreenProps) {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  
  const isTrainingAccessible = () => {
    if (subscriptionStatus === 'active' || subscriptionStatus === 'trial') return true;
    
    const startDate = localStorage.getItem(`training_start_${userId}`);
    if (!startDate) return true;
    
    const daysSinceStart = Math.floor((Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceStart < 90;
  };

  const handleDownloadSCORM = () => {
    if (!isTrainingAccessible() && subscriptionStatus === 'free') {
      onUpgradeRequired();
      return;
    }
    
    const element = document.createElement('a');
    const file = new Blob(['SCORM Package - LoadBoard AI Training Course'], { type: 'application/zip' });
    element.href = URL.createObjectURL(file);
    element.download = 'loadboard-ai-training-scorm.zip';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleStartTraining = (path: 'guest' | 'subscriber') => {
    if (!isTrainingAccessible() && subscriptionStatus === 'free') {
      onUpgradeRequired();
      return;
    }
    setCurrentView(path);
  };

  if (currentView === 'guest') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-900 text-white py-4 shadow">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-200"
              onClick={() => setCurrentView('home')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Training Home
            </Button>
            <h1 className="text-xl font-bold">Guest Training Path</h1>
            <Badge className={isTrainingAccessible() ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
              {isTrainingAccessible() ? (
                <><Gift className="h-3 w-3 mr-1" />FREE</>
              ) : (
                <><Lock className="h-3 w-3 mr-1" />EXPIRED</>
              )}
            </Badge>
          </div>
        </header>
        {isTrainingAccessible() ? (
          <TrainingModule 
            title="Guest Training Course"
            lessons={guestLessons}
            userType="guest"
          />
        ) : (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Training Access Expired</h2>
            <p className="mb-4">Your 90-day free training period has ended.</p>
            <Button onClick={onUpgradeRequired}>Upgrade to Continue</Button>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'subscriber') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-900 text-white py-4 shadow">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-200"
              onClick={() => setCurrentView('home')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Training Home
            </Button>
            <h1 className="text-xl font-bold">Subscriber Training Path</h1>
            <Badge className={isTrainingAccessible() ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
              {isTrainingAccessible() ? (
                <><Gift className="h-3 w-3 mr-1" />FREE</>
              ) : (
                <><Lock className="h-3 w-3 mr-1" />EXPIRED</>
              )}
            </Badge>
          </div>
        </header>
        {isTrainingAccessible() ? (
          <TrainingModule 
            title="Subscriber Training Course"
            lessons={subscriberLessons}
            userType="subscriber"
          />
        ) : (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Training Access Expired</h2>
            <p className="mb-4">Your 90-day free training period has ended.</p>
            <Button onClick={onUpgradeRequired}>Upgrade to Continue</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-900 text-white py-6 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">LoadBoard AI Training</h1>
            <Badge className={isTrainingAccessible() ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
              {isTrainingAccessible() ? (
                <><Gift className="h-3 w-3 mr-1" />FREE ACCESS</>
              ) : (
                <><Clock className="h-3 w-3 mr-1" />90 DAYS EXPIRED</>
              )}
            </Badge>
          </div>
          <Button variant="ghost" className="text-white hover:text-blue-200">
            ← Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <TrainingTimeManager 
          userId={userId}
          subscriptionStatus={subscriptionStatus}
          onUpgradeRequired={onUpgradeRequired}
        />

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-2">LoadBoard AI Training Course</h2>
          <p className="text-gray-600 mb-4">
            {isTrainingAccessible() ? 
              'Free training available for 90 days from first access' :
              'Training access expired - upgrade to continue learning'
            }
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className={`hover:shadow-lg transition ${!isTrainingAccessible() ? 'opacity-50' : 'border-green-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                👤 Guest Path
                {isTrainingAccessible() ? (
                  <Badge className="bg-green-100 text-green-800">FREE</Badge>
                ) : (
                  <Badge variant="destructive">EXPIRED</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li>• Browse loads without account</li>
                <li>• View pricing & upgrade options</li>
                <li>• Understand platform limitations</li>
                <li>• Learn booking process</li>
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleStartTraining('guest')}
                disabled={!isTrainingAccessible()}
              >
                <Play className="h-4 w-4 mr-2" />
                {isTrainingAccessible() ? 'Start Guest Path' : 'Upgrade Required'}
              </Button>
            </CardContent>
          </Card>

          <Card className={`hover:shadow-lg transition ${!isTrainingAccessible() ? 'opacity-50' : 'border-green-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                💼 Subscriber Path
                {isTrainingAccessible() ? (
                  <Badge className="bg-green-100 text-green-800">FREE</Badge>
                ) : (
                  <Badge variant="destructive">EXPIRED</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li>• Use dispatch dashboard</li>
                <li>• Explore AI automation tools</li>
                <li>• Complete feature walkthrough</li>
                <li>• Advanced TMS features</li>
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleStartTraining('subscriber')}
                disabled={!isTrainingAccessible()}
              >
                <Play className="h-4 w-4 mr-2" />
                {isTrainingAccessible() ? 'Start Subscriber Path' : 'Upgrade Required'}
              </Button>
            </CardContent>
          </Card>
        </section>

        <Card className={`${!isTrainingAccessible() ? 'opacity-50' : 'border-green-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎓 Training Downloads
              <Badge className="bg-green-100 text-green-800">SCORM Compatible</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              {isTrainingAccessible() ? 
                'Download training materials during your free access period!' :
                'Downloads require active subscription or free trial period.'
              }
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={handleDownloadSCORM} 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50"
                disabled={!isTrainingAccessible()}
              >
                <Download className="h-4 w-4 mr-2" />
                Download SCORM Package
              </Button>
              <Button 
                onClick={handleDownloadSCORM} 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50"
                disabled={!isTrainingAccessible()}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center text-gray-400 text-sm p-4 mt-12">
        © 2025 LoadBoard AI. Free training for 90 days, then subscription required.
      </footer>
    </div>
  );
}