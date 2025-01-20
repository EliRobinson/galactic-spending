export interface Starship {
  name: string;
  model: string;
  cost_in_credits: string;
  manufacturer: string;
  films: string[];
}

export interface Film {
  title: string;
  episode_id: number;
  release_date: string;
  url: string;
  starships: string[];
}

export interface SpendingData {
  episode: number;
  title: string;
  totalSpending: number;
  starships: Array<{
    name: string;
    cost: number;
  }>;
} 