import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import OnboardingPage from '@/pages/OnboardingPage';
import NotFound from '@/pages/NotFound';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);