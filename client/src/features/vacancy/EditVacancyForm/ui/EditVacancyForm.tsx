import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEditVacancy } from '../model/useEditVacancy';
import { useState } from 'react';

export const EditVacancyForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
  };

  const { register, handleSubmit, errors, isSubmitting } = useEditVacancy({
    onLoad,
  });

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography component='h1' variant='h4' gutterBottom>
        Редактирование вакансии
      </Typography>
      {isLoading ? (
        <Box display='flex' justifyContent='center' sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component='form' onSubmit={handleSubmit} noValidate>
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='salary'
            label='Зарплата'
            type='number'
            {...register('salary', { required: 'Зарплата обязательна' })}
            error={!!errors.salary}
            helperText={errors.salary?.message}
            disabled={isSubmitting}
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              Сохранить изменения
            </Button>
            <Link component={RouterLink} to='/profile' variant='body2'>
              Отмена
            </Link>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
