import { Container } from '@mui/material';
import { RegisterByEmail } from '../../features/auth/RegisterByEmail/ui/RegisterByEmail';

export const RegisterPage = () => {
  return (
    <Container maxWidth='xs'>
      <RegisterByEmail />
    </Container>
  );
};
