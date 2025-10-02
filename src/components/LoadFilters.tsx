import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface LoadFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  equipmentFilter: string;
  setEquipmentFilter: (equipment: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  urgencyFilter: string;
  setUrgencyFilter: (urgency: string) => void;
  onRefresh: () => void;
}

const LoadFilters: React.FC<LoadFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  equipmentFilter,
  setEquipmentFilter,
  statusFilter,
  setStatusFilter,
  urgencyFilter,
  setUrgencyFilter,
  onRefresh
}) => {
  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by origin, destination, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
            <SelectTrigger className="w-40 bg-white/80">
              <SelectValue placeholder="Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Equipment</SelectItem>
              <SelectItem value="Dry Van">Dry Van</SelectItem>
              <SelectItem value="Flatbed">Flatbed</SelectItem>
              <SelectItem value="Refrigerated">Refrigerated</SelectItem>
              <SelectItem value="Step Deck">Step Deck</SelectItem>
              <SelectItem value="Tanker">Tanker</SelectItem>
              <SelectItem value="Box Truck">Box Truck</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-white/80">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="w-32 bg-white/80">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            onClick={onRefresh}
            variant="outline"
            size="icon"
            className="bg-white/80 hover:bg-white"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoadFilters;