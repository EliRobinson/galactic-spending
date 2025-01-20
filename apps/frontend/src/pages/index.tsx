import { useState, useEffect } from "react";
import { SpendingGraph } from "../components/SpendingGraph";
import { EpisodeSelector } from "../components/EpisodeSelector";

const DEFAULT_SELECTED_EPISODES = [1, 2, 3, 4, 5, 6];

export default function Home() {
  const [selectedEpisodes, setSelectedEpisodes] = useState(
    DEFAULT_SELECTED_EPISODES
  );

  return (
    <>
      <EpisodeSelector
        selectedEpisodes={selectedEpisodes}
        onSelectEpisodes={setSelectedEpisodes}
        availableEpisodes={DEFAULT_SELECTED_EPISODES}
      />

      <SpendingGraph selectedEpisodes={selectedEpisodes} />
    </>
  );
}
