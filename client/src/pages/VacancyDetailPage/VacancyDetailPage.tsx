import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import { getVacancyById } from '../../shared/api/vacancyService';
import { IApplicationData, IVacancy } from '../../shared/types/types';
import { useAuth } from '../../app/providers/AuthProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createApplication } from '../../shared/api/applicationService';

export const VacancyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vacancy, setVacancy] = useState<IVacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApplicationData>();

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

  const onApplicationSubmit: SubmitHandler<IApplicationData> = async (
    formData
  ) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await createApplication({ ...formData, vacancyId: id });
      toast.success('Ваш отклик успешно отправлен!');
      setShowApplyForm(false);
      // В будущем здесь можно добавить логику, чтобы скрыть кнопку "Откликнуться" навсегда
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.msg || 'Ошибка при отправке отклика';
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Показываем кнопку только если пользователь - студент */}
        {user?.role === 'student' && !showApplyForm && (
          <Button variant='contained' onClick={() => setShowApplyForm(true)}>
            Подать отклик
          </Button>
        )}

        {/* Форма отклика */}
        {showApplyForm && (
          <Box
            component='form'
            onSubmit={handleSubmit(onApplicationSubmit)}
            noValidate
          >
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
              label='Расскажите о себе, о своем опыте и компетенциях. Напишите, почему вы подходите на эту позицию'
              {...register('coverLetter', {
                required: 'Сопроводительное письмо обязательно',
                minLength: {
                  value: 50,
                  message: 'Минимум 50 символов',
                },
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
                onClick={() => setShowApplyForm(false)}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
