import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { EditVacancyForm } from '../../features/vacancy/EditVacancyForm/ui/EditVacancyForm';

export const VacancyEditPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Typography>Вакансия не найдена.</Typography>;

  return (
    <Container maxWidth='xs' sx={{ px: { xs: 1, sm: 2 } }}>
      <EditVacancyForm />
    </Container>
  );
};
