import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Box>
      <Container maxWidth='md' sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant='h2' component='h1' fontWeight={700} gutterBottom>
          Найди свою первую работу в университете
        </Typography>
        <Typography variant='h5' color='text.secondary' paragraph>
          Централизованная платформа для поиска стажировок и временной работы
          прямо в твоем университете.
        </Typography>
        <Button
          variant='contained'
          size='large'
          component={RouterLink}
          to='/vacancies'
          sx={{ mt: 3 }}
        >
          Смотреть все вакансии
        </Button>
      </Container>

      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth='lg'>
          <Typography
            variant='h4'
            component='h2'
            textAlign='center'
            fontWeight={600}
            sx={{ mb: 6 }}
          >
            Как это работает
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Для студентов 🎓
                </Typography>
                <Typography>
                  <b>1. Регистрируйся:</b> Создай аккаунт за минуту.
                  <br />
                  <b>2. Ищи:</b> Находи интересные вакансии с помощью удобного
                  поиска.
                  <br />
                  <b>3. Откликайся:</b> Подавай заявки и отслеживай их статус в
                  личном кабинете.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Для работодателей 🏢
                </Typography>
                <Typography>
                  <b>1. Регистрируйся:</b> Создай профиль компании или отдела.
                  <br />
                  <b>2. Публикуй:</b> Размещай вакансии для тысяч талантливых
                  студентов.
                  <br />
                  <b>3. Находи:</b> Получай отклики и управляй кандидатами в
                  удобном интерфейсе.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
