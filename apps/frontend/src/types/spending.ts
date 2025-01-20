export interface Starship {
  name: string;
  cost: number;
}

export interface SpendingData {
  episode: number;
  title: string;
  totalSpending: number;
  starships: Starship[];
} 