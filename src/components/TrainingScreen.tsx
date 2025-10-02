import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Download, Play, ArrowLeft, Gift } from 'lucide-react';
import TrainingModule from './TrainingModule';
import { guestLessons, subscriberLessons } from '@/data/trainingData';

type ViewMode = 'home' | 'guest' | 'subscriber';

export default function TrainingScreen() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');

  const handleDownloadSCORM = () => {
    // Create a mock SCORM package download
    const element = document.createElement('a');
    const file = new Blob(['SCORM Package - LoadBoard AI Training Course'], { type: 'application/zip' });
    element.href = URL.createObjectURL(file);
    element.download = 'loadboard-ai-training-scorm.zip';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            <h1 className="text-xl font-bold">Free Guest Training Path</h1>
            <Badge className="bg-green-500 text-white">
              <Gift className="h-3 w-3 mr-1" />
              100% FREE
            </Badge>
          </div>
        </header>
        <TrainingModule 
          title="Free Guest Training Course"
          lessons={guestLessons}
          userType="guest"
        />
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
            <h1 className="text-xl font-bold">Free Subscriber Training Path</h1>
            <Badge className="bg-green-500 text-white">
              <Gift className="h-3 w-3 mr-1" />
              100% FREE
            </Badge>
          </div>
        </header>
        <TrainingModule 
          title="Free Subscriber Training Course"
          lessons={subscriberLessons}
          userType="subscriber"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-900 text-white py-6 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">LoadBoard AI Training</h1>
            <Badge className="bg-green-500 text-white">
              <Gift className="h-3 w-3 mr-1" />
              100% FREE
            </Badge>
          </div>
          <Button variant="ghost" className="text-white hover:text-blue-200">
            ← Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-10">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome to the FREE LoadBoard AI Course</h2>
          <p className="text-gray-600 mb-4">
            Whether you're a guest or subscriber, this mobile course will help you navigate the app.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Gift className="h-4 w-4 mr-2" />
              All training materials are completely FREE and available for download
            </Badge>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                👤 Guest Path
                <Badge className="bg-green-100 text-green-800">FREE</Badge>
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
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={() => setCurrentView('guest')}
              >
                <Play className="h-4 w-4 mr-2" />
                Start FREE Guest Path
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                💼 Subscriber Path
                <Badge className="bg-green-100 text-green-800">FREE</Badge>
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
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={() => setCurrentView('subscriber')}
              >
                <Play className="h-4 w-4 mr-2" />
                Start FREE Subscriber Path
              </Button>
            </CardContent>
          </Card>
        </section>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎓 Free Course Downloads
              <Badge className="bg-green-100 text-green-800">SCORM Compatible</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Download our complete training course for FREE! Compatible with any LMS system.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={handleDownloadSCORM} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Download SCORM Package
              </Button>
              <Button onClick={handleDownloadSCORM} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Download PDF Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center text-gray-400 text-sm p-4 mt-12">
        © 2025 LoadBoard AI. All training materials are FREE and always will be.
      </footer>
    </div>
  );
}