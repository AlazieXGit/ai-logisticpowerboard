import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  plan: string;
  subscriptionStatus: 'free' | 'trial' | 'active' | 'expired';
  trialEndsAt?: string;
  trainingExpiresAt?: string;
  youtubeSubscribed: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateSubscription: (status: string) => void;
}

const EnhancedAuthContext = createContext<AuthContextType | undefined>(undefined);

// Export both hooks from the same context
export const useAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (context === undefined) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};

interface EnhancedAuthProviderProps {
  children: ReactNode;
}

export const EnhancedAuthProvider: React.FC<EnhancedAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('enhanced_auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('enhanced_auth_user');
      }
    }
    setLoading(false);
  }, []);

  const onboardToYouTube = async (userId: string) => {
    try {
      await supabase.functions.invoke('youtube-onboarding', {
        body: { userId, channelUrl: 'https://www.youtube.com/@AlazieXpressAnythang' }
      });
    } catch (error) {
      console.error('YouTube onboarding failed:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        plan: 'free',
        subscriptionStatus: 'free',
        trainingExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        youtubeSubscribed: false
      };
      
      setUser(mockUser);
      localStorage.setItem('enhanced_auth_user', JSON.stringify(mockUser));
      
      await onboardToYouTube(mockUser.id);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        plan: 'free',
        subscriptionStatus: 'trial',
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        trainingExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        youtubeSubscribed: false
      };
      
      setUser(mockUser);
      localStorage.setItem('enhanced_auth_user', JSON.stringify(mockUser));
      
      await onboardToYouTube(mockUser.id);
      localStorage.removeItem('onboarding_completed');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('enhanced_auth_user');
    localStorage.removeItem('onboarding_completed');
  };

  const updateSubscription = (status: string) => {
    if (user) {
      const updatedUser = { ...user, subscriptionStatus: status as User['subscriptionStatus'] };
      setUser(updatedUser);
      localStorage.setItem('enhanced_auth_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateSubscription
  };

  return <EnhancedAuthContext.Provider value={value}>{children}</EnhancedAuthContext.Provider>;
};

// Export AuthProvider as alias for backward compatibility
export const AuthProvider = EnhancedAuthProvider;