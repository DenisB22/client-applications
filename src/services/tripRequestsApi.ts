import type { CreateTripRequestPayload, TripRequest } from '../types/tripRequest';

const REQUEST_DELAY_MS = 550;

function wait(ms = REQUEST_DELAY_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function submitTripRequest(
  payload: CreateTripRequestPayload,
): Promise<TripRequest> {
  await wait();

  return {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}
