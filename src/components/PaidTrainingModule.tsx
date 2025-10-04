import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Lock, CheckCircle, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  content?: string;
}

interface PaidTrainingModuleProps {
  plan: 'beginner' | 'advanced' | 'innovation';
  subscriptionActive: boolean;
}

export default function PaidTrainingModule({ plan, subscriptionActive }: PaidTrainingModuleProps) {
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>({
    beginner: [
      { id: '1', title: 'Platform Overview', duration: '15 min', completed: true, locked: false },
      { id: '2', title: 'Account Setup', duration: '10 min', completed: false, locked: false },
      { id: '3', title: 'Basic Load Search', duration: '20 min', completed: false, locked: false },
      { id: '4', title: 'Booking Process', duration: '25 min', completed: false, locked: false }
    ],
    advanced: [
      { id: '1', title: 'Advanced Filtering', duration: '30 min', completed: false, locked: false },
      { id: '2', title: 'Dispatch Dashboard', duration: '45 min', completed: false, locked: false },
      { id: '3', title: 'TMS Integration', duration: '40 min', completed: false, locked: false },
      { id: '4', title: 'Analytics & Reporting', duration: '35 min', completed: false, locked: false },
      { id: '5', title: 'Workflow Optimization', duration: '50 min', completed: false, locked: false }
    ],
    innovation: [
      { id: '1', title: 'AI Automation Setup', duration: '60 min', completed: false, locked: false },
      { id: '2', title: 'Custom Workflows', duration: '75 min', completed: false, locked: false },
      { id: '3', title: 'API Integration', duration: '90 min', completed: false, locked: false },
      { id: '4', title: 'Advanced Analytics', duration: '45 min', completed: false, locked: false },
      { id: '5', title: 'Beta Features', duration: '30 min', completed: false, locked: false },
      { id: '6', title: 'Performance Optimization', duration: '55 min', completed: false, locked: false }
    ]
  }[plan]);

  const completedLessons = lessons.filter(l => l.completed).length;
  const progress = (completedLessons / lessons.length) * 100;

  const handleLessonClick = (lessonId: string) => {
    if (!subscriptionActive) return;
    
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && !lesson.locked) {
      setCurrentLesson(lessonId);
    }
  };

  const markComplete = (lessonId: string) => {
    setLessons(prev => 
      prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed: true }
          : lesson
      )
    );
    setCurrentLesson(null);
  };

  const getPlanTitle = () => {
    switch (plan) {
      case 'beginner': return 'Beginner Training Course';
      case 'advanced': return 'Advanced Training Course';
      case 'innovation': return 'Innovation Training Course';
      default: return 'Training Course';
    }
  };

  if (currentLesson) {
    const lesson = lessons.find(l => l.id === currentLesson);
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{lesson?.title}</CardTitle>
              <Button variant="outline" onClick={() => setCurrentLesson(null)}>
                Back to Course
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Video Content: {lesson?.title}</p>
                <p className="text-sm text-gray-500">Duration: {lesson?.duration}</p>
              </div>
            </div>
            <div className="prose max-w-none">
              <p>This lesson covers {lesson?.title.toLowerCase()} in detail...</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => markComplete(currentLesson)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{getPlanTitle()}</h1>
        <div className="flex items-center gap-4 mb-4">
          <Badge className={subscriptionActive ? 'bg-green-500' : 'bg-red-500'}>
            {subscriptionActive ? 'Active Subscription' : 'Subscription Required'}
          </Badge>
          <span className="text-sm text-gray-600">
            {completedLessons} of {lessons.length} lessons completed
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className={`cursor-pointer transition hover:shadow-md ${
              !subscriptionActive ? 'opacity-50' : ''
            }`}
            onClick={() => handleLessonClick(lesson.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : lesson.locked || !subscriptionActive ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Play className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </div>
                  </div>
                </div>
                {lesson.completed && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Completed
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}