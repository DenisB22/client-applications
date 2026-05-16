export type BudgetLevel = 'Budget' | 'Moderate' | 'Premium';

export type TravelStyle = 'Adventure' | 'Culture' | 'Relaxation' | 'Nature' | 'Food';

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  imageUrl: string;
  rating: number;
  budgetLevel: BudgetLevel;
  travelStyle: TravelStyle;
  bestSeason: string;
  averageDays: number;
  highlights: string[];
  tips: string[];
};

export type DestinationFilters = {
  query?: string;
  region?: string;
  budgetLevel?: BudgetLevel;
  travelStyle?: TravelStyle;
};
