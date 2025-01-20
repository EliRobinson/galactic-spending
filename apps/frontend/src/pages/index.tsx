import { useState, useEffect } from 'react';
import { useTheme as useMuiTheme, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IntlProvider } from 'react-intl';
import { SpendingGraph } from '../components/SpendingGraph';
import { EpisodeSelector } from '../components/EpisodeSelector';
import { getSpendingData } from '../services/api';
import { lightTheme, darkTheme } from '../theme/theme';
import { messages as enMessages } from '../i18n/en-US';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [spendingData, setSpendingData] = useState([]);
  const [selectedEpisodes, setSelectedEpisodes] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpendingData();
        setSpendingData(data);
        setLoading(false);
      } catch (err) {
        setError('error.api');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage messageId={error} />;
  }

  return (
    <IntlProvider messages={enMessages} locale="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="min-h-screen p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {intl.formatMessage({ id: 'app.title' })}
            </h1>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
          
          <EpisodeSelector
            selectedEpisodes={selectedEpisodes}
            onSelectEpisodes={setSelectedEpisodes}
            availableEpisodes={[1, 2, 3, 4, 5, 6]}
          />
          
          <SpendingGraph
            data={spendingData}
            selectedEpisodes={selectedEpisodes}
          />
        </div>
      </ThemeProvider>
    </IntlProvider>
  );
} 