import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Divider,
  List,
  CircularProgress,
} from '@mui/material';
import { getMyApplications, IApplication } from '../../../shared/index';
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
        <Typography>Вы еще не оставляли откликов.</Typography>
      )}
    </Paper>
  );
};
