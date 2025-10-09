import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../app/providers/AuthProvider';
import {
  handleApiError,
  ILoginData,
  login as loginUser,
} from '../../../../shared/index';
import api from '../../../../shared/api/axios';

export const useLogin = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginData>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<ILoginData> = async (formData) => {
    try {
      const { token } = await loginUser(formData);
      localStorage.setItem('token', token);

      const { data: userData } = await api.get('/users/me');
      setUser(userData);

      toast.success('Вы успешно вошли!');
      navigate('/vacancies');
    } catch (err) {
      toast.error(handleApiError);
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
