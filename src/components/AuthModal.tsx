import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from './AuthForm';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const { signIn, signUp } = useAuth();

  const handleAuth = async (email: string, password: string) => {
    if (mode === 'signin') {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Ai Nukie $ Load Board</DialogTitle>
        </DialogHeader>
        
        <Tabs value={mode} onValueChange={(value) => setMode(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signup" className="mt-4">
            <AuthForm
              mode="signup"
              onSubmit={handleAuth}
              onModeChange={setMode}
            />
          </TabsContent>
          
          <TabsContent value="signin" className="mt-4">
            <AuthForm
              mode="signin"
              onSubmit={handleAuth}
              onModeChange={setMode}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;