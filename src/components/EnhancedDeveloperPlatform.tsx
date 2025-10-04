import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUp, Brain } from 'lucide-react';
import { getApiUrl } from '@/lib/api-config';

const EnhancedDeveloperPlatform = () => {
  const [upgradeRequests, setUpgradeRequests] = useState([]);
  const [aiIntegrations, setAiIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [upgradesRes, aiRes] = await Promise.all([
          axios.get(getApiUrl('api/upgrade-requests')),
          axios.get(getApiUrl('api/ai-integrations'))
        ]);
        setUpgradeRequests(upgradesRes.data);
        setAiIntegrations(aiRes.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/30 border-cyan-500 rounded-lg p-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xl font-bold mb-4">
          <ArrowUp className="h-5 w-5" /> Platform Upgrade Requests
        </div>
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {upgradeRequests.map((request: any) => (
              <div key={request.id} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{request.title}</div>
                    <div className="text-gray-400 text-sm">{request.description}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-cyan-300">{request.status}</span>
                    <span className="text-xs text-yellow-300">{request.priority}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">Estimated Cost: {request.estimatedCost}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-800/30 border-purple-500 rounded-lg p-6">
        <div className="flex items-center gap-2 text-purple-400 text-xl font-bold mb-4">
          <Brain className="h-5 w-5" /> Active AI Integrations
        </div>
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid gap-4">
            {aiIntegrations.map((ai: any, index: number) => (
              <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold">{ai.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-green-600 text-white">{ai.status}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  Usage: <span className="ml-2 text-blue-400">{ai.usage}</span>
                  <span className="ml-4">Performance: <span className="text-blue-400 ml-2">{ai.performance}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDeveloperPlatform;
