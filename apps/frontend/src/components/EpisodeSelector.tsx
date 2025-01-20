import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useIntl } from 'react-intl';

interface EpisodeSelectorProps {
  selectedEpisodes: number[];
  onSelectEpisodes: (episodes: number[]) => void;
  availableEpisodes: number[];
}

export const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  selectedEpisodes,
  onSelectEpisodes,
  availableEpisodes,
}) => {
  const intl = useIntl();

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    onSelectEpisodes(value);
  };

  return (
    <FormControl className="w-full md:w-1/2 mb-4">
      <InputLabel id="episode-selector-label">
        {intl.formatMessage({ id: 'filter.label' })}
      </InputLabel>
      <Select
        labelId="episode-selector-label"
        multiple
        value={selectedEpisodes}
        onChange={handleChange}
        label={intl.formatMessage({ id: 'filter.label' })}
      >
        {availableEpisodes.map((episode) => (
          <MenuItem key={episode} value={episode}>
            Episode {episode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}; 