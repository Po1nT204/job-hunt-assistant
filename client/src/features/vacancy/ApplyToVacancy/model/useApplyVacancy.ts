import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  createApplication,
  ApplyToVacancyProps,
  IApplyForm,
} from '../../../../shared/index';

export const useApplyVacancy = ({ vacancyId }: ApplyToVacancyProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IApplyForm>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IApplyForm> = async (formData) => {
    try {
      await createApplication({ ...formData, vacancyId });
      toast.success('Ваш отклик успешно отправлен!');
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      const errorMessage =
        error.response?.data?.msg || 'Ошибка при отправке отклика';
      toast.error(errorMessage);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
