import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  membershipTier: 'free' | 'pro' | 'enterprise';
  dailyLoadsBooked: number;
  lastBookingDate: string;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, tier?: 'free' | 'pro' | 'enterprise') => Promise<boolean>;
  logout: () => void;
  canBookLoad: (loadValue: number) => boolean;
  bookLoad: (loadValue: number) => boolean;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  canBookLoad: () => false,
  bookLoad: () => false,
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login
    const mockUser: User = {
      id: uuidv4(),
      email,
      membershipTier: 'free',
      dailyLoadsBooked: 0,
      lastBookingDate: new Date().toDateString(),
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    toast({ title: 'Login successful', description: 'Welcome back!' });
    return true;
  };

  const register = async (email: string, password: string, tier: 'free' | 'pro' | 'enterprise' = 'free'): Promise<boolean> => {
    const newUser: User = {
      id: uuidv4(),
      email,
      membershipTier: tier,
      dailyLoadsBooked: 0,
      lastBookingDate: new Date().toDateString(),
    };
    setUser(newUser);
    setIsAuthenticated(true);
    toast({ title: 'Registration successful', description: 'Welcome to LoadBoard AI!' });
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast({ title: 'Logged out', description: 'See you next time!' });
  };

  const canBookLoad = (loadValue: number): boolean => {
    if (!user) return false;
    
    const today = new Date().toDateString();
    const resetDaily = user.lastBookingDate !== today;
    
    if (resetDaily) {
      user.dailyLoadsBooked = 0;
      user.lastBookingDate = today;
    }
    
    if (user.membershipTier === 'free') {
      return user.dailyLoadsBooked < 3 && loadValue <= 1000;
    }
    
    return true;
  };

  const bookLoad = (loadValue: number): boolean => {
    if (!user || !canBookLoad(loadValue)) return false;
    
    const today = new Date().toDateString();
    if (user.lastBookingDate !== today) {
      user.dailyLoadsBooked = 0;
      user.lastBookingDate = today;
    }
    
    user.dailyLoadsBooked += 1;
    setUser({ ...user });
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        canBookLoad,
        bookLoad,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};