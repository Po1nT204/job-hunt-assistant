import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Link,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../../app/providers/AuthProvider';
import { register as registerUser } from '../../shared/api/authService';
import { IRegisterData } from '../../shared/types/types';
import api from '../../shared/api/axios';
import { AxiosError } from 'axios';

export const RegisterPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>();

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

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Регистрация
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Полное имя'
            autoFocus
            {...register('name', { required: 'Имя обязательно' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            autoComplete='email'
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Некорректный формат email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Пароль'
            type='password'
            id='password'
            autoComplete='new-password'
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 8,
                message: 'Пароль должен быть не менее 8 символов',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControl fullWidth margin='normal' error={!!errors.role}>
            <InputLabel id='role-select-label'>Я...</InputLabel>
            <Select
              labelId='role-select-label'
              id='role-select'
              defaultValue=''
              label='Я...'
              {...register('role', { required: 'Выберите вашу роль' })}
            >
              <MenuItem value='student'>Студент</MenuItem>
              <MenuItem value='employer'>Работодатель</MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Link component={RouterLink} to='/login' variant='body2'>
            Уже есть аккаунт? Войти
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
