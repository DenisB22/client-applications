import { Button, Grid } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';
import { getDestinations } from '../services/destinationsApi';
import { useTravelStore } from '../store/travelStore';
import type { Destination } from '../types/destination';

function SavedDestinationsPage() {
  const favoriteDestinationIds = useTravelStore((state) => state.favoriteDestinationIds);
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
      setErrorMessage('We could not load your saved destinations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDestinations();
  }, [loadDestinations]);

  const savedDestinations = useMemo(
    () => destinations.filter((destination) => favoriteDestinationIds.includes(destination.id)),
    [destinations, favoriteDestinationIds],
  );

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Saved"
        title="Your saved destinations"
        description="Keep track of places you want to compare, revisit, or use later when planning a trip."
        action={
          <Button component={RouterLink} to="/destinations" variant="outlined">
            Explore more
          </Button>
        }
      />

      {isLoading ? <LoadingState message="Loading saved destinations..." /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState message={errorMessage} onRetry={loadDestinations} />
      ) : null}

      {!isLoading && !errorMessage && savedDestinations.length === 0 ? (
        <EmptyState
          title="No saved destinations yet"
          message="Save destinations from the catalog and they will appear here, even after you refresh the page."
          action={
            <Button component={RouterLink} to="/destinations" variant="contained">
              Browse destinations
            </Button>
          }
        />
      ) : null}

      {!isLoading && !errorMessage && savedDestinations.length > 0 ? (
        <Grid container spacing={3}>
          {savedDestinations.map((destination) => (
            <Grid item xs={12} sm={6} lg={4} key={destination.id}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </PageContainer>
  );
}

export default SavedDestinationsPage;
