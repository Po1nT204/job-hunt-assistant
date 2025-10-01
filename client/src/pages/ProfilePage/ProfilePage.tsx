import { useAuth } from '../../app/providers/AuthProvider';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { StudentProfile, EmployerProfile } from '../../widgets/index';

export const ProfilePage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <Box display='flex' justifyContent='center' mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant='h5' gutterBottom>
            Мой профиль
          </Typography>
          <Typography variant='body1'>
            <strong>Имя:</strong> {user.name}
          </Typography>
          <Typography variant='body1'>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
            <strong>Роль:</strong>{' '}
            {user.role === 'student' ? 'Студент' : 'Работодатель'}
          </Typography>
        </Paper>
      </Grid>

      {/* Блок с контентом в зависимости от роли */}
      <Grid size={{ xs: 12, md: 9 }}>
        {user.role === 'student' ? <StudentProfile /> : <EmployerProfile />}
      </Grid>
    </Grid>
  );
};
