import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { destinations } from './src/data/destinations';
import type { CreateTripRequestPayload } from './src/types/tripRequest';

const REQUEST_DELAY_MS = 450;

type MockRequest = {
  method?: string;
  url?: string;
  on: (event: string, callback: (chunk?: { toString: () => string }) => void) => void;
};

type MockResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

function wait(ms = REQUEST_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function sendJson(response: MockResponse, statusCode: number, data: unknown) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(data));
}

function matchesSearchText(destination: (typeof destinations)[number], query: string) {
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

function readRequestBody(request: MockRequest) {
  return new Promise<string>((resolve, reject) => {
    const chunks: string[] = [];

    request.on('data', (chunk) => {
      if (chunk) {
        chunks.push(chunk.toString());
      }
    });

    request.on('end', () => {
      resolve(chunks.join(''));
    });

    request.on('error', () => {
      reject(new Error('Could not read request body.'));
    });
  });
}

function createTripRequest(payload: CreateTripRequestPayload) {
  return {
    ...payload,
    id: `trip-request-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
}

function mockApiPlugin(): Plugin {
  return {
    name: 'tripwise-mock-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (request, response, next) => {
        if (!request.url?.startsWith('/api/')) {
          next();
          return;
        }

        await handleApiRequest(request, response, next);
      });
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(async (request, response, next) => {
        if (!request.url?.startsWith('/api/')) {
          next();
          return;
        }

        await handleApiRequest(request, response, next);
      });
    },
  };
}

async function handleApiRequest(request: MockRequest, response: MockResponse, next: () => void) {
  const requestUrl = new URL(request.url ?? '/', 'http://localhost');
  const pathname = requestUrl.pathname;

  await wait();

  if (request.method === 'GET' && pathname === '/api/destinations') {
    sendJson(response, 200, destinations);
    return;
  }

  if (request.method === 'GET' && pathname === '/api/destinations/search') {
    const query = requestUrl.searchParams.get('query') ?? '';
    const region = requestUrl.searchParams.get('region') ?? '';
    const budgetLevel = requestUrl.searchParams.get('budgetLevel') ?? '';
    const travelStyle = requestUrl.searchParams.get('travelStyle') ?? '';

    const filteredDestinations = destinations.filter((destination) => {
      const matchesQuery = matchesSearchText(destination, query);
      const matchesRegion = region ? destination.region === region : true;
      const matchesBudget = budgetLevel ? destination.budgetLevel === budgetLevel : true;
      const matchesTravelStyle = travelStyle ? destination.travelStyle === travelStyle : true;

      return matchesQuery && matchesRegion && matchesBudget && matchesTravelStyle;
    });

    sendJson(response, 200, filteredDestinations);
    return;
  }

  if (request.method === 'GET' && pathname.startsWith('/api/destinations/')) {
    const id = decodeURIComponent(pathname.replace('/api/destinations/', ''));
    const destination = destinations.find((item) => item.id === id);

    if (!destination) {
      sendJson(response, 404, { message: 'Destination not found.' });
      return;
    }

    sendJson(response, 200, destination);
    return;
  }

  if (request.method === 'POST' && pathname === '/api/trip-requests') {
    try {
      const body = await readRequestBody(request);
      const payload = JSON.parse(body) as CreateTripRequestPayload;

      sendJson(response, 201, createTripRequest(payload));
    } catch {
      sendJson(response, 400, { message: 'Invalid trip request payload.' });
    }

    return;
  }

  next();
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
});
