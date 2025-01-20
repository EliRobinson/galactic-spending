import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { SpendingGraph } from '../SpendingGraph';
import { messages } from '../../i18n/en-US';

const mockData = [
  {
    episode: 1,
    title: 'Episode 1',
    totalSpending: 1000000,
    starships: []
  },
  {
    episode: 2,
    title: 'Episode 2',
    totalSpending: 2000000,
    starships: []
  }
];

describe('SpendingGraph', () => {
  it('renders without crashing', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <SpendingGraph data={mockData} selectedEpisodes={[1, 2]} />
      </IntlProvider>
    );
    
    expect(screen.getByRole('img', { name: /spending/i })).toBeInTheDocument();
  });
}); 