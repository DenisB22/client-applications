import type { Destination, DestinationFilters } from '../types/destination';

const DESTINATIONS_ENDPOINT = '/api/destinations';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getDestinations(): Promise<Destination[]> {
  return fetchJson<Destination[]>(DESTINATIONS_ENDPOINT);
}

export async function getDestinationById(id: string): Promise<Destination | undefined> {
  try {
    return await fetchJson<Destination>(`${DESTINATIONS_ENDPOINT}/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('status 404')) {
      return undefined;
    }

    throw error;
  }
}

export async function searchDestinations(filters: DestinationFilters): Promise<Destination[]> {
  const searchParams = new URLSearchParams();

  if (filters.query) {
    searchParams.set('query', filters.query);
  }

  if (filters.region) {
    searchParams.set('region', filters.region);
  }

  if (filters.budgetLevel) {
    searchParams.set('budgetLevel', filters.budgetLevel);
  }

  if (filters.travelStyle) {
    searchParams.set('travelStyle', filters.travelStyle);
  }

  return fetchJson<Destination[]>(`${DESTINATIONS_ENDPOINT}/search?${searchParams.toString()}`);
}
