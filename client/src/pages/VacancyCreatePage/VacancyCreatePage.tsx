import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import { createVacancy } from '../../shared/api/vacancyService';
import { IVacancyData } from '../../shared/types/types';
import { AxiosError } from 'axios';

export const VacancyCreatePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVacancyData>();

  const onSubmit: SubmitHandler<IVacancyData> = async (formData) => {
    try {
      await createVacancy(formData);
      toast.success('Вакансия успешно создана!');
      navigate('/profile');
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      const errorMessage =
        error.response?.data?.msg || 'Ошибка при создании вакансии';
      toast.error(errorMessage);
      console.error(err);
    }
  };

  return (
    <Container maxWidth='md'>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography component='h1' variant='h4' gutterBottom>
          Создание новой вакансии
        </Typography>
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
              Создать вакансию
            </Button>
            <Button variant='outlined' onClick={() => navigate('/profile')}>
              Отмена
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
