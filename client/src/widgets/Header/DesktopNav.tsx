import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';

interface DesktopNavProps {
  onLogout: () => void;
}

export const DesktopNav = ({ onLogout }: DesktopNavProps) => {
  const { user } = useAuth();

  return (
    <Box>
      <Button color='inherit' component={Link} to='/vacancies'>
        Вакансии
      </Button>
      {user ? (
        <>
          <Button color='inherit' component={Link} to='/profile'>
            Профиль
          </Button>
          <Button color='inherit' onClick={onLogout}>
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
  );
};
