import { Alert, Button, Stack } from '@mui/material';

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Stack spacing={2} alignItems="flex-start">
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
      {onRetry ? (
        <Button variant="contained" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </Stack>
  );
}

export default ErrorState;
