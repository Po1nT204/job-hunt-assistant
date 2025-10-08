import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useRegister } from '../model/useRegister';

export const RegisterByEmail = () => {
  const { register, handleSubmit, errors, isSubmitting } = useRegister();
  return (
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
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
        <FormControl
          fullWidth
          margin='normal'
          error={!!errors.role}
          disabled={isSubmitting}
        >
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
        <Link component={RouterLink} to='/login' variant='body2'>
          Уже есть аккаунт? Войти
        </Link>
      </Box>
    </Box>
  );
};
