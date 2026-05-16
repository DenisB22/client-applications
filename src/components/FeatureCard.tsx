import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Stack spacing={2}>
          <Typography
            aria-hidden="true"
            sx={{
              alignItems: 'center',
              bgcolor: 'primary.main',
              borderRadius: '50%',
              color: 'primary.contrastText',
              display: 'inline-flex',
              fontSize: '1.4rem',
              height: 44,
              justifyContent: 'center',
              width: 44,
            }}
          >
            {icon}
          </Typography>
          <Stack spacing={1}>
            <Typography component="h3" variant="h6">
              {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;
