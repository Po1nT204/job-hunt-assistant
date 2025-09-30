import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getVacancyById, updateVacancy } from '../../shared/api/vacancyService';
import { IVacancyData } from '../../shared/types/types';

export const VacancyEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IVacancyData>();

  useEffect(() => {
    if (!id) return;
    const fetchVacancy = async () => {
      try {
        const vacancy = await getVacancyById(id);
        reset(vacancy);
      } catch (error) {
        toast.error('Не удалось загрузить данные вакансии');
        navigate('/profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVacancy();
  }, [id, reset, navigate]);

  const onSubmit: SubmitHandler<IVacancyData> = async (formData) => {
    if (!id) return;
    try {
      await updateVacancy(id, formData);
      toast.success('Вакансия успешно обновлена!');
      navigate('/profile');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Ошибка при обновлении');
      console.error(err);
    }
  };

  if (!id) return <Typography>Вакансия не найдена.</Typography>;

  return (
    <Container maxWidth='md'>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography component='h1' variant='h4' gutterBottom>
          Редактирование вакансии
        </Typography>
        {/* Форма точно такая же, как при создании */}
        {isLoading ? (
          <Box display='flex' justifyContent='center' sx={{ my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              id='title'
              label='Название вакансии'
              autoFocus
              {...register('title', { required: 'Название обязательно' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              rows={8}
              id='description'
              label='Описание вакансии'
              {...register('description', { required: 'Описание обязательно' })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='location'
              label='Местоположение'
              {...register('location', {
                required: 'Местоположение обязательно',
              })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
            <TextField
              margin='normal'
              fullWidth
              id='salary'
              label='Зарплата (необязательно)'
              type='number'
              {...register('salary')}
              error={!!errors.salary}
              helperText={errors.salary?.message}
            />
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button type='submit' variant='contained'>
                Сохранить изменения
              </Button>
              <Button variant='outlined' onClick={() => navigate('/profile')}>
                Отмена
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
