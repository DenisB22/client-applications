import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
  return (
    <Stack spacing={4}>
      <Box className="page-hero">
        <Stack spacing={3} alignItems="flex-start">
          <Chip label="Travel smarter" color="primary" variant="outlined" />
          <Stack spacing={1.5}>
            <Typography component="h1" variant="h2" fontWeight={800}>
              Discover memorable destinations with TripWise.
            </Typography>
            <Typography variant="h5" color="text.secondary" maxWidth="760px">
              Browse curated travel ideas, compare destination highlights, and start planning your next adventure from one friendly guide.
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
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Card className="info-card">
          <CardContent>
            <Typography component="h2" variant="h5" fontWeight={700} gutterBottom>
              Curated travel catalog
            </Typography>
            <Typography color="text.secondary">
              The destinations page will showcase a searchable grid of inspiring places with images, ratings, budgets, and travel styles.
            </Typography>
          </CardContent>
        </Card>
        <Card className="info-card">
          <CardContent>
            <Typography component="h2" variant="h5" fontWeight={700} gutterBottom>
              Destination details
            </Typography>
            <Typography color="text.secondary">
              Each destination will have a dedicated details route with highlights, travel tips, best seasons, and planning context.
            </Typography>
          </CardContent>
        </Card>
        <Card className="info-card">
          <CardContent>
            <Typography component="h2" variant="h5" fontWeight={700} gutterBottom>
              Trip request form
            </Typography>
            <Typography color="text.secondary">
              The plan trip page will collect traveler preferences and submit them through the mock TripWise request service.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}

export default HomePage;
