import {
  Alert,
  Box,
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
  Typography,
} from '@mui/material';
import { type FormEvent, useState } from 'react';
import FormSuccessMessage from '../components/FormSuccessMessage';
import PageContainer from '../components/PageContainer';
import SectionHeader from '../components/SectionHeader';
import { submitTripRequest } from '../services/tripRequestsApi';
import { useTravelStore } from '../store/travelStore';
import type { BudgetLevel, TravelStyle } from '../types/destination';
import type { CreateTripRequestPayload, TripRequest } from '../types/tripRequest';

type TripFormValues = {
  fullName: string;
  email: string;
  preferredDestination: string;
  travelMonth: string;
  travelers: string;
  budget: '' | BudgetLevel;
  travelStyle: '' | TravelStyle;
  notes: string;
};

type TripFormErrors = Partial<Record<keyof TripFormValues, string>>;

const initialFormValues: TripFormValues = {
  budget: '',
  email: '',
  fullName: '',
  notes: '',
  preferredDestination: '',
  travelMonth: '',
  travelers: '1',
  travelStyle: '',
};

const budgetLevels: BudgetLevel[] = ['Budget', 'Moderate', 'Premium'];
const travelStyles: TravelStyle[] = ['Adventure', 'Culture', 'Relaxation', 'Nature', 'Food'];

function validateForm(values: TripFormValues) {
  const errors: TripFormErrors = {};
  const travelers = Number(values.travelers);

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.preferredDestination.trim()) {
    errors.preferredDestination = 'Preferred destination is required.';
  }

  if (!values.travelMonth) {
    errors.travelMonth = 'Travel month is required.';
  }

  if (!Number.isFinite(travelers) || travelers < 1) {
    errors.travelers = 'Travelers must be at least 1.';
  }

  if (!values.budget) {
    errors.budget = 'Budget is required.';
  }

  if (!values.travelStyle) {
    errors.travelStyle = 'Travel style is required.';
  }

  return errors;
}

function toPayload(values: TripFormValues): CreateTripRequestPayload {
  return {
    budget: values.budget as BudgetLevel,
    email: values.email.trim(),
    fullName: values.fullName.trim(),
    notes: values.notes.trim() || undefined,
    preferredDestination: values.preferredDestination.trim(),
    travelMonth: values.travelMonth,
    travelers: Number(values.travelers),
    travelStyle: values.travelStyle as TravelStyle,
  };
}

function PlanTripPage() {
  const addTripRequest = useTravelStore((state) => state.addTripRequest);
  const tripRequestCount = useTravelStore((state) => state.tripRequests.length);
  const [formValues, setFormValues] = useState<TripFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<TripFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdRequest, setCreatedRequest] = useState<TripRequest | null>(null);

  const updateField = (field: keyof TripFormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);
    setSubmitError(null);
    setCreatedRequest(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const request = await submitTripRequest(toPayload(formValues));
      addTripRequest(request);
      setCreatedRequest(request);
      setFormValues(initialFormValues);
    } catch {
      setSubmitError('We could not submit your trip request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Plan a Trip"
        title="Tell us about your dream trip"
        description="Share your travel preferences and TripWise will save your planning request through the mock API."
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 4 }, '&:last-child': { pb: { xs: 3, md: 4 } } }}>
              <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
                {createdRequest ? <FormSuccessMessage requestId={createdRequest.id} /> : null}
                {submitError ? <Alert severity="error">{submitError}</Alert> : null}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Full name"
                      value={formValues.fullName}
                      error={Boolean(formErrors.fullName)}
                      helperText={formErrors.fullName}
                      onChange={(event) => {
                        updateField('fullName', event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      type="email"
                      value={formValues.email}
                      error={Boolean(formErrors.email)}
                      helperText={formErrors.email}
                      onChange={(event) => {
                        updateField('email', event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Preferred destination"
                      placeholder="Kyoto, Bali, Patagonia..."
                      value={formValues.preferredDestination}
                      error={Boolean(formErrors.preferredDestination)}
                      helperText={formErrors.preferredDestination}
                      onChange={(event) => {
                        updateField('preferredDestination', event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Travel month"
                      type="month"
                      value={formValues.travelMonth}
                      error={Boolean(formErrors.travelMonth)}
                      helperText={formErrors.travelMonth}
                      InputLabelProps={{ shrink: true }}
                      onChange={(event) => {
                        updateField('travelMonth', event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      required
                      label="Travelers"
                      type="number"
                      value={formValues.travelers}
                      error={Boolean(formErrors.travelers)}
                      helperText={formErrors.travelers}
                      inputProps={{ min: 1 }}
                      onChange={(event) => {
                        updateField('travelers', event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required error={Boolean(formErrors.budget)}>
                      <InputLabel id="trip-budget-label">Budget</InputLabel>
                      <Select
                        labelId="trip-budget-label"
                        label="Budget"
                        value={formValues.budget}
                        onChange={(event) => {
                          updateField('budget', event.target.value);
                        }}
                      >
                        {budgetLevels.map((budgetLevel) => (
                          <MenuItem value={budgetLevel} key={budgetLevel}>
                            {budgetLevel}
                          </MenuItem>
                        ))}
                      </Select>
                      {formErrors.budget ? (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                          {formErrors.budget}
                        </Typography>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required error={Boolean(formErrors.travelStyle)}>
                      <InputLabel id="trip-style-label">Travel style</InputLabel>
                      <Select
                        labelId="trip-style-label"
                        label="Travel style"
                        value={formValues.travelStyle}
                        onChange={(event) => {
                          updateField('travelStyle', event.target.value);
                        }}
                      >
                        {travelStyles.map((travelStyle) => (
                          <MenuItem value={travelStyle} key={travelStyle}>
                            {travelStyle}
                          </MenuItem>
                        ))}
                      </Select>
                      {formErrors.travelStyle ? (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                          {formErrors.travelStyle}
                        </Typography>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Notes"
                      placeholder="Tell us about pace, interests, must-see places, or accessibility needs."
                      value={formValues.notes}
                      onChange={(event) => {
                        updateField('notes', event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="flex-start">
                  <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit trip request'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    disabled={isSubmitting}
                    onClick={() => {
                      setFormValues(initialFormValues);
                      setFormErrors({});
                      setSubmitError(null);
                    }}
                  >
                    Clear form
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Stack spacing={2}>
                <Typography component="h2" variant="h5">
                  Saved requests
                </Typography>
                <Typography color="text.secondary">
                  Submitted requests are stored in Zustand and persisted to localStorage for this browser.
                </Typography>
                <Box
                  sx={{
                    bgcolor: 'rgba(15, 118, 110, 0.08)',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Requests saved
                  </Typography>
                  <Typography variant="h3">{tripRequestCount}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default PlanTripPage;
