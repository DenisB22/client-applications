import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Destination } from '../types/destination';

type DestinationCardProps = {
  destination: Destination;
};

function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="210"
        image={destination.imageUrl}
        alt={`${destination.name}, ${destination.country}`}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 2, p: 3 }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={destination.region} color="primary" variant="outlined" size="small" />
            <Chip label={destination.budgetLevel} color="secondary" variant="outlined" size="small" />
            <Chip label={destination.travelStyle} variant="outlined" size="small" />
          </Stack>

          <Box>
            <Typography component="h2" variant="h5">
              {destination.name}
            </Typography>
            <Typography color="text.secondary">{destination.country}</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Rating value={destination.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {destination.rating.toFixed(1)}
          </Typography>
        </Stack>

        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {destination.description}
        </Typography>

        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            Best season: {destination.bestSeason}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suggested stay: {destination.averageDays} days
          </Typography>
        </Stack>

        <Button
          component={RouterLink}
          to={`/destinations/${destination.id}`}
          variant="contained"
          sx={{ alignSelf: 'flex-start', mt: 1 }}
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
}

export default DestinationCard;
