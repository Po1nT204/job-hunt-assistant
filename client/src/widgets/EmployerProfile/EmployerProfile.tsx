import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { getVacancies, deleteVacancy } from '../../shared/api/vacancyService';
import { IVacancy } from '../../shared/types/types';
import { useAuth } from '../../app/providers/AuthProvider';

export const EmployerProfile = () => {
  const { user } = useAuth();
  const [myVacancies, setMyVacancies] = useState<IVacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterVacancies = async () => {
      if (!user) return;
      try {
        const allVacancies = await getVacancies();
        const filtered = allVacancies.filter(
          (vacancy) => vacancy.company._id === user._id
        );
        setMyVacancies(filtered);
      } catch (error) {
        console.error('Failed to fetch vacancies', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterVacancies();
  }, [user]);

  const handleDelete = async (vacancyId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту вакансию?')) {
      try {
        await deleteVacancy(vacancyId);
        toast.success('Вакансия удалена');
        setMyVacancies((prev) => prev.filter((v) => v._id !== vacancyId));
      } catch (error) {
        toast.error('Не удалось удалить вакансию');
        console.error(error);
      }
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' gutterBottom>
          Мои вакансии
        </Typography>
        <Button variant='contained' component={RouterLink} to='/vacancies/new'>
          Создать вакансию
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      {loading ? (
        <CircularProgress />
      ) : myVacancies.length > 0 ? (
        <List>
          {myVacancies.map((vacancy) => (
            <ListItem
              key={vacancy._id}
              divider
              secondaryAction={
                <>
                  <IconButton
                    edge='end'
                    aria-label='edit'
                    component={RouterLink}
                    to={`/vacancies/${vacancy._id}/edit`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => handleDelete(vacancy._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={vacancy.title}
                secondary={vacancy.location}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Вы еще не создали ни одной вакансии.</Typography>
      )}
    </Paper>
  );
};
