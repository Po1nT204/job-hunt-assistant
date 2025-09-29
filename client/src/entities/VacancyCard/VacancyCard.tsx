import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IVacancy } from '../../shared/types/types';

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
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {vacancy.location}
        </Typography>
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
