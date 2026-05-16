import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function DestinationsPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Chip label="Destinations" color="primary" variant="outlined" />
        <Typography component="h1" variant="h3" fontWeight={800} mt={2} gutterBottom>
          Explore curated destinations
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="760px">
          This page will soon load the TripWise destination catalog from the mock API and render it as a responsive card grid.
        </Typography>
      </Box>

      <Card className="placeholder-card">
        <CardContent>
          <Stack spacing={2}>
            <Typography component="h2" variant="h5" fontWeight={700}>
              Destination list coming next
            </Typography>
            <Typography color="text.secondary">
              Iteration 5 will add real destination cards, loading states, error handling, and links into each destination details page.
            </Typography>
            <Button component={RouterLink} to="/destinations/example-id" variant="outlined">
              Preview details route
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default DestinationsPage;
