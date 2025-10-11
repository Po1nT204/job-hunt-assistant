import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth='lg'>
        <Typography variant='body1' align='center'>
          Job Hunt Assistant for University
        </Typography>
        <Typography variant='body2' color='text.secondary' align='center'>
          {'© '}
          <Link color='inherit' component={RouterLink} to='/'>
            Job Hunt Assistant
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};
