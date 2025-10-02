import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, TrendingUp, Users, AlertCircle } from 'lucide-react';
import PaymentSystem from './PaymentSystem';
import TransactionFeeCalculator from './TransactionFeeCalculator';
import { useAppContext } from '@/contexts/AppContext';

const PaymentManagement: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();
  const [selectedAmount, setSelectedAmount] = useState(5000);
  
  const mockTransactions = [
    { id: 1, type: 'payment', amount: 2500, recipient: 'ABC Transport', status: 'completed', date: '2024-01-15' },
    { id: 2, type: 'advance', amount: 1200, recipient: 'Self', status: 'pending', date: '2024-01-14' },
    { id: 3, type: 'payment', amount: 3800, recipient: 'XYZ Logistics', status: 'completed', date: '2024-01-13' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Payment Management System</h1>
        <p className="text-gray-600">Complete payment solution for logistics operations</p>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-2xl font-bold">$127,450</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">98.7%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$3,823</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system">Payment System</TabsTrigger>
          <TabsTrigger value="calculator">Fee Calculator</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="system" className="space-y-4">
          <PaymentSystem />
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Fee Calculator</CardTitle>
              <CardDescription>
                Calculate fees for different membership tiers and transaction types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Member Fees</h3>
                  <TransactionFeeCalculator 
                    baseAmount={selectedAmount} 
                    membershipTier="pro" 
                    isVisitor={false}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Visitor Fees</h3>
                  <TransactionFeeCalculator 
                    baseAmount={selectedAmount} 
                    membershipTier="visitor" 
                    isVisitor={true}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant={selectedAmount === 1000 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAmount(1000)}
                >
                  $1,000
                </Button>
                <Button 
                  variant={selectedAmount === 5000 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAmount(5000)}
                >
                  $5,000
                </Button>
                <Button 
                  variant={selectedAmount === 10000 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAmount(10000)}
                >
                  $10,000
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                View and manage your payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isAuthenticated ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Please log in to view transaction history</p>
                  <Button>Sign In</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.recipient}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${transaction.amount.toLocaleString()}</p>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentManagement;