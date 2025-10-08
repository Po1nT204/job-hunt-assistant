import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../app/providers/AuthProvider';
import api from '../../../../shared/api/axios';
import {
  IRegisterData,
  register as registerUser,
} from '../../../../shared/index';

export const useRegister = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterData>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRegisterData> = async (formData) => {
    try {
      const { token } = await registerUser(formData);
      localStorage.setItem('token', token);

      const { data: userData } = await api.get('/users/me');
      setUser(userData);

      toast.success('Регистрация прошла успешно!');
      navigate('/vacancies');
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
      const errorMessage =
        error.response?.data?.msg || 'Произошла ошибка при регистрации';
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
