import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import api from '../../shared/api/axios';
import { IVacancy } from '../../shared/types/types';
import { VacancyCard } from '../../entities/VacancyCard';

export const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const { data } = await api.get<IVacancy[]>('/vacancies');
        setVacancies(data);
      } catch (err) {
        setError('Не удалось загрузить вакансии');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Доступные вакансии
      </Typography>
      {vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} />
        ))
      ) : (
        <Typography>Нет доступных вакансий.</Typography>
      )}
    </Box>
  );
};
