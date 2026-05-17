import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DestinationFilters } from '../types/destination';
import type { TripRequest } from '../types/tripRequest';

type TravelStore = {
  favoriteDestinationIds: string[];
  filters: DestinationFilters;
  tripRequests: TripRequest[];
  addTripRequest: (request: TripRequest) => void;
  isFavorite: (id: string) => boolean;
  resetFilters: () => void;
  setFilters: (filters: Partial<DestinationFilters>) => void;
  toggleFavorite: (id: string) => void;
};

const initialFilters: DestinationFilters = {
  budgetLevel: undefined,
  query: '',
  region: '',
  travelStyle: undefined,
};

export const useTravelStore = create<TravelStore>()(
  persist(
    (set, get) => ({
      favoriteDestinationIds: [],
      filters: initialFilters,
      tripRequests: [],
      addTripRequest: (request) => {
        set((state) => ({
          tripRequests: [request, ...state.tripRequests],
        }));
      },
      isFavorite: (id) => get().favoriteDestinationIds.includes(id),
      resetFilters: () => {
        set({ filters: initialFilters });
      },
      setFilters: (filters) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        }));
      },
      toggleFavorite: (id) => {
        set((state) => {
          const isAlreadyFavorite = state.favoriteDestinationIds.includes(id);

          return {
            favoriteDestinationIds: isAlreadyFavorite
              ? state.favoriteDestinationIds.filter((favoriteId) => favoriteId !== id)
              : [...state.favoriteDestinationIds, id],
          };
        });
      },
    }),
    {
      name: 'tripwise-storage',
      partialize: (state) => ({
        favoriteDestinationIds: state.favoriteDestinationIds,
        tripRequests: state.tripRequests,
      }),
    },
  ),
);
