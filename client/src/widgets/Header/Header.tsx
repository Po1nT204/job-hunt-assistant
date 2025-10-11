import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { toast } from 'react-toastify';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

export const Header = () => {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    logout();
    toast.info('Вы вышли из системы');
    navigate('/');
  };

  if (isLoading) {
    return (
      <AppBar position='static'>
        <Toolbar />
      </AppBar>
    );
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h4'
          component={Link}
          to='/'
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Job Hunt Assistant
        </Typography>
        {isMobile ? (
          <MobileNav onLogout={handleLogout} />
        ) : (
          <DesktopNav onLogout={handleLogout} />
        )}
      </Toolbar>
    </AppBar>
  );
};
