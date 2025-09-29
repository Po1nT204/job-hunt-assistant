import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ReactNode } from 'react';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='80vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
