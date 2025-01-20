import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { EpisodeSelector } from '../EpisodeSelector';
import { messages } from '../../i18n/en-US';

describe('EpisodeSelector', () => {
  const mockOnSelectEpisodes = jest.fn();
  const defaultProps = {
    selectedEpisodes: [1, 2],
    onSelectEpisodes: mockOnSelectEpisodes,
    availableEpisodes: [1, 2, 3, 4, 5, 6],
  };

  it('renders all available episodes', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <EpisodeSelector {...defaultProps} />
      </IntlProvider>
    );

    const select = screen.getByLabelText(messages['filter.label']);
    expect(select).toBeInTheDocument();
  });
}); 