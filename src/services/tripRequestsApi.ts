import type { CreateTripRequestPayload, TripRequest } from '../types/tripRequest';

const TRIP_REQUESTS_ENDPOINT = '/api/trip-requests';

export async function submitTripRequest(
  payload: CreateTripRequestPayload,
): Promise<TripRequest> {
  const response = await fetch(TRIP_REQUESTS_ENDPOINT, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Trip request failed with status ${response.status}`);
  }

  return response.json() as Promise<TripRequest>;
}
