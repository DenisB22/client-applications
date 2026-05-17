import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import ErrorState from '../components/ErrorState';
import FeatureCard from '../components/FeatureCard';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';
import { getDestinations } from '../services/destinationsApi';
import type { Destination } from '../types/destination';

const features = [
  {
    title: 'Curated destination ideas',
    description:
      'Browse a focused catalog of places with practical details for budget, travel style, season, and trip length.',
    icon: 'M',
  },
  {
    title: 'Simple planning flow',
    description:
      'Move from browsing to a trip request without losing context, using routes built for a clear single-page app experience.',
    icon: 'P',
  },
  {
    title: 'Ready for saved favorites',
    description:
      'The visual foundation is prepared for favorites, filters, destination cards, and richer state in the next iterations.',
    icon: 'F',
  },
];

function HomePage() {
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [featuredError, setFeaturedError] = useState<string | null>(null);

  const loadFeaturedDestinations = useCallback(async () => {
    setIsLoadingFeatured(true);
    setFeaturedError(null);

    try {
      const destinations = await getDestinations();
      setFeaturedDestinations(destinations.slice(0, 3));
    } catch {
      setFeaturedError('We could not load featured destinations right now.');
    } finally {
      setIsLoadingFeatured(false);
    }
  }, []);

  useEffect(() => {
    void loadFeaturedDestinations();
  }, [loadFeaturedDestinations]);

  return (
    <PageContainer>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid rgba(15, 118, 110, 0.12)',
          borderRadius: 2,
          boxShadow: '0 24px 80px rgba(23, 32, 51, 0.10)',
          overflow: 'hidden',
        }}
      >
        <Grid container>
          <Grid item xs={12} md={7}>
            <Stack spacing={3} alignItems="flex-start" sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
              <Typography
                component="p"
                color="primary.main"
                fontWeight={800}
                sx={{ textTransform: 'uppercase' }}
              >
                Travel smarter
              </Typography>
              <Stack spacing={1.5}>
                <Typography component="h1" variant="h2">
                  Discover memorable destinations with TripWise.
                </Typography>
                <Typography variant="h5" color="text.secondary" maxWidth="760px">
                  Browse curated travel ideas, compare destination highlights, and start planning your
                  next adventure from one friendly guide.
                </Typography>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={RouterLink} to="/destinations" variant="contained" size="large">
                  Explore destinations
                </Button>
                <Button component={RouterLink} to="/plan-trip" variant="outlined" size="large">
                  Plan a trip
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: '#dbe9dd',
                display: 'grid',
                minHeight: { xs: 260, md: '100%' },
                placeItems: 'center',
                px: 4,
                py: 5,
              }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.82)',
                  border: '1px solid rgba(15, 118, 110, 0.16)',
                  borderRadius: 2,
                  maxWidth: 320,
                  p: 3,
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="overline" color="primary.dark" fontWeight={800}>
                    Featured route
                  </Typography>
                  <Typography component="p" variant="h5">
                    Kyoto in spring
                  </Typography>
                  <Typography color="text.secondary">
                    Temples, gardens, quiet side streets, and seasonal food experiences for a
                    culture-first itinerary.
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <SectionHeader
        eyebrow="Why TripWise"
        title="A calm starting point for choosing where to go next"
        description="This iteration establishes the shared UI foundation. Destination data, filters, details, favorites, and forms will plug into these patterns next."
        action={
          <Button component={RouterLink} to="/destinations" variant="outlined">
            View routes
          </Button>
        }
      />

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>

      <SectionHeader
        eyebrow="Featured"
        title="Start with a few favorite routes"
        description="These destination previews are loaded from the same mock HTTP API used by the catalog."
        action={
          <Button component={RouterLink} to="/destinations" variant="outlined">
            Explore all
          </Button>
        }
      />

      {isLoadingFeatured ? <LoadingState message="Loading featured destinations..." /> : null}

      {!isLoadingFeatured && featuredError ? (
        <ErrorState message={featuredError} onRetry={loadFeaturedDestinations} />
      ) : null}

      {!isLoadingFeatured && !featuredError ? (
        <Grid container spacing={3}>
          {featuredDestinations.map((destination) => (
            <Grid item xs={12} md={4} key={destination.id}>
              <DestinationCard destination={destination} />
            </Grid>
          ))}
        </Grid>
      ) : null}

      <Box
        sx={{
          bgcolor: 'primary.dark',
          borderRadius: 2,
          color: 'primary.contrastText',
          p: { xs: 3, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={1} maxWidth="680px">
            <Typography component="h2" variant="h4">
              Ready to shape a trip request?
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.78)' }}>
              The planning route is already wired up and will become the full submit form in a later
              iteration.
            </Typography>
          </Stack>
          <Button component={RouterLink} to="/plan-trip" variant="contained" color="secondary" size="large">
            Plan a trip
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
}

export default HomePage;
