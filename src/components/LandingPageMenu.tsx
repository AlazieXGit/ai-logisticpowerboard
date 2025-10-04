import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Truck, Users, BookOpen, CreditCard, Building, BarChart3, Settings, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LandingPageMenuProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const LandingPageMenu: React.FC<LandingPageMenuProps> = ({ onNavigate, currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'loadboard', label: 'Load Board', icon: Truck, description: 'Find and post loads' },
    { id: 'dispatch', label: 'Dispatch Center', icon: Users, description: 'Manage dispatching' },
    { id: 'volume', label: 'Volume Tracker', icon: BarChart3, description: 'Real-time analytics' },
    { id: 'onboarding', label: 'Company Registration', icon: Building, description: 'Register your company' },
    { id: 'pricing', label: 'Pricing Plans', icon: CreditCard, description: 'View subscription options' },
    { id: 'training', label: 'Training Center', icon: BookOpen, description: 'Learn the platform' },
    { id: 'directory', label: 'Company Directory', icon: Building, description: 'Browse companies' },
    { id: 'adminlink', label: 'Admin Portal', icon: Settings, description: 'Administrative access' }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-blue-900/95 border-lime-500/30 w-80">
        <SheetHeader>
          <SheetTitle className="text-lime-400 flex items-center gap-2">
            <Home className="h-5 w-5" />
            LOADBOARD AI + TMS
            <Badge variant="outline" className="border-lime-400 text-lime-400">
              Menu
            </Badge>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30' 
                    : 'text-lime-300 hover:bg-lime-500/10 hover:text-lime-400'
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-lime-500/30 pt-4">
            <div className="text-lime-400 font-medium mb-2">Contact Support</div>
            <div className="space-y-1 text-sm text-lime-300">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>support@loadboard-ai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>1-800-LOADBOARD</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LandingPageMenu;