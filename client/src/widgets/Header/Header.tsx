import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { toast } from 'react-toastify';

export const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Вы вышли из системы');
    navigate('/');
  };

  if (isLoading) {
    return null;
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component={Link}
          to='/'
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Job Platform
        </Typography>
        <Box>
          <Button color='inherit' component={Link} to='/vacancies'>
            Вакансии
          </Button>
          {user ? (
            <>
              <Button color='inherit' component={Link} to='/profile'>
                Профиль
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' component={Link} to='/login'>
                Войти
              </Button>
              <Button color='inherit' component={Link} to='/register'>
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
