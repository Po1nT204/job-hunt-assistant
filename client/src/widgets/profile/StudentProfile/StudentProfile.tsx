import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Divider,
  List,
  CircularProgress,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  EmptyState,
  getMyApplications,
  IApplication,
} from '../../../shared/index';
import { ApplicationCard } from '../../../entities';

export const StudentProfile = () => {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (err) {
        setError('Не удалось загрузить ваши отклики.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h5' gutterBottom>
        Мои отклики
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : applications.length > 0 ? (
        <List>
          {applications.map((app) => (
            <ApplicationCard key={app._id} application={app} />
          ))}
        </List>
      ) : (
        <EmptyState message='Вы еще не оставляли откликов.'>
          <Button variant='contained' component={RouterLink} to='/vacancies'>
            Посмотреть вакансии для откликов
          </Button>
        </EmptyState>
      )}
    </Paper>
  );
};
