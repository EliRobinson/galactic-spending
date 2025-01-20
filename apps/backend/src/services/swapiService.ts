import axios from 'axios';
import { Film, Starship, SpendingData } from '../types/starship';

interface SWAPIResponse<T> {
  results: T[];
  next: string | null;
}

class SWAPIService {
  private baseURL = 'https://swapi.dev/api';

  private async fetchAllPages<T>(url: string): Promise<T[]> {
    let results: T[] = [];
    let nextUrl: string | null = url;

    while (nextUrl) {
      const response: { data: SWAPIResponse<T> } = await axios.get<SWAPIResponse<T>>(nextUrl);
      results = [...results, ...response.data.results];
      nextUrl = response.data.next;
    }

    return results;
  }

  async getFilms(): Promise<Film[]> {
    try {
      const films = await this.fetchAllPages<Film>(`${this.baseURL}/films/`);
      return films.filter(film => film.episode_id <= 6)
                 .sort((a, b) => a.episode_id - b.episode_id);
    } catch (error) {
      console.error('Error fetching films:', error);
      throw new Error('Failed to fetch films data');
    }
  }

  async getStarshipsForFilm(filmUrl: string): Promise<Starship[]> {
    try {
      const { data: film } = await axios.get<Film>(filmUrl);
      if (!film.starships || !Array.isArray(film.starships)) {
        return [];
      }
      
      const starships = await Promise.all(
        film.starships.map(async (starshipUrl: string) => {
          const response = await axios.get<Starship>(starshipUrl);
          return response.data;
        })
      );
      return starships;
    } catch (error) {
      console.error('Error fetching starships:', error);
      throw new Error('Failed to fetch starships data');
    }
  }

  async getSpendingData(): Promise<SpendingData[]> {
    try {
      const films = await this.getFilms();
      const spendingData: SpendingData[] = await Promise.all(
        films.map(async film => {
          const starships = await this.getStarshipsForFilm(film.url);
          const validStarships = starships.filter(
            ship => ship.cost_in_credits !== 'unknown'
          );

          const totalSpending = validStarships.reduce(
            (sum, ship) => sum + parseInt(ship.cost_in_credits, 10),
            0
          );

          return {
            episode: film.episode_id,
            title: film.title,
            totalSpending,
            starships: validStarships.map(ship => ({
              name: ship.name,
              cost: parseInt(ship.cost_in_credits, 10)
            }))
          };
        })
      );

      return spendingData.sort((a, b) => a.episode - b.episode);
    } catch (error) {
      console.error('Error calculating spending data:', error);
      throw new Error('Failed to calculate spending data');
    }
  }
}

export const swapiService = new SWAPIService(); 