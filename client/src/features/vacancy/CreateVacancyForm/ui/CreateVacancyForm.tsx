import { Paper, Typography, Box, TextField, Button, Link } from '@mui/material';
import { useCreateVacancy } from '../model/useCreateVacancy';
import { Link as RouterLink } from 'react-router-dom';

export const CreateVacancyForm = () => {
  const { register, handleSubmit, errors, isSubmitting } = useCreateVacancy();

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography component='h1' variant='h4' gutterBottom>
        Создание новой вакансии
      </Typography>
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
          fullWidth
          id='salary'
          label='Зарплата (необязательно)'
          type='number'
          {...register('salary')}
          error={!!errors.salary}
          helperText={errors.salary?.message}
          disabled={isSubmitting}
        />
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type='submit' variant='contained'>
            Создать вакансию
          </Button>
          <Link component={RouterLink} to='/profile' variant='body2'>
            {'Отмена'}
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};
