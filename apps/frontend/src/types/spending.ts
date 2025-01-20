export interface Starship {
  name: string;
  cost: number;
}

export interface SpendingData {
  episode: number;
  totalSpending: number;
  starships: {
    name: string;
    cost: number;
  }[];
} 