import { Box, CircularProgress, Stack, Typography } from '@mui/material';

type LoadingStateProps = {
  message?: string;
};

function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: 280,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress />
        <Typography color="text.secondary">{message}</Typography>
      </Stack>
    </Box>
  );
}

export default LoadingState;
