import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, CreditCard, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  loadId: string;
  carrierId: string;
  carrierName: string;
  amount: number;
  fee: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: string;
  paymentMethod: 'credit_card' | 'ach' | 'wire';
  type: 'booking' | 'completion' | 'cancellation';
}

const TransactionProcessor: React.FC = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalVolume: 0,
    totalFees: 0,
    successRate: 98.5,
    avgProcessingTime: 1.8
  });

  useEffect(() => {
    // Simulate real-time transactions
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        generateTransaction();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateTransaction = () => {
    const carriers = ['Swift Transport', 'Prime Logistics', 'Reliable Freight', 'Express Carriers'];
    const paymentMethods: Transaction['paymentMethod'][] = ['credit_card', 'ach', 'wire'];
    const types: Transaction['type'][] = ['booking', 'completion', 'cancellation'];
    
    const amount = Math.floor(Math.random() * 3000 + 1000);
    const fee = Math.floor(amount * 0.03);
    
    const newTransaction: Transaction = {
      id: `TXN${Date.now()}`,
      loadId: `LD${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      carrierId: `CAR${Math.floor(Math.random() * 999 + 1).toString().padStart(3, '0')}`,
      carrierName: carriers[Math.floor(Math.random() * carriers.length)],
      amount,
      fee,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString(),
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      type: types[Math.floor(Math.random() * types.length)]
    };

    setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    
    // Simulate processing
    setTimeout(() => {
      setTransactions(prev => prev.map(txn => 
        txn.id === newTransaction.id 
          ? { ...txn, status: 'processing' }
          : txn
      ));
      
      setTimeout(() => {
        const success = Math.random() > 0.05; // 95% success rate
        setTransactions(prev => prev.map(txn => 
          txn.id === newTransaction.id 
            ? { ...txn, status: success ? 'completed' : 'failed' }
            : txn
        ));
        
        if (success) {
          setStats(prev => ({
            ...prev,
            totalVolume: prev.totalVolume + amount,
            totalFees: prev.totalFees + fee
          }));
        }
      }, 1500);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <CreditCard className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="h-4 w-4" />;
      case 'ach': return <DollarSign className="h-4 w-4" />;
      case 'wire': return <TrendingUp className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-100 text-blue-800';
      case 'completion': return 'bg-green-100 text-green-800';
      case 'cancellation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const retryTransaction = (transactionId: string) => {
    setTransactions(prev => prev.map(txn => 
      txn.id === transactionId 
        ? { ...txn, status: 'processing' }
        : txn
    ));
    
    setTimeout(() => {
      setTransactions(prev => prev.map(txn => 
        txn.id === transactionId 
          ? { ...txn, status: 'completed' }
          : txn
      ));
      
      toast({
        title: 'Transaction Retry Successful',
        description: `Transaction ${transactionId} has been processed successfully`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transaction Processing</h2>
        <Badge className="bg-green-100 text-green-800">
          Real-time Processing
        </Badge>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Automated transaction processing is active. All bookings and completions are processed automatically.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold">${stats.totalVolume.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Fees Collected</p>
                <p className="text-2xl font-bold">${stats.totalFees.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{stats.successRate}%</p>
                  <Progress value={stats.successRate} className="w-12 h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Processing</p>
                <p className="text-2xl font-bold">{stats.avgProcessingTime}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Monitoring for new transactions...
              </p>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(transaction.status)}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </Badge>
                      <Badge className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                      <span className="font-semibold">{transaction.id}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Fee: ${transaction.fee}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Load: </span>
                      <span className="font-medium">{transaction.loadId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Carrier: </span>
                      <span className="font-medium">{transaction.carrierName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getPaymentMethodIcon(transaction.paymentMethod)}
                      <span className="font-medium">{transaction.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{transaction.timestamp}</span>
                    {transaction.status === 'failed' && (
                      <Button 
                        size="sm" 
                        onClick={() => retryTransaction(transaction.id)}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionProcessor;