import { Chip, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      justifyContent="space-between"
    >
      <Stack spacing={1.5} maxWidth="760px">
        {eyebrow ? <Chip label={eyebrow} color="primary" variant="outlined" /> : null}
        <Typography component="h2" variant="h4">
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary" fontSize="1.05rem">
            {description}
          </Typography>
        ) : null}
      </Stack>
      {action}
    </Stack>
  );
}

export default SectionHeader;
