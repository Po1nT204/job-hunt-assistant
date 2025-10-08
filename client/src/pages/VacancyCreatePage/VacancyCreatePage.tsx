import { Container } from '@mui/material';
import { CreateVacancyForm } from '../../features/vacancy/CreateVacancyForm/ui/CreateVacancyForm';

export const VacancyCreatePage = () => {
  return (
    <Container maxWidth='md'>
      <CreateVacancyForm />
    </Container>
  );
};
