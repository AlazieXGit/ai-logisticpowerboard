import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ExpandableSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const ExpandableSearchBar: React.FC<ExpandableSearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search loads, companies, routes..." 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setSearchQuery('');
      onSearch('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex items-center">
      {!isExpanded ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggle}
          className="border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="pl-10 pr-10 w-64 bg-blue-900/50 border-lime-500/30 text-lime-100 placeholder-lime-400/60"
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-lime-400 hover:bg-lime-500/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExpandableSearchBar;