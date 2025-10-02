import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Search, Filter, MapPin, Phone, Mail } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  type: 'shipper' | 'carrier' | 'broker' | 'manufacturer' | 'export' | 'import';
  fmcsaId?: string;
  location: string;
  country: string;
  phone?: string;
  email?: string;
  verified: boolean;
  rating: number;
}

const CompanyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');
  
  // Mock data - in real app this would come from API
  const companies: Company[] = [
    {
      id: '1',
      name: 'Global Freight Solutions Inc.',
      type: 'carrier',
      fmcsaId: 'MC-123456',
      location: 'Chicago, IL',
      country: 'USA',
      phone: '+1-555-0123',
      email: 'contact@globalfreight.com',
      verified: true,
      rating: 4.8
    },
    {
      id: '2',
      name: 'International Logistics Corp',
      type: 'broker',
      fmcsaId: 'MC-789012',
      location: 'Toronto, ON',
      country: 'Canada',
      phone: '+1-416-555-0456',
      email: 'info@intllogistics.ca',
      verified: true,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Pacific Export Manufacturing',
      type: 'manufacturer',
      location: 'Los Angeles, CA',
      country: 'USA',
      phone: '+1-310-555-0789',
      email: 'sales@pacificexport.com',
      verified: true,
      rating: 4.9
    },
    {
      id: '4',
      name: 'European Import Specialists',
      type: 'import',
      location: 'Hamburg',
      country: 'Germany',
      phone: '+49-40-555-0123',
      email: 'contact@euroimport.de',
      verified: true,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Mexico Shipping Partners',
      type: 'shipper',
      location: 'Mexico City',
      country: 'Mexico',
      phone: '+52-55-555-0456',
      email: 'info@mexshipping.mx',
      verified: true,
      rating: 4.5
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.fmcsaId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || company.type === filterType;
    const matchesCountry = filterCountry === 'all' || company.country === filterCountry;
    
    return matchesSearch && matchesType && matchesCountry;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      carrier: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      broker: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      shipper: 'bg-green-500/20 text-green-400 border-green-500/30',
      manufacturer: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      export: 'bg-red-500/20 text-red-400 border-red-500/30',
      import: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const countries = [...new Set(companies.map(c => c.country))].sort();

  return (
    <Card className="bg-navy-900/50 border-lime-500/30">
      <CardHeader>
        <CardTitle className="text-lime-400 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          FMCSA Certified Company Directory
        </CardTitle>
        <p className="text-lime-400/70 text-sm">
          Complete database of verified shippers, carriers, brokers, manufacturers, and trade companies
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <Input
              placeholder="Search companies or FMCSA ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border-lime-500/30 text-lime-400"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-black/50 border-lime-500/30 text-lime-400">
              <SelectValue placeholder="Company Type" />
            </SelectTrigger>
            <SelectContent className="bg-navy-900 border-lime-500/30">
              <SelectItem value="all" className="text-lime-400">All Types</SelectItem>
              <SelectItem value="carrier" className="text-lime-400">Carriers</SelectItem>
              <SelectItem value="broker" className="text-lime-400">Brokers</SelectItem>
              <SelectItem value="shipper" className="text-lime-400">Shippers</SelectItem>
              <SelectItem value="manufacturer" className="text-lime-400">Manufacturers</SelectItem>
              <SelectItem value="export" className="text-lime-400">Export Companies</SelectItem>
              <SelectItem value="import" className="text-lime-400">Import Companies</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCountry} onValueChange={setFilterCountry}>
            <SelectTrigger className="bg-black/50 border-lime-500/30 text-lime-400">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent className="bg-navy-900 border-lime-500/30">
              <SelectItem value="all" className="text-lime-400">All Countries</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country} className="text-lime-400">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lime-400 font-semibold">
              Directory Results ({filteredCompanies.length})
            </h3>
            <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30">
              FMCSA Certified
            </Badge>
          </div>
          
          {filteredCompanies.map((company) => (
            <div key={company.id} className="p-4 bg-black/30 rounded border border-lime-500/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lime-400 font-semibold text-lg">{company.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTypeColor(company.type)}>
                      {company.type.toUpperCase()}
                    </Badge>
                    {company.verified && (
                      <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30">
                        VERIFIED
                      </Badge>
                    )}
                    <div className="text-lime-400/70 text-sm">
                      ★ {company.rating}/5.0
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-lime-400/70" />
                  <span className="text-lime-400">{company.location}, {company.country}</span>
                </div>
                {company.fmcsaId && (
                  <div>
                    <span className="text-lime-400/70">FMCSA ID:</span>
                    <span className="text-lime-400 ml-1">{company.fmcsaId}</span>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-lime-400/70" />
                    <span className="text-lime-400">{company.phone}</span>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-lime-400/70" />
                    <span className="text-lime-400">{company.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lime-400/70">No companies found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyDirectory;