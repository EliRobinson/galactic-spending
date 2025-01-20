import { useState, useEffect } from "react";
import { SpendingGraph } from "../components/SpendingGraph";
import { EpisodeSelector } from "../components/EpisodeSelector";
import { getSpendingData } from "../services/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { SpendingData } from "../types/spending";

export default function Home() {
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [selectedEpisodes, setSelectedEpisodes] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpendingData();
        setSpendingData(data);
        setLoading(false);
      } catch (err) {
        setError("error.api");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage messageId={error} />;
  }

  return (
    <>
      <EpisodeSelector
        selectedEpisodes={selectedEpisodes}
        onSelectEpisodes={setSelectedEpisodes}
        availableEpisodes={[1, 2, 3, 4, 5, 6]}
      />

      <SpendingGraph data={spendingData} selectedEpisodes={selectedEpisodes} />
    </>
  );
}
