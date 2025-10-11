import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  children?: ReactNode;
}

export const EmptyState = ({ message, children }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 4,
        border: '2px dashed',
        borderColor: 'grey.300',
        borderRadius: 2,
        mt: 2,
      }}
    >
      <Typography color='text.secondary'>{message}</Typography>
      {children && <Box sx={{ mt: 2 }}>{children}</Box>}
    </Box>
  );
};
