import { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Locations } from '../../../../shared/index';

export interface IFilterValues {
  search: string;
  location: string;
  sort: string;
}

interface FilterVacanciesProps {
  onSearch: (values: IFilterValues) => void;
}

export const FilterVacancies = ({ onSearch }: FilterVacanciesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const handleSearchClick = () => {
    onSearch({
      search: searchTerm,
      location: locationFilter,
      sort: sortOption,
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label='Поиск по названию...'
            variant='outlined'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Местоположение</InputLabel>
            <Select
              value={locationFilter}
              label='Местоположение'
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <MenuItem value='all'>Все города</MenuItem>
              {Object.values(Locations).map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={sortOption}
              label='Сортировка'
              onChange={(e) => setSortOption(e.target.value)}
            >
              <MenuItem value='default'>По умолчанию</MenuItem>
              <MenuItem value='salary_desc'>По убыванию зарплаты</MenuItem>
              <MenuItem value='salary_asc'>По возрастанию зарплаты</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={handleSearchClick}
          >
            Найти
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
