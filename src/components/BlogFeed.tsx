import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Truck } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  source: string;
}

const BlogFeed: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for top 100 trucking blogs from last 30 days
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'ELD Compliance Updates for 2024',
        excerpt: 'New regulations and best practices for electronic logging devices...',
        url: 'https://example.com/eld-compliance-2024',
        publishedAt: '2024-01-15',
        source: 'Transport Topics'
      },
      {
        id: '2',
        title: 'Freight Market Trends: Q1 2024',
        excerpt: 'Analysis of current freight rates and market conditions...',
        url: 'https://example.com/freight-trends-q1-2024',
        publishedAt: '2024-01-14',
        source: 'FreightWaves'
      },
      {
        id: '3',
        title: 'Driver Shortage Solutions',
        excerpt: 'Innovative approaches to addressing the driver shortage crisis...',
        url: 'https://example.com/driver-shortage-solutions',
        publishedAt: '2024-01-13',
        source: 'Trucking Info'
      }
    ];
    
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Industry Blog Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Top Transportation & Logistics Blogs
          <Badge variant="secondary">Last 30 Days</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span>{post.source}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(post.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogFeed;