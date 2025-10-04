import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingSteps } from '@/components/OnboardingSteps';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    // Save onboarding completion to localStorage
    localStorage.setItem('onboarding_completed', 'true');
    // Redirect to main app after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Aboard!</h1>
            <p className="text-gray-600 mb-4">You're now ready to start using Ai Nukie Load Board</p>
            <p className="text-sm text-gray-500">Redirecting you to the dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Button variant="outline" onClick={handleSkip}>
            Skip Onboarding
          </Button>
        </div>
        
        <OnboardingSteps onComplete={handleComplete} />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@ainukie.com" className="text-blue-600 hover:underline">
              support@ainukie.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;