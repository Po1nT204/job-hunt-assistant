import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useLogin } from '../model/useLogin';

export const LoginByEmail = () => {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

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
        Вход
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          autoComplete='email'
          autoFocus
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
          autoComplete='current-password'
          {...register('password', { required: 'Пароль обязателен' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isSubmitting}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
        <Link component={RouterLink} to='/register' variant='body2'>
          {'Нет аккаунта? Зарегистрироваться'}
        </Link>
      </Box>
    </Box>
  );
};
