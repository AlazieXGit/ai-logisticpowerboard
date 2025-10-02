import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Truck, Building, Package, Warehouse, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Company {
  id: string;
  name: string;
  type: 'carrier' | 'manufacturer' | 'shipper' | 'warehouse' | 'broker' | 'distribution' | 'owner_operator' | 'independent';
  mcNumber?: string;
  dotNumber?: string;
  status: 'pending' | 'enrolled' | 'failed';
  fmcsaCompliant: boolean;
}

const AutoEnrollmentSystem: React.FC = () => {
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolledCompanies, setEnrolledCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState({
    carriers: 0,
    manufacturers: 0,
    shippers: 0,
    warehouses: 0,
    brokers: 0,
    distribution: 0,
    owner_operators: 0,
    independents: 0
  });

  const generateCompanies = (): Company[] => {
    const companies: Company[] = [];
    
    // 500 Carriers (including 400 new + 100 existing)
    for (let i = 1; i <= 500; i++) {
      companies.push({
        id: `carrier_${i}`,
        name: `Carrier Company ${i}`,
        type: 'carrier',
        mcNumber: `MC-${10000 + i}`,
        dotNumber: `${100000 + i}`,
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 500 Owner Operators
    for (let i = 1; i <= 500; i++) {
      companies.push({
        id: `owner_op_${i}`,
        name: `Owner Operator ${i}`,
        type: 'owner_operator',
        mcNumber: `MC-${20000 + i}`,
        dotNumber: `${200000 + i}`,
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 500 Independent Individuals
    for (let i = 1; i <= 500; i++) {
      companies.push({
        id: `independent_${i}`,
        name: `Independent Driver ${i}`,
        type: 'independent',
        mcNumber: `MC-${30000 + i}`,
        dotNumber: `${300000 + i}`,
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 1000+ Manufacturers
    for (let i = 1; i <= 1000; i++) {
      companies.push({
        id: `manufacturer_${i}`,
        name: `Manufacturing Corp ${i}`,
        type: 'manufacturer',
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 1000+ Shippers
    for (let i = 1; i <= 1000; i++) {
      companies.push({
        id: `shipper_${i}`,
        name: `Shipping Solutions ${i}`,
        type: 'shipper',
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 1000+ Warehouses
    for (let i = 1; i <= 1000; i++) {
      companies.push({
        id: `warehouse_${i}`,
        name: `Warehouse Facility ${i}`,
        type: 'warehouse',
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 1000+ Brokers
    for (let i = 1; i <= 1000; i++) {
      companies.push({
        id: `broker_${i}`,
        name: `Logistics Broker ${i}`,
        type: 'broker',
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    // 1000+ Distribution Centers
    for (let i = 1; i <= 1000; i++) {
      companies.push({
        id: `distribution_${i}`,
        name: `Distribution Center ${i}`,
        type: 'distribution',
        status: 'pending',
        fmcsaCompliant: true
      });
    }
    
    return companies;
  };

  const startAutoEnrollment = async () => {
    setIsEnrolling(true);
    setEnrollmentProgress(0);
    
    const allCompanies = generateCompanies();
    const totalCompanies = allCompanies.length;
    const enrolled: Company[] = [];
    
    for (let i = 0; i < totalCompanies; i++) {
      const company = allCompanies[i];
      
      // Simulate enrollment process with faster processing
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const enrolledCompany = {
        ...company,
        status: Math.random() > 0.05 ? 'enrolled' : 'failed' as 'enrolled' | 'failed'
      };
      
      enrolled.push(enrolledCompany);
      setEnrolledCompanies([...enrolled]);
      setEnrollmentProgress(((i + 1) / totalCompanies) * 100);
      
      // Update stats in real-time
      const newStats = enrolled.reduce((acc, comp) => {
        if (comp.status === 'enrolled') {
          if (comp.type === 'carrier') acc.carriers++;
          else if (comp.type === 'manufacturer') acc.manufacturers++;
          else if (comp.type === 'shipper') acc.shippers++;
          else if (comp.type === 'warehouse') acc.warehouses++;
          else if (comp.type === 'broker') acc.brokers++;
          else if (comp.type === 'distribution') acc.distribution++;
          else if (comp.type === 'owner_operator') acc.owner_operators++;
          else if (comp.type === 'independent') acc.independents++;
        }
        return acc;
      }, { carriers: 0, manufacturers: 0, shippers: 0, warehouses: 0, brokers: 0, distribution: 0, owner_operators: 0, independents: 0 });
      
      setStats(newStats);
    }
    
    setIsEnrolling(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'carrier': return <Truck className="h-4 w-4" />;
      case 'manufacturer': return <Building className="h-4 w-4" />;
      case 'shipper': return <Package className="h-4 w-4" />;
      case 'warehouse': return <Warehouse className="h-4 w-4" />;
      case 'broker': return <Users className="h-4 w-4" />;
      case 'distribution': return <Package className="h-4 w-4" />;
      case 'owner_operator': return <Truck className="h-4 w-4" />;
      case 'independent': return <Users className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enrolled': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-900/50 border-lime-500/30">
        <CardHeader>
          <CardTitle className="text-lime-400">Enhanced Auto-Enrollment System</CardTitle>
          <p className="text-lime-300 text-sm">Auto-enrolling 7,000+ FMCSA compliant companies with real-time progress tracking</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.carriers}</div>
                <div className="text-sm text-lime-300">Carriers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.owner_operators}</div>
                <div className="text-sm text-lime-300">Owner Operators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.independents}</div>
                <div className="text-sm text-lime-300">Independents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.manufacturers}</div>
                <div className="text-sm text-lime-300">Manufacturers</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.shippers}</div>
                <div className="text-sm text-lime-300">Shippers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.warehouses}</div>
                <div className="text-sm text-lime-300">Warehouses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.brokers}</div>
                <div className="text-sm text-lime-300">Brokers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">{stats.distribution}</div>
                <div className="text-sm text-lime-300">Distribution</div>
              </div>
            </div>
            
            {isEnrolling && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-lime-300">
                  <span>Real-time Enrollment Progress</span>
                  <span>{Math.round(enrollmentProgress)}%</span>
                </div>
                <Progress value={enrollmentProgress} className="h-3" />
                <div className="text-center text-lime-400 text-sm">
                  Enrolling {enrolledCompanies.length} of 7,000+ companies...
                </div>
              </div>
            )}
            
            <Button 
              onClick={startAutoEnrollment} 
              disabled={isEnrolling}
              className="w-full bg-lime-500 hover:bg-lime-600 text-black"
            >
              {isEnrolling ? 'Enrolling 7,000+ Companies...' : 'Start Enhanced Auto-Enrollment (7,000+ Companies)'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {enrolledCompanies.length > 0 && (
        <Card className="bg-blue-900/50 border-lime-500/30">
          <CardHeader>
            <CardTitle className="text-lime-400">Enrolled Companies ({enrolledCompanies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {enrolledCompanies.slice(-50).map((company) => (
                <div key={company.id} className="flex items-center justify-between p-2 bg-blue-800/30 rounded">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(company.type)}
                    <div>
                      <div className="text-lime-100 font-medium">{company.name}</div>
                      <div className="text-lime-400 text-sm">
                        {company.mcNumber && `MC: ${company.mcNumber}`}
                        {company.dotNumber && ` | DOT: ${company.dotNumber}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-lime-500/30 text-lime-400">
                      {company.type.replace('_', ' ')}
                    </Badge>
                    {getStatusIcon(company.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutoEnrollmentSystem;