import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
} from '@mui/material';
import { getMyApplications } from '../../shared/api/applicationService';
import { IApplication } from '../../shared/types/types';

// Хелпер для отображения статуса в красивом виде
const statusChip = (status: IApplication['status']) => {
  const statusMap = {
    pending: { label: 'В обработке', color: 'warning' as const },
    reviewed: { label: 'Рассмотрено', color: 'info' as const },
    accepted: { label: 'Принято', color: 'success' as const },
    rejected: { label: 'Отклонено', color: 'error' as const },
  };
  return (
    <Chip label={statusMap[status].label} color={statusMap[status].color} />
  );
};

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
            <ListItem key={app._id} divider>
              <ListItemText
                primary={`Вакансия: ${app.vacancy.title}`}
                secondary={`Отправлено: ${new Date(
                  app.createdAt
                ).toLocaleDateString()}`}
              />
              {statusChip(app.status)}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Вы еще не оставляли откликов.</Typography>
      )}
    </Paper>
  );
};
