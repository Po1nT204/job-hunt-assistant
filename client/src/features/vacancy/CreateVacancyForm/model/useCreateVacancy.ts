import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createVacancy } from '../../../../shared/api/vacancyService';
import { IVacancyData } from '../../../../shared/types/types';

export const useCreateVacancy = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IVacancyData>({ mode: 'onBlur' });

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

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
