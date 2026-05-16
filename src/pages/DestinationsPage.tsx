import { Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';
import { getDestinations } from '../services/destinationsApi';
import type { Destination } from '../types/destination';

function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDestinations = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const destinationResults = await getDestinations();
      setDestinations(destinationResults);
    } catch {
      setErrorMessage('We could not load the destination catalog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDestinations();
  }, [loadDestinations]);

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Destinations"
        title="Explore curated destinations"
        description="Browse TripWise destination ideas with ratings, travel styles, budget levels, best seasons, and quick links into each details page."
      />

      {isLoading ? <LoadingState message="Loading destinations..." /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState message={errorMessage} onRetry={loadDestinations} />
      ) : null}

      {!isLoading && !errorMessage && destinations.length === 0 ? (
        <EmptyState
          title="No destinations found"
          message="The destination catalog is empty right now. Check back again soon."
        />
      ) : null}

      {!isLoading && !errorMessage && destinations.length > 0 ? (
        <Grid container spacing={3}>
          {destinations.map((destination) => (
            <Grid item xs={12} sm={6} lg={4} key={destination.id}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </PageContainer>
  );
}

export default DestinationsPage;
