import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';

function App() {
  return (
    <Box component="main" className="app-shell">
      <Container maxWidth="md" className="hero-card">
        <Stack spacing={3} alignItems="flex-start">
          <Chip label="Iteration 1" color="primary" variant="outlined" />
          <Stack spacing={1}>
            <Typography component="h1" variant="h2" fontWeight={800}>
              TripWise
            </Typography>
            <Typography variant="h5" color="text.secondary">
              A travel destinations guide for discovering inspiring places and planning memorable trips.
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            This starter screen confirms that the React, TypeScript, Vite, and Material UI foundation is ready.
            In the next iteration I will add routing, a shared layout, and the first application pages.
          </Typography>
          <Button variant="contained" size="large">
            Project foundation ready
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
