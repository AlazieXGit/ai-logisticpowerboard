import { supabase } from './supabase';

export interface LoadData {
  id: string;
  origin: string;
  destination: string;
  weight: number;
  equipmentType: string;
  rate: number;
  pickupDate: string;
  deliveryDate: string;
}

export interface CarrierData {
  id: string;
  name: string;
  rating: number;
  equipmentTypes: string[];
  coverage: string[];
  autoBookingEnabled: boolean;
  baseRate: number;
  aiScore?: number;
}

export interface DispatchResult {
  success: boolean;
  bookingId?: string;
  carrierId?: string;
  carrierName?: string;
  finalRate?: number;
  transactionId?: string;
  error?: string;
}

class DispatchService {
  private carriers: CarrierData[] = [
    {
      id: 'CAR001',
      name: 'Swift Transport Solutions',
      rating: 4.8,
      equipmentTypes: ['Dry Van', 'Refrigerated'],
      coverage: ['Midwest', 'Southeast'],
      autoBookingEnabled: true,
      baseRate: 1500
    },
    {
      id: 'CAR002',
      name: 'Prime Logistics Network',
      rating: 4.6,
      equipmentTypes: ['Flatbed', 'Step Deck'],
      coverage: ['West Coast', 'Southwest'],
      autoBookingEnabled: true,
      baseRate: 1800
    },
    {
      id: 'CAR003',
      name: 'Reliable Freight Co',
      rating: 4.4,
      equipmentTypes: ['Dry Van', 'Box Truck'],
      coverage: ['Northeast', 'Mid-Atlantic'],
      autoBookingEnabled: true,
      baseRate: 1600
    }
  ];

  // AI-powered carrier matching algorithm
  private matchCarriers(load: LoadData): CarrierData[] {
    return this.carriers
      .filter(carrier => {
        // Equipment type matching
        const hasEquipment = carrier.equipmentTypes.includes(load.equipmentType);
        
        // Coverage area matching (simplified)
        const hasCoverage = carrier.coverage.some(area => 
          load.origin.includes(area) || load.destination.includes(area)
        );
        
        return hasEquipment && hasCoverage && carrier.autoBookingEnabled;
      })
      .map(carrier => ({
        ...carrier,
        aiScore: this.calculateAIScore(carrier, load)
      }))
      .sort((a, b) => (b.aiScore ?? 0) - (a.aiScore ?? 0));
  }

  private calculateAIScore(carrier: CarrierData, load: LoadData): number {
    let score = 0;
    
    // Rating weight (0-50 points)
    score += carrier.rating * 10;
    
    // Equipment match bonus (0-20 points)
    if (carrier.equipmentTypes.includes(load.equipmentType)) {
      score += 20;
    }
    
    // Rate competitiveness (0-20 points)
    const rateScore = Math.max(0, 20 - Math.abs(carrier.baseRate - load.rate) / 100);
    score += rateScore;
    
    // Auto booking preference (0-10 points)
    if (carrier.autoBookingEnabled) {
      score += 10;
    }
    
    return Math.round(score);
  }

  // Automated dispatch function
  async autoDispatch(load: LoadData): Promise<DispatchResult> {
    try {
      // Find best matching carriers
      const matchedCarriers = this.matchCarriers(load);
      
      if (matchedCarriers.length === 0) {
        return {
          success: false,
          error: 'No suitable carriers found for this load'
        };
      }
      
      const bestCarrier = matchedCarriers[0];
      
      // Simulate booking process (90% success rate)
      const bookingSuccess = Math.random() > 0.1;
      
      if (!bookingSuccess) {
        return {
          success: false,
          error: 'Carrier booking failed - trying alternative carriers'
        };
      }
      
      // Calculate final rate with market adjustments
      const finalRate = this.calculateFinalRate(bestCarrier.baseRate, load.rate);
      
      // Generate booking and transaction IDs
      const bookingId = `BK${Date.now()}`;
      const transactionId = `TXN${Date.now()}`;
      
      // Process transaction
      const transactionResult = await this.processTransaction({
        transactionId,
        amount: finalRate,
        carrierId: bestCarrier.id,
        loadId: load.id
      });
      
      if (!transactionResult.success) {
        return {
          success: false,
          error: 'Transaction processing failed'
        };
      }
      
      return {
        success: true,
        bookingId,
        carrierId: bestCarrier.id,
        carrierName: bestCarrier.name,
        finalRate,
        transactionId
      };
      
    } catch (error) {
      console.error('Auto dispatch error:', error);
      return {
        success: false,
        error: 'Internal dispatch service error'
      };
    }
  }
  
  private calculateFinalRate(baseRate: number, requestedRate: number): number {
    // Simple rate negotiation algorithm
    const marketAdjustment = (Math.random() - 0.5) * 200; // ±$200 market adjustment
    const negotiatedRate = (baseRate + requestedRate) / 2 + marketAdjustment;
    return Math.round(Math.max(baseRate * 0.9, negotiatedRate));
  }
  
  private async processTransaction(transaction: {
    transactionId: string;
    amount: number;
    carrierId: string;
    loadId: string;
  }): Promise<{ success: boolean; error?: string }> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 95% success rate for transactions
    const success = Math.random() > 0.05;
    
    if (!success) {
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
    
    // In a real implementation, this would integrate with payment processors
    // and update the database with transaction records
    
    return { success: true };
  }
  
  // Get available carriers
  getCarriers(): CarrierData[] {
    return this.carriers;
  }
  
  // Add new carrier
  addCarrier(carrier: Omit<CarrierData, 'id'>): CarrierData {
    const newCarrier: CarrierData = {
      ...carrier,
      id: `CAR${String(this.carriers.length + 1).padStart(3, '0')}`
    };
    
    this.carriers.push(newCarrier);
    return newCarrier;
  }
  
  // Update carrier settings
  updateCarrier(carrierId: string, updates: Partial<CarrierData>): boolean {
    const index = this.carriers.findIndex(c => c.id === carrierId);
    if (index === -1) return false;
    
    this.carriers[index] = { ...this.carriers[index], ...updates };
    return true;
  }
}

// Export singleton instance
export const dispatchService = new DispatchService();
export default dispatchService;