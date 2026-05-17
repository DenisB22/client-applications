import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';
import { useTravelStore } from '../store/travelStore';
import type { TripRequest } from '../types/tripRequest';

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function TripRequestCard({ request }: { request: TripRequest }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={request.budget} color="secondary" variant="outlined" size="small" />
              <Chip label={request.travelStyle} color="primary" variant="outlined" size="small" />
            </Stack>
            <Box>
              <Typography component="h2" variant="h5">
                {request.preferredDestination}
              </Typography>
              <Typography color="text.secondary">
                Submitted {formatDateTime(request.createdAt)}
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Traveler
              </Typography>
              <Typography fontWeight={700}>{request.fullName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography fontWeight={700}>{request.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Travel month
              </Typography>
              <Typography fontWeight={700}>{request.travelMonth}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Travelers
              </Typography>
              <Typography fontWeight={700}>{request.travelers}</Typography>
            </Grid>
          </Grid>

          {request.notes ? (
            <Box
              sx={{
                bgcolor: 'rgba(15, 118, 110, 0.08)',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Notes
              </Typography>
              <Typography>{request.notes}</Typography>
            </Box>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}

function TripRequestsPage() {
  const tripRequests = useTravelStore((state) => state.tripRequests);

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Requests"
        title="Submitted trip requests"
        description="Review planning requests submitted through the Plan a Trip form. These are stored in Zustand and persisted in localStorage."
        action={
          <Button component={RouterLink} to="/plan-trip" variant="contained">
            New request
          </Button>
        }
      />

      {tripRequests.length === 0 ? (
        <EmptyState
          title="No trip requests yet"
          message="Submit the planning form and your saved request details will appear here."
          action={
            <Button component={RouterLink} to="/plan-trip" variant="contained">
              Plan a trip
            </Button>
          }
        />
      ) : (
        <Grid container spacing={3}>
          {tripRequests.map((request) => (
            <Grid item xs={12} lg={6} key={request.id}>
              <TripRequestCard request={request} />
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}

export default TripRequestsPage;
