import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import { MembershipProvider } from '@/components/MembershipProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import PWAInstaller from '@/components/PWAInstaller';

const Index: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="loadboard-theme">
      <AppProvider>
        <MembershipProvider>
          <AppLayout />
          <PWAInstaller />
          <Toaster />
        </MembershipProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default Index;