import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would call your backend
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        plan: 'free'
      };
      
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      // Check if user should go to onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      if (!hasCompletedOnboarding) {
        // Will be handled by Header component's useEffect
      }
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock registration - in real app, this would call your backend
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        plan: 'free'
      };
      
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      // New users should go through onboarding
      localStorage.removeItem('onboarding_completed');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('onboarding_completed');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};