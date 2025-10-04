import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { MembershipProvider } from "@/components/MembershipProvider";
import { EnhancedAuthProvider } from "@/components/EnhancedAuthContext";
import KeywordInterceptor from "@/components/KeywordInterceptor";
import GlobalSearchInterceptor from "@/components/GlobalSearchInterceptor";
import ServiceWorkerInterceptor from "@/components/ServiceWorkerInterceptor";
import BrowserExtensionBridge from "@/components/BrowserExtensionBridge";
import SEOMetaTags from "@/components/SEOMetaTags";
import EnhancedIndex from "./pages/EnhancedIndex";
import PaymentPage from "./pages/PaymentPage";
import OnboardingPage from "./pages/OnboardingPage";
import TrainingPage from "./pages/TrainingPage";
import DataDownloadPage from "./pages/DataDownloadPage";
import NotFound from "./pages/NotFound";
import BackOfficeControlCenter from "./components/BackOfficeControlCenter";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EnhancedAuthProvider>
          <MembershipProvider>
            <SEOMetaTags />
            <ServiceWorkerInterceptor />
            <BrowserExtensionBridge />
            <GlobalSearchInterceptor />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <KeywordInterceptor />
              <Routes>
                <Route path="/" element={<EnhancedIndex />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/downloads" element={<DataDownloadPage />} />
                <Route path="/backoffice" element={<BackOfficeControlCenter />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MembershipProvider>
        </EnhancedAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;