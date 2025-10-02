// Supabase client configuration
// This file will be auto-generated when Supabase is properly configured
// For now, using mock data and local state management

export const supabase = {
  functions: {
    invoke: async (functionName: string, options: any) => {
      // Mock implementation for development
      console.log(`Mock Supabase function call: ${functionName}`, options);
      return { data: null, error: null };
    }
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({ data: [], error: null })
    }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null })
  })
};

// Export types for TypeScript
export type Database = {
  public: {
    Tables: {
      loads: {
        Row: {
          id: string;
          origin: string;
          destination: string;
          weight: string;
          rate: string;
          distance: string;
          pickup_date: string;
          equipment: string;
          status: string;
          company: string;
          urgency: string;
          commodity: string;
          created_at: string;
        };
      };
    };
  };
};