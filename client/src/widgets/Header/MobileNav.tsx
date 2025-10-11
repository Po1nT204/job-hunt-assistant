import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';

interface MobileNavProps {
  onLogout: () => void;
}

export const MobileNav = ({ onLogout }: MobileNavProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    handleClose();
  };

  return (
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
              <MenuItem key='logout' onClick={handleLogoutClick}>
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
};
