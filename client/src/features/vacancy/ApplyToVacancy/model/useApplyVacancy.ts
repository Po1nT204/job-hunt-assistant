import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  createApplication,
  ApplyToVacancyProps,
  IApplyForm,
  handleApiError,
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
