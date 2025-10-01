import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { createApplication } from '../../../shared/api/applicationService';

interface ApplyToVacancyProps {
  vacancyId: string;
  onSuccess: () => void;
}

interface IApplyForm {
  coverLetter: string;
}

export const ApplyToVacancy = ({
  vacancyId,
  onSuccess,
}: ApplyToVacancyProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApplyForm>();

  const onSubmit: SubmitHandler<IApplyForm> = async (formData) => {
    setIsSubmitting(true);
    try {
      await createApplication({ ...formData, vacancyId });
      toast.success('Ваш отклик успешно отправлен!');
      onSuccess();
      setShowForm(false);
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      const errorMessage =
        error.response?.data?.msg || 'Ошибка при отправке отклика';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <Button variant='contained' onClick={() => setShowForm(true)}>
        Подать отклик
      </Button>
    );
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
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
