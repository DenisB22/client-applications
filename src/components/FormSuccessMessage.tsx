import { Alert, AlertTitle } from '@mui/material';

type FormSuccessMessageProps = {
  requestId: string;
};

function FormSuccessMessage({ requestId }: FormSuccessMessageProps) {
  return (
    <Alert severity="success">
      <AlertTitle>Trip request submitted</AlertTitle>
      Your request was saved successfully. Reference: {requestId}
    </Alert>
  );
}

export default FormSuccessMessage;
