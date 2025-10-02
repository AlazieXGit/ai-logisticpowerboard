import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Download, Play, ArrowLeft, Gift, CreditCard, Check, Star, Zap, Calendar, AlertCircle } from 'lucide-react';
import TrainingModule from './TrainingModule';
import { guestLessons, subscriberLessons } from '@/data/trainingData';
import { useAuth } from '@/contexts/AuthContext';
import { useTrainingSubscription } from '@/hooks/useTrainingSubscription';

type ViewMode = 'home' | 'guest' | 'subscriber' | 'pricing' | 'paid-training';
type TrainingPlan = 'beginner' | 'advanced' | 'innovation' | null;

export default function UpdatedTrainingScreen() {
  const { user } = useAuth();
  const { subscriptions, createSubscription, cancelSubscription } = useTrainingSubscription();
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan>(null);
  const [showCancellation, setShowCancellation] = useState<string | null>(null);

  const handleDownloadSCORM = () => {
    const element = document.createElement('a');
    const file = new Blob(['SCORM Package - LoadBoard AI Training Course'], { type: 'application/zip' });
    element.href = URL.createObjectURL(file);
    element.download = 'loadboard-ai-training-scorm.zip';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSelectPlan = async (plan: 'beginner' | 'advanced' | 'innovation') => {
    const result = await createSubscription(plan);
    if (result.success) {
      setSelectedPlan(plan);
      setCurrentView('paid-training');
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (subscription) {
      const result = await cancelSubscription(subscriptionId);
      if (result.success) {
        alert(`Subscription cancelled. Fee: $${result.cancellationFee?.toFixed(2)}`);
      }
    }
    setShowCancellation(null);
  };

  const plans = [
    { id: 'beginner' as const, name: 'Beginner Training', price: 29, icon: <Check className="h-5 w-5" />, color: 'bg-green-600' },
    { id: 'advanced' as const, name: 'Advanced Training', price: 79, icon: <Star className="h-5 w-5" />, color: 'bg-blue-600', popular: true },
    { id: 'innovation' as const, name: 'Innovation Training', price: 149, icon: <Zap className="h-5 w-5" />, color: 'bg-purple-600' }
  ];

  if (currentView === 'guest') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-900 text-white py-4 shadow">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <Button variant="ghost" className="text-white" onClick={() => setCurrentView('home')}>
              <ArrowLeft className="h-4 w-4 mr-2" />Back
            </Button>
            <h1 className="text-xl font-bold">Free Guest Training</h1>
            <Badge className="bg-green-500"><Gift className="h-3 w-3 mr-1" />FREE</Badge>
          </div>
        </header>
        <TrainingModule title="Free Guest Training Course" lessons={guestLessons} userType="guest" />
      </div>
    );
  }

  if (currentView === 'subscriber') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-900 text-white py-4 shadow">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <Button variant="ghost" className="text-white" onClick={() => setCurrentView('home')}>
              <ArrowLeft className="h-4 w-4 mr-2" />Back
            </Button>
            <h1 className="text-xl font-bold">Free Subscriber Training</h1>
            <Badge className="bg-green-500"><Gift className="h-3 w-3 mr-1" />FREE</Badge>
          </div>
        </header>
        <TrainingModule title="Free Subscriber Training Course" lessons={subscriberLessons} userType="subscriber" />
      </div>
    );
  }

  if (currentView === 'pricing') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-900 text-white py-6 shadow">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <Button variant="ghost" className="text-white" onClick={() => setCurrentView('home')}>
              <ArrowLeft className="h-4 w-4 mr-2" />Back
            </Button>
            <h1 className="text-2xl font-bold">Premium Training Plans</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Choose Your Training Level</h2>
            <p className="text-gray-600">Unlock advanced features with premium subscriptions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative hover:shadow-lg transition ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center text-white mx-auto mb-2`}>
                    {plan.icon}
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">${plan.price}<span className="text-sm font-normal text-gray-500">/month</span></div>
                </CardHeader>
                <CardContent>
                  <Button className={`w-full ${plan.color} hover:opacity-90`} onClick={() => handleSelectPlan(plan.id)}>
                    Start {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-900 text-white py-6 shadow">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">LoadBoard AI Training Center</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Training Courses</TabsTrigger>
            <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />Free Training
                </h3>
                <div className="space-y-4">
                  <Card className="hover:shadow-lg transition">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Guest Path<Badge className="bg-green-100 text-green-800">FREE</Badge></CardTitle></CardHeader>
                    <CardContent><Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setCurrentView('guest')}><Play className="h-4 w-4 mr-2" />Start Free Course</Button></CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition">
                    <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Subscriber Path<Badge className="bg-green-100 text-green-800">FREE</Badge></CardTitle></CardHeader>
                    <CardContent><Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setCurrentView('subscriber')}><Play className="h-4 w-4 mr-2" />Start Free Course</Button></CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-500" />Premium Training
                </h3>
                <Card className="hover:shadow-lg transition">
                  <CardHeader><CardTitle>Structured Learning Programs</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600 mb-4">
                      <li>• Beginner Training ($29/month)</li>
                      <li>• Advanced Training ($79/month)</li>
                      <li>• Innovation Training ($149/month)</li>
                    </ul>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setCurrentView('pricing')}>View Premium Plans</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="subscriptions">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Training Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <Card><CardContent className="p-8 text-center"><CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-semibold text-gray-600">No Subscriptions</h3></CardContent></Card>
              ) : (
                <div className="grid gap-4">
                  {subscriptions.map((sub) => (
                    <Card key={sub.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />{sub.plan} Training</CardTitle>
                          <Badge className={sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{sub.status.toUpperCase()}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div><p className="text-sm text-gray-500">Price</p><p className="font-semibold">${sub.price}</p></div>
                          <div><p className="text-sm text-gray-500">Start Date</p><p className="font-semibold">{new Date(sub.startDate).toLocaleDateString()}</p></div>
                          <div><p className="text-sm text-gray-500">Next Billing</p><p className="font-semibold">{new Date(sub.nextBilling).toLocaleDateString()}</p></div>
                        </div>
                        {sub.status === 'active' && (
                          <Button variant="destructive" size="sm" onClick={() => setShowCancellation(sub.id)}>Cancel Subscription</Button>
                        )}
                        {showCancellation === sub.id && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm text-yellow-700 mb-3">5% cancellation fee: ${(sub.price * 0.05).toFixed(2)}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="destructive" onClick={() => handleCancelSubscription(sub.id)}>Confirm</Button>
                              <Button size="sm" variant="outline" onClick={() => setShowCancellation(null)}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="downloads">
            <Card>
              <CardHeader><CardTitle>Free Downloads</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button onClick={handleDownloadSCORM} variant="outline"><Download className="h-4 w-4 mr-2" />SCORM Package</Button>
                  <Button onClick={handleDownloadSCORM} variant="outline"><Download className="h-4 w-4 mr-2" />PDF Guide</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}