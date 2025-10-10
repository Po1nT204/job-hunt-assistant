import { Container } from '@mui/material';
import { LoginByEmail } from '../../features/auth/LoginByEmail/ui/LoginByEmail';

export const LoginPage = () => {
  return (
    <Container maxWidth='xs' sx={{ px: { xs: 1, sm: 2 } }}>
      <LoginByEmail />
    </Container>
  );
};
