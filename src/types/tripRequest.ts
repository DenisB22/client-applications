import type { BudgetLevel, TravelStyle } from './destination';

export type TripRequest = {
  id: string;
  fullName: string;
  email: string;
  preferredDestination: string;
  travelMonth: string;
  travelers: number;
  budget: BudgetLevel;
  travelStyle: TravelStyle;
  notes?: string;
  createdAt: string;
};

export type CreateTripRequestPayload = Omit<TripRequest, 'id' | 'createdAt'>;
