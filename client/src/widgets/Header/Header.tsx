import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';

export const Header = () => {
  const { user } = useAuth();

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
              {/* Здесь будет кнопка Logout */}
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
