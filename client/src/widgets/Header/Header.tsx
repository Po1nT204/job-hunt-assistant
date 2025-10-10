import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    toast.info('Вы вышли из системы');
    handleClose();
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  if (isLoading) {
    return (
      <AppBar position='static'>
        <Toolbar />
      </AppBar>
    );
  }

  const renderDesktopMenu = () => (
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
  );

  const renderMobileMenu = () => (
    <>
      <IconButton
        size='large'
        edge='end'
        color='inherit'
        aria-label='menu'
        onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleNavigate('/vacancies')}>
          Вакансии
        </MenuItem>
        {user
          ? [
              <MenuItem
                key='profile'
                onClick={() => handleNavigate('/profile')}
              >
                Профиль
              </MenuItem>,
              <MenuItem key='logout' onClick={handleLogout}>
                Выйти
              </MenuItem>,
            ]
          : [
              <MenuItem key='login' onClick={() => handleNavigate('/login')}>
                Войти
              </MenuItem>,
              <MenuItem
                key='register'
                onClick={() => handleNavigate('/register')}
              >
                Регистрация
              </MenuItem>,
            ]}
      </Menu>
    </>
  );

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component={Link}
          to='/'
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Job Hunt Assistant
        </Typography>
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Toolbar>
    </AppBar>
  );
};
