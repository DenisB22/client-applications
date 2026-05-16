import { Box, Button, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  message: string;
  action?: ReactNode;
};

function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid rgba(15, 118, 110, 0.12)',
        borderRadius: 2,
        p: { xs: 3, md: 4 },
      }}
    >
      <Stack spacing={2} alignItems="flex-start">
        <Typography component="h2" variant="h5">
          {title}
        </Typography>
        <Typography color="text.secondary">{message}</Typography>
        {action ? <Button variant="outlined">{action}</Button> : null}
      </Stack>
    </Box>
  );
}

export default EmptyState;
