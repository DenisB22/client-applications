import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import { getDestinationById } from '../services/destinationsApi';
import type { Destination } from '../types/destination';

function DestinationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDestination = useCallback(async () => {
    if (!id) {
      setDestination(undefined);
      setErrorMessage(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await getDestinationById(id);
      setDestination(result);
    } catch {
      setErrorMessage('We could not load this destination. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadDestination();
  }, [loadDestination]);

  if (isLoading) {
    return <LoadingState message="Loading destination details..." />;
  }

  if (errorMessage) {
    return (
      <PageContainer>
        <ErrorState message={errorMessage} onRetry={loadDestination} />
      </PageContainer>
    );
  }

  if (!destination) {
    return (
      <PageContainer>
        <EmptyState
          title="Destination not found"
          message="We could not find a destination for this route. Return to the catalog and choose another place to explore."
          action={
            <Button component={RouterLink} to="/destinations" variant="contained">
              Back to destinations
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Button component={RouterLink} to="/destinations" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
        Back to destinations
      </Button>

      <Card sx={{ overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="420"
          image={destination.imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: { xs: 3, md: 5 }, '&:last-child': { pb: { xs: 3, md: 5 } } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label={destination.region} color="primary" variant="outlined" />
                    <Chip label={destination.budgetLevel} color="secondary" variant="outlined" />
                    <Chip label={destination.travelStyle} variant="outlined" />
                  </Stack>

                  <Box>
                    <Typography component="h1" variant="h3">
                      {destination.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {destination.country}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={destination.rating} precision={0.1} readOnly />
                  <Typography color="text.secondary">{destination.rating.toFixed(1)} traveler rating</Typography>
                </Stack>

                <Typography variant="body1" color="text.secondary" fontSize="1.08rem">
                  {destination.description}
                </Typography>

                <Box>
                  <Typography component="h2" variant="h5" gutterBottom>
                    Highlights
                  </Typography>
                  <Grid container spacing={1.5}>
                    {destination.highlights.map((highlight) => (
                      <Grid item xs={12} sm={6} key={highlight}>
                        <Box
                          sx={{
                            bgcolor: 'rgba(15, 118, 110, 0.08)',
                            borderRadius: 2,
                            p: 2,
                          }}
                        >
                          <Typography>{highlight}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card variant="outlined" sx={{ boxShadow: 'none' }}>
                  <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                    <Stack spacing={2}>
                      <Typography component="h2" variant="h5">
                        Trip snapshot
                      </Typography>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Best season
                        </Typography>
                        <Typography fontWeight={700}>{destination.bestSeason}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Suggested stay
                        </Typography>
                        <Typography fontWeight={700}>{destination.averageDays} days</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Budget level
                        </Typography>
                        <Typography fontWeight={700}>{destination.budgetLevel}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ boxShadow: 'none' }}>
                  <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                    <Stack spacing={2}>
                      <Typography component="h2" variant="h5">
                        Travel tips
                      </Typography>
                      <Stack component="ul" spacing={1.5} sx={{ m: 0, pl: 2.5 }}>
                        {destination.tips.map((tip) => (
                          <Typography component="li" color="text.secondary" key={tip}>
                            {tip}
                          </Typography>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                <Button component={RouterLink} to="/plan-trip" variant="contained" size="large">
                  Plan a trip
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default DestinationDetailsPage;
