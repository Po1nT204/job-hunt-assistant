import { Container } from '@mui/material';
import { RegisterByEmail } from '../../features/auth/RegisterByEmail/ui/RegisterByEmail';

export const RegisterPage = () => {
  return (
    <Container maxWidth='xs' sx={{ px: { xs: 1, sm: 2 } }}>
      <RegisterByEmail />
    </Container>
  );
};
