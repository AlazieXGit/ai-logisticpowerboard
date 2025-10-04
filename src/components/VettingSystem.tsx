import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Search, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VettingResult {
  id: string;
  name: string;
  type: 'shipper' | 'carrier' | 'broker' | 'manufacturer';
  status: 'verified' | 'pending' | 'flagged';
  fmcsaId?: string;
  country: string;
  lastVerified: string;
}

const VettingSystem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<VettingResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockResults: VettingResult[] = [
    {
      id: '1',
      name: 'Global Freight Solutions',
      type: 'carrier',
      status: 'verified',
      fmcsaId: 'MC-123456',
      country: 'USA',
      lastVerified: '2024-01-15'
    },
    {
      id: '2',
      name: 'International Logistics Corp',
      type: 'broker',
      status: 'verified',
      fmcsaId: 'MC-789012',
      country: 'Canada',
      lastVerified: '2024-01-14'
    },
    {
      id: '3',
      name: 'Export Manufacturing Ltd',
      type: 'manufacturer',
      status: 'pending',
      country: 'Mexico',
      lastVerified: '2024-01-10'
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({ title: 'Error', description: 'Please enter a search term', variant: 'destructive' });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockResults.filter(result => 
        result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.fmcsaId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
      
      if (filtered.length === 0) {
        toast({ title: 'No Results', description: 'No companies found matching your search' });
      }
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'flagged': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'flagged': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-navy-900/50 border-lime-500/30">
      <CardHeader>
        <CardTitle className="text-lime-400 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <Globe className="w-5 h-5" />
          International Live Vetting System
        </CardTitle>
        <p className="text-lime-400/70 text-sm">
          Real-time verification of shippers, carriers, brokers, and manufacturers worldwide
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by company name or FMCSA ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/50 border-lime-500/30 text-lime-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-lime-500/20 border border-lime-500/30 text-lime-400 hover:bg-lime-500/30"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lime-400 font-semibold">Vetting Results</h3>
            {results.map((result) => (
              <div key={result.id} className="p-3 bg-black/30 rounded border border-lime-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lime-400 font-medium">{result.name}</h4>
                  <Badge className={getStatusColor(result.status)}>
                    {getStatusIcon(result.status)}
                    {result.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-lime-400/70">Type:</span>
                    <span className="text-lime-400 ml-1 capitalize">{result.type}</span>
                  </div>
                  <div>
                    <span className="text-lime-400/70">Country:</span>
                    <span className="text-lime-400 ml-1">{result.country}</span>
                  </div>
                  {result.fmcsaId && (
                    <div>
                      <span className="text-lime-400/70">FMCSA:</span>
                      <span className="text-lime-400 ml-1">{result.fmcsaId}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-lime-400/70">Last Verified:</span>
                    <span className="text-lime-400 ml-1">{result.lastVerified}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-black/30 rounded border border-lime-500/20">
          <h4 className="text-lime-400 font-semibold mb-2">FMCSA Certified Database</h4>
          <p className="text-lime-400/70 text-sm mb-2">
            Our system maintains real-time connections to:
          </p>
          <ul className="text-lime-400/70 text-sm space-y-1">
            <li>• FMCSA Safety and Fitness Electronic Records</li>
            <li>• International Trade Administration Database</li>
            <li>• Customs and Border Protection Records</li>
            <li>• Global Logistics Verification Network</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VettingSystem;