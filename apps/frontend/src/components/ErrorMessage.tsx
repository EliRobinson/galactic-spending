import { Alert } from '@mui/material';
import { useIntl } from 'react-intl';

interface ErrorMessageProps {
  messageId: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ messageId }) => {
  const intl = useIntl();

  return (
    <div className="p-4">
      <Alert severity="error">
        {intl.formatMessage({ id: messageId })}
      </Alert>
    </div>
  );
}; 