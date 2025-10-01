import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import api from '../../shared/api/axios';
import { IVacancy, Locations } from '../../shared/types/types';
import { VacancyCard } from '../../entities/VacancyCard';

export const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const fetchVacancies = async (params = {}) => {
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
  };

  useEffect(() => {
    fetchVacancies({ sort: 'default' });
  }, []);

  const handleSearch = () => {
    fetchVacancies({
      search: searchTerm,
      location: locationFilter,
      sort: sortOption,
    });
  };

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Доступные вакансии
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              fullWidth
              label='Поиск по названию или описанию'
              variant='outlined'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Местоположение</InputLabel>
              <Select
                value={locationFilter}
                label='Местоположение'
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value='all'>Все города</MenuItem>
                {Object.values(Locations).map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Сортировка</InputLabel>
              <Select
                value={sortOption}
                label='Сортировка'
                onChange={(e) => setSortOption(e.target.value)}
              >
                <MenuItem value='default'>По умолчанию</MenuItem>
                <MenuItem value='salary_desc'>По убыванию зарплаты</MenuItem>
                <MenuItem value='salary_asc'>По возрастанию зарплаты</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button
              fullWidth
              variant='contained'
              size='large'
              onClick={handleSearch}
            >
              Найти
            </Button>
          </Grid>
        </Grid>
      </Paper>
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
