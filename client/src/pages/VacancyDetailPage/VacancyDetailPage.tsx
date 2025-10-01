import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import { getVacancyById } from '../../shared/api/vacancyService';
import { IVacancy } from '../../shared/types/types';
import { useAuth } from '../../app/providers/AuthProvider';
import { ApplyToVacancy } from '../../features';

export const VacancyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vacancy, setVacancy] = useState<IVacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchVacancy = async () => {
      try {
        const data = await getVacancyById(id);
        setVacancy(data);
      } catch (err) {
        setError('Не удалось загрузить детали вакансии.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [id]);

  const handleApplySuccess = () => {
    setIsApplied(true);
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!vacancy) {
    return <Typography>Вакансия не найдена.</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Button onClick={() => navigate('/vacancies')} sx={{ mb: 2 }}>
        &larr; К списку вакансий
      </Button>
      <Typography variant='h4' gutterBottom>
        {vacancy.title}
      </Typography>
      <Typography variant='h6' color='text.secondary' gutterBottom>
        {vacancy.company.name} - {vacancy.location}
      </Typography>
      {vacancy.salary && (
        <Typography variant='h6' gutterBottom>
          Зарплата: {vacancy.salary} руб.
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
        {vacancy.description}
      </Typography>
      <Box mt={4}>
        {user?.role === 'student' && !isApplied && id && (
          <ApplyToVacancy vacancyId={id} onSuccess={handleApplySuccess} />
        )}
        {isApplied && (
          <Typography variant='h6' color='success.main'>
            Вы успешно откликнулись на эту вакансию!
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
