import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';

function DestinationDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Stack spacing={3}>
      <Box>
        <Chip label="Destination details" color="primary" variant="outlined" />
        <Typography component="h1" variant="h3" fontWeight={800} mt={2} gutterBottom>
          Destination details
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="760px">
          This route is ready to display the selected destination once the mock destinations API is added.
        </Typography>
      </Box>

      <Card className="placeholder-card">
        <CardContent>
          <Stack spacing={2}>
            <Typography component="h2" variant="h5" fontWeight={700}>
              Selected destination ID: {id ?? 'unknown'}
            </Typography>
            <Typography color="text.secondary">
              Iteration 6 will read this route parameter, request destination details, and render highlights, tips, and planning information.
            </Typography>
            <Button component={RouterLink} to="/destinations" variant="contained">
              Back to destinations
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default DestinationDetailsPage;
