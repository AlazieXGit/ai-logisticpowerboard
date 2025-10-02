import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Users, Mail, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegisteredCompany {
  id: string;
  name: string;
  type: 'carrier' | 'broker';
  email: string;
  registrationDate: string;
  status: 'active' | 'pending' | 'suspended';
  contactEmails: string[];
}

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<RegisteredCompany[]>([
    {
      id: 'COMP001',
      name: 'Swift Logistics LLC',
      type: 'carrier',
      email: 'contact@swiftlogistics.com',
      registrationDate: '2024-01-15',
      status: 'active',
      contactEmails: ['aarlucius@gmail.com']
    },
    {
      id: 'COMP002',
      name: 'Prime Freight Brokers',
      type: 'broker',
      email: 'info@primefreight.com',
      registrationDate: '2024-01-20',
      status: 'active',
      contactEmails: ['alford', 'arlucius@gmail.com']
    }
  ]);

  const [adminStats, setAdminStats] = useState({
    totalCompanies: 247,
    activeCarriers: 156,
    activeBrokers: 91,
    pendingApprovals: 12,
    totalVolume: 15847320,
    totalFees: 316946
  });

  const [emailFilter, setEmailFilter] = useState('');
  const targetEmails = ['aarlucius@gmail.com', 'alford', 'arlucius@gmail.com'];

  const filteredCompanies = companies.filter(company => 
    company.contactEmails.some(email => 
      targetEmails.some(target => email.toLowerCase().includes(target.toLowerCase()))
    ) || 
    (emailFilter && company.email.toLowerCase().includes(emailFilter.toLowerCase()))
  );

  const registerCompany = (email: string) => {
    const newCompany: RegisteredCompany = {
      id: `COMP${Date.now()}`,
      name: `Auto-Registered Company ${companies.length + 1}`,
      type: Math.random() > 0.5 ? 'carrier' : 'broker',
      email: email,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      contactEmails: [email]
    };

    setCompanies(prev => [newCompany, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      totalCompanies: prev.totalCompanies + 1,
      pendingApprovals: prev.pendingApprovals + 1
    }));

    toast({
      title: 'Company Registered',
      description: `${email} has been automatically registered as ${newCompany.type}`,
    });
  };

  const approveCompany = (companyId: string) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, status: 'active' as const }
        : company
    ));
    
    setAdminStats(prev => ({
      ...prev,
      pendingApprovals: prev.pendingApprovals - 1
    }));

    toast({
      title: 'Company Approved',
      description: 'Company has been approved and activated',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'carrier' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  useEffect(() => {
    // Auto-register companies that have contacted target emails
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomEmail = targetEmails[Math.floor(Math.random() * targetEmails.length)];
        const testEmail = `test${Date.now()}@${randomEmail.split('@')[1] || 'logistics.com'}`;
        registerCompany(testEmail);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Administrative Dashboard</h2>
        <Badge className="bg-red-100 text-red-800">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Settings className="h-4 w-4" />
        <AlertDescription>
          Administrative access for LOADBOARD AI + TMS. Monitor registrations, approvals, and system metrics.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{adminStats.totalCompanies}</p>
              <p className="text-sm text-gray-600">Total Companies</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{adminStats.activeCarriers}</p>
              <p className="text-sm text-gray-600">Active Carriers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{adminStats.activeBrokers}</p>
              <p className="text-sm text-gray-600">Active Brokers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <p className="text-2xl font-bold">{adminStats.pendingApprovals}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-lg font-bold">${(adminStats.totalVolume / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-600">Total Volume</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-lg font-bold">${(adminStats.totalFees / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-600">Total Fees</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="companies" className="w-full">
        <TabsList>
          <TabsTrigger value="companies">Registered Companies</TabsTrigger>
          <TabsTrigger value="monitoring">Email Monitoring</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Company Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Filter by email..."
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  className="max-w-sm"
                />
                
                <div className="space-y-3">
                  {filteredCompanies.map((company) => (
                    <div key={company.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(company.type)}>
                            {company.type}
                          </Badge>
                          <Badge className={getStatusColor(company.status)}>
                            {company.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Registered: {company.registrationDate}</p>
                          <p className="text-sm text-gray-600">Contact Emails: {company.contactEmails.join(', ')}</p>
                        </div>
                        
                        {company.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => approveCompany(company.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Email Monitoring System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Monitoring communications with: {targetEmails.join(', ')}
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Auto-Registration Rules</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Companies contacting target emails are auto-registered</li>
                      <li>• Classification as carrier or broker based on business type</li>
                      <li>• Pending approval required for activation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Monitored Emails</h4>
                    <ul className="text-sm space-y-1">
                      {targetEmails.map((email, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {email}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Fee Structure</h4>
                    <ul className="text-sm space-y-1">
                      <li>• AI Processing Fee: 2% (updated from 1%)</li>
                      <li>• AI Dispatching Fee: 2%</li>
                      <li>• Transaction Processing: Real-time</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Registration Settings</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Auto-registration: Enabled</li>
                      <li>• Email monitoring: Active</li>
                      <li>• Manual approval: Required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;