import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useTravelStore } from '../store/travelStore';
import type { BudgetLevel, TravelStyle } from '../types/destination';

const regions = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
const budgetLevels: BudgetLevel[] = ['Budget', 'Moderate', 'Premium'];
const travelStyles: TravelStyle[] = ['Adventure', 'Culture', 'Relaxation', 'Nature', 'Food'];

type DestinationFiltersProps = {
  isSubmitting?: boolean;
  onReset: () => void;
  onSearch: () => void;
};

function DestinationFilters({ isSubmitting = false, onReset, onSearch }: DestinationFiltersProps) {
  const filters = useTravelStore((state) => state.filters);
  const setFilters = useTravelStore((state) => state.setFilters);

  return (
    <Card>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Stack spacing={2.5} component="form" onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Search"
                placeholder="Try Kyoto, beaches, food..."
                value={filters.query ?? ''}
                onChange={(event) => {
                  setFilters({ query: event.target.value });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={2.33}>
              <FormControl fullWidth>
                <InputLabel id="region-filter-label">Region</InputLabel>
                <Select
                  labelId="region-filter-label"
                  label="Region"
                  value={filters.region ?? ''}
                  onChange={(event) => {
                    setFilters({ region: event.target.value });
                  }}
                >
                  <MenuItem value="">Any region</MenuItem>
                  {regions.map((region) => (
                    <MenuItem value={region} key={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} md={2.33}>
              <FormControl fullWidth>
                <InputLabel id="budget-filter-label">Budget</InputLabel>
                <Select
                  labelId="budget-filter-label"
                  label="Budget"
                  value={filters.budgetLevel ?? ''}
                  onChange={(event) => {
                    setFilters({
                      budgetLevel: event.target.value
                        ? (event.target.value as BudgetLevel)
                        : undefined,
                    });
                  }}
                >
                  <MenuItem value="">Any budget</MenuItem>
                  {budgetLevels.map((budgetLevel) => (
                    <MenuItem value={budgetLevel} key={budgetLevel}>
                      {budgetLevel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} md={2.33}>
              <FormControl fullWidth>
                <InputLabel id="style-filter-label">Style</InputLabel>
                <Select
                  labelId="style-filter-label"
                  label="Style"
                  value={filters.travelStyle ?? ''}
                  onChange={(event) => {
                    setFilters({
                      travelStyle: event.target.value
                        ? (event.target.value as TravelStyle)
                        : undefined,
                    });
                  }}
                >
                  <MenuItem value="">Any style</MenuItem>
                  {travelStyles.map((travelStyle) => (
                    <MenuItem value={travelStyle} key={travelStyle}>
                      {travelStyle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="flex-start">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Search destinations
            </Button>
            <Button type="button" variant="outlined" onClick={onReset} disabled={isSubmitting}>
              Reset filters
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DestinationFilters;
