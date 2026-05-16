import { Box, type BoxProps } from '@mui/material';
import type { ReactNode } from 'react';

type PageContainerProps = BoxProps & {
  children: ReactNode;
};

function PageContainer({ children, sx, ...props }: PageContainerProps) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 4, md: 5 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default PageContainer;
