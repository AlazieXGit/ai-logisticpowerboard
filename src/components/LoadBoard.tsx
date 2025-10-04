import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Filter, Search, Users, CreditCard, Heart } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import LoadCard from './LoadCard';
import LoadFilters from './LoadFilters';
import PaymentSystem from './PaymentSystem';
import AiTipsDonations from './AiTipsDonations';
import { useLoadData } from '@/hooks/useLoadData';

const LoadBoard: React.FC = () => {
  const { isAuthenticated } = useAppContext();
  const { loads, isLoading, refreshLoads } = useLoadData();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      {!isAuthenticated && (
        <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-lime-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Users className="h-8 w-8 text-lime-400 mx-auto" />
              <h3 className="text-lg font-semibold text-lime-400">Welcome, Visitor!</h3>
              <p className="text-sm text-lime-300">
                Browse all live loads and explore our features. Sign in or register to book loads with better rates.
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <Button size="sm" className="bg-gradient-to-r from-lime-600 to-black hover:from-lime-700 hover:to-gray-900 text-white">Sign In</Button>
                <Button size="sm" variant="outline" className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20">Register Free</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="loads" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-900/50 border-lime-500/30">
          <TabsTrigger value="loads" className="flex items-center gap-2 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
            <Search className="h-4 w-4" />
            Live Loads
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2 text-lime-400 data-[state=active]:bg-lime-500/20 data-[state=active]:text-lime-300">
            <Heart className="h-4 w-4" />
            Support AI
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="loads" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-lime-400 futuristic-glow">Live Load Board</h2>
              <Badge variant="outline" className="animate-pulse border-lime-400 text-lime-400">
                <span className="text-number">{loads.length}</span> Active Loads
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshLoads}
                disabled={isLoading}
                className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <Card className="bg-blue-900/50 border-lime-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-lime-400">Filter Loads</CardTitle>
                <CardDescription className="text-lime-300">
                  Narrow down loads based on your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoadFilters />
              </CardContent>
            </Card>
          )}
          
          <div className="grid gap-4">
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-lime-400" />
                <p className="text-lime-300">Loading fresh loads...</p>
              </div>
            ) : loads.length === 0 ? (
              <Card className="bg-blue-900/50 border-lime-500/30">
                <CardContent className="pt-6 text-center">
                  <p className="text-lime-300">No loads available at the moment.</p>
                  <Button onClick={refreshLoads} className="mt-4 bg-gradient-to-r from-lime-600 to-black hover:from-lime-700 hover:to-gray-900 text-white">
                    Refresh Loads
                  </Button>
                </CardContent>
              </Card>
            ) : (
              loads.map((load) => (
                <LoadCard key={load.id} {...load} />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentSystem />
        </TabsContent>
        
        <TabsContent value="tips">
          <AiTipsDonations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoadBoard;