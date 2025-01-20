import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ErrorMessage } from '../ErrorMessage';
import { messages } from '../../i18n/en-US';

describe('ErrorMessage', () => {
  it('displays the correct error message', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ErrorMessage messageId="error.api" />
      </IntlProvider>
    );
    
    expect(screen.getByText(messages['error.api'])).toBeInTheDocument();
  });
}); 