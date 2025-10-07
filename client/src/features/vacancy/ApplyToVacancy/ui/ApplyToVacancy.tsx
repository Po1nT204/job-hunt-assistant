import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useApplyVacancy } from '../model/useApplyVacancy';
import { ApplyToVacancyProps } from '../../../../shared/types/types';

export const ApplyToVacancy = ({ vacancyId }: ApplyToVacancyProps) => {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, errors, isSubmitting } = useApplyVacancy({
    vacancyId,
  });

  if (!showForm) {
    return (
      <Button variant='contained' onClick={() => setShowForm(true)}>
        Подать отклик
      </Button>
    );
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <Typography variant='h6' gutterBottom>
        Ваше сопроводительное письмо
      </Typography>
      <TextField
        margin='normal'
        required
        fullWidth
        multiline
        rows={6}
        id='coverLetter'
        label='Расскажите о себе и своем опыте'
        {...register('coverLetter', {
          required: 'Сопроводительное письмо обязательно',
          minLength: { value: 50, message: 'Минимум 50 символов' },
        })}
        error={!!errors.coverLetter}
        helperText={errors.coverLetter?.message}
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button type='submit' variant='contained' disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить отклик'}
        </Button>
        <Button
          variant='outlined'
          onClick={() => setShowForm(false)}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};
