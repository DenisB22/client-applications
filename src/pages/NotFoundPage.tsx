import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Box className="not-found-page">
      <Card className="placeholder-card">
        <CardContent>
          <Stack spacing={2} alignItems="flex-start">
            <Typography component="h1" variant="h3" fontWeight={800}>
              Page not found
            </Typography>
            <Typography color="text.secondary">
              The TripWise page you requested does not exist. Use the navigation or return home to keep exploring.
            </Typography>
            <Button component={RouterLink} to="/" variant="contained">
              Return home
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NotFoundPage;
