import { ListItem, ListItemText, Chip } from '@mui/material';
import { IApplication } from '../../../shared/types/types';

// Хелпер для отображения статуса в красивом виде
const statusChip = (status: IApplication['status']) => {
  const statusMap = {
    pending: { label: 'В обработке', color: 'warning' as const },
    reviewed: { label: 'Рассмотрено', color: 'info' as const },
    accepted: { label: 'Принято', color: 'success' as const },
    rejected: { label: 'Отклонено', color: 'error' as const },
  };
  return (
    <Chip
      label={statusMap[status].label}
      color={statusMap[status].color}
      size='small'
    />
  );
};

interface ApplicationCardProps {
  application: IApplication;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={`Вакансия: ${application.vacancy.title}`}
        secondary={`Отправлено: ${new Date(
          application.createdAt
        ).toLocaleDateString()}`}
      />
      {statusChip(application.status)}
    </ListItem>
  );
};
