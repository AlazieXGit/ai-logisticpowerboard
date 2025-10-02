import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from 'lucide-react';
import Lesson3_1 from './lessons/Lesson3_1';
import Lesson3_2 from './lessons/Lesson3_2';
import Lesson3_3 from './lessons/Lesson3_3';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
}

interface TrainingModuleProps {
  title: string;
  lessons: Lesson[];
  userType: 'guest' | 'subscriber';
}

export default function TrainingModule({ title, lessons, userType }: TrainingModuleProps) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const progress = (completedLessons.size / lessons.length) * 100;

  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const currentLessonData = lessons[currentLesson];

  const renderLessonContent = () => {
    // Render specific lesson components for the new lessons
    if (currentLessonData.id === 'guest-4') {
      return <Lesson3_1 />;
    }
    if (currentLessonData.id === 'guest-5') {
      return <Lesson3_2 />;
    }
    if (currentLessonData.id === 'guest-6') {
      return <Lesson3_3 />;
    }
    
    // Default HTML content for other lessons
    return (
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: currentLessonData.content }} />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Badge variant={userType === 'subscriber' ? 'default' : 'secondary'}>
            {userType === 'subscriber' ? 'Premium' : 'Guest'} Access
          </Badge>
        </div>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-gray-600">
          {completedLessons.size} of {lessons.length} lessons completed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Outline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
                    index === currentLesson ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentLesson(index)}
                >
                  {completedLessons.has(lesson.id) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{lesson.title}</p>
                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{currentLessonData.title}</CardTitle>
              <p className="text-sm text-gray-600">Duration: {currentLessonData.duration}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                {renderLessonContent()}
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevLesson}
                  disabled={currentLesson === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {!completedLessons.has(currentLessonData.id) && (
                    <Button
                      variant="outline"
                      onClick={() => markComplete(currentLessonData.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                  
                  <Button
                    onClick={nextLesson}
                    disabled={currentLesson === lessons.length - 1}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}