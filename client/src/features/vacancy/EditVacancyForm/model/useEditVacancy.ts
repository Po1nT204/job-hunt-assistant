import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getVacancyById,
  updateVacancy,
} from '../../../../shared/api/vacancyService';
import { IVacancyData } from '../../../../shared/types/types';

interface EditVacancyProps {
  onLoad: () => void;
}

export const useEditVacancy = ({ onLoad }: EditVacancyProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IVacancyData>({ mode: 'onBlur' });

  useEffect(() => {
    if (!id) return;
    const fetchVacancy = async () => {
      try {
        const vacancy = await getVacancyById(id);
        reset(vacancy);
      } catch (err) {
        const error = err as AxiosError<{ msg: string }>;
        const errorMessage =
          error.response?.data?.msg || 'Не удалось загрузить данные вакансии';
        toast.error(errorMessage);
        navigate('/profile');
      } finally {
        onLoad();
      }
    };
    fetchVacancy();
  }, [id, reset, navigate, onLoad]);

  const onSubmit: SubmitHandler<IVacancyData> = async (formData) => {
    if (!id) return;
    try {
      await updateVacancy(id, formData);
      toast.success('Вакансия успешно обновлена!');
      navigate('/profile');
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      const errorMessage = error.response?.data?.msg || 'Ошибка при обновлении';
      toast.error(errorMessage);
      console.error(err);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
