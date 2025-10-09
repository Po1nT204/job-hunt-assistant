import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getVacancyById,
  updateVacancy,
  IVacancyData,
  handleApiError,
} from '../../../../shared/index';

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
        toast.error(handleApiError(err));
        console.error(err);
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
