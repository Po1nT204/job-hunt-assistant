import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import api from '../../shared/api/axios';
import { IVacancy } from '../../shared/index';
import { VacancyCard } from '../../entities';
import { IFilterValues, FilterVacancies } from '../../features';

export const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    async (params: IFilterValues | {} = {}) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<IVacancy[]>('/vacancies', { params });
        setVacancies(data);
      } catch (err) {
        setError('Не удалось загрузить вакансии');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchVacancies({ sort: 'default', search: '', location: 'all' });
  }, [fetchVacancies]);

  const handleSearch = (values: IFilterValues) => {
    fetchVacancies(values);
  };

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Доступные вакансии
      </Typography>
      <FilterVacancies onSearch={handleSearch} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} />
        ))
      ) : (
        <Typography>По вашему запросу ничего не найдено.</Typography>
      )}
    </Box>
  );
};
