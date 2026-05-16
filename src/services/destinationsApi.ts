import { destinations } from '../data/destinations';
import type { Destination, DestinationFilters } from '../types/destination';

const REQUEST_DELAY_MS = 450;

function wait(ms = REQUEST_DELAY_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function matchesSearchText(destination: Destination, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    destination.name,
    destination.country,
    destination.region,
    destination.description,
    destination.travelStyle,
    destination.budgetLevel,
    ...destination.highlights,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}

export async function getDestinations(): Promise<Destination[]> {
  await wait();

  return destinations;
}

export async function getDestinationById(id: string): Promise<Destination | undefined> {
  await wait();

  return destinations.find((destination) => destination.id === id);
}

export async function searchDestinations(filters: DestinationFilters): Promise<Destination[]> {
  await wait();

  return destinations.filter((destination) => {
    const matchesQuery = filters.query ? matchesSearchText(destination, filters.query) : true;
    const matchesRegion = filters.region ? destination.region === filters.region : true;
    const matchesBudget = filters.budgetLevel
      ? destination.budgetLevel === filters.budgetLevel
      : true;
    const matchesTravelStyle = filters.travelStyle
      ? destination.travelStyle === filters.travelStyle
      : true;

    return matchesQuery && matchesRegion && matchesBudget && matchesTravelStyle;
  });
}
