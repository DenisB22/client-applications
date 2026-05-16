import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function PlanTripPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Chip label="Plan a Trip" color="primary" variant="outlined" />
        <Typography component="h1" variant="h3" fontWeight={800} mt={2} gutterBottom>
          Tell us about your dream trip
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="760px">
          This page will become the TripWise request form for traveler details, preferences, budget, timing, and notes.
        </Typography>
      </Box>

      <Card className="placeholder-card">
        <CardContent>
          <Stack spacing={2}>
            <Typography component="h2" variant="h5" fontWeight={700}>
              Trip planning form coming soon
            </Typography>
            <Typography color="text.secondary">
              Iteration 9 will add validation, a mock submit request, success messaging, and saved requests in global state.
            </Typography>
            <Button component={RouterLink} to="/destinations" variant="outlined">
              Browse destinations first
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default PlanTripPage;
