import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import DestinationDetailsPage from '../pages/DestinationDetailsPage';
import DestinationsPage from '../pages/DestinationsPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import PlanTripPage from '../pages/PlanTripPage';
import SavedDestinationsPage from '../pages/SavedDestinationsPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:id" element={<DestinationDetailsPage />} />
          <Route path="saved" element={<SavedDestinationsPage />} />
          <Route path="plan-trip" element={<PlanTripPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
