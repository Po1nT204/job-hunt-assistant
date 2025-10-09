import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createVacancy,
  handleApiError,
  IVacancyData,
} from '../../../../shared/index';

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
      toast.error(handleApiError(err));
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
