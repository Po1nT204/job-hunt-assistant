import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IVacancy } from '../../../shared/index';

interface VacancyCardProps {
  vacancy: IVacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {vacancy.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 1,
          }}
        >
          <Typography color='text.secondary'>{vacancy.location}</Typography>
          {vacancy.salary && (
            <Typography variant='h6' component='span' color='primary.main'>
              {vacancy.salary} руб.
            </Typography>
          )}
        </Box>
        <Typography variant='body2'>
          {vacancy.description.substring(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' component={Link} to={`/vacancies/${vacancy._id}`}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};
