# TripWise

TripWise is a frontend-focused travel destinations guide built with React. Users can browse curated destinations, view details, save favorite destinations, search and filter the catalog, submit trip planning requests, and review submitted requests.

## Tech stack

- React
- TypeScript
- Vite
- Material UI
- React Router
- Zustand
- Vite mock API middleware

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

On Windows PowerShell, if `npm` scripts are blocked by execution policy, use:

```bash
npm.cmd run dev
npm.cmd run build
```

## Routes

- `/` - Home page with featured destinations
- `/destinations` - Destination catalog with search and filters
- `/destinations/:id` - Destination details page
- `/saved` - Saved destinations page
- `/plan-trip` - Trip planning request form
- `/trip-requests` - Submitted trip requests overview
- `*` - Not found page

## Mock API

TripWise is a frontend-focused project and does not require a separate backend server. To demonstrate real HTTP request behavior, the app uses Vite middleware in `vite.config.ts` to provide local mock API endpoints during development and preview.

React components call service functions in `src/services`, and those services use `fetch()` against `/api/...` endpoints. The mock API returns local destination data from `src/data/destinations.ts` and creates trip request responses in memory.

Mock endpoints:

- `GET /api/destinations`
- `GET /api/destinations/:id`
- `GET /api/destinations/search?query=&region=&budgetLevel=&travelStyle=`
- `POST /api/trip-requests`

## State management

Global state is managed with Zustand in `src/store/travelStore.ts`.

The store manages:

- favorite destination IDs
- destination filters
- submitted trip requests

Zustand persist middleware stores favorites and submitted trip requests in `localStorage`, so they survive browser refreshes.

## Features

- Responsive Material UI layout and theme
- Router-based navigation
- Destination cards grid
- Destination details route
- Search and filter controls
- Saved destinations
- Trip planning form with validation
- Submitted trip requests overview
- Loading, empty, error, and success states
- Mock HTTP requests through Vite middleware

## Assignment checklist

- Router navigation: React Router routes in `src/app/AppRouter.tsx`
- State management: Zustand store in `src/store/travelStore.ts`
- UI library: Material UI components and theme
- Minimum 3 pages: Home, Destinations, Details, Saved, Plan Trip, Requests, Not Found
- Minimum 3 HTTP requests:
  - `GET /api/destinations`
  - `GET /api/destinations/:id`
  - `GET /api/destinations/search`
  - `POST /api/trip-requests`
- Data list visualization: destinations grid on `/destinations`
- Submit form: trip planning form on `/plan-trip`
