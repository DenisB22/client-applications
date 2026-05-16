import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Plan a Trip', to: '/plan-trip' },
];

function AppLayout() {
  const location = useLocation();

  return (
    <Box className="app-shell">
      <AppBar position="sticky" color="default" elevation={0} className="app-header">
        <Container maxWidth="lg">
          <Toolbar disableGutters className="app-toolbar">
            <Button component={RouterLink} to="/" color="inherit" className="brand-link">
              TripWise
            </Button>

            <Stack
              component="nav"
              direction="row"
              spacing={1}
              className="primary-nav"
              aria-label="Primary navigation"
            >
              {navigationItems.map((item) => {
                const isActive =
                  item.to === '/' ? location.pathname === item.to : location.pathname.startsWith(item.to);

                return (
                  <Button
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    color="inherit"
                    className={`nav-link${isActive ? ' active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" className="app-main">
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Box component="footer" className="app-footer">
        <Container maxWidth="lg">
          <Stack spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Typography variant="subtitle1" fontWeight={700}>
              TripWise
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign={{ xs: 'left', sm: 'center' }}>
              A frontend travel destinations guide built with React, TypeScript, React Router, Material
              UI, and Zustand.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default AppLayout;
