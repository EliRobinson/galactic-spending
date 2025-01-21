import { swapiService } from '../services/swapiService';
import axios from 'axios';
import { Film, Starship, SpendingData } from '../types/starship';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SWAPIService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getFilms', () => {
    it('should fetch and return films sorted by episode_id', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          results: [
            { 
              episode_id: 4, 
              title: 'A New Hope', 
              url: 'http://example.com/films/1',
              release_date: '1977-05-25'
            },
            { 
              episode_id: 5, 
              title: 'Empire Strikes Back', 
              url: 'http://example.com/films/2',
              release_date: '1980-05-21'
            },
            { 
              episode_id: 6, 
              title: 'Return of the Jedi', 
              url: 'http://example.com/films/3',
              release_date: '1983-05-25'
            },
          ],
          next: null
        }
      });

      const films = await swapiService.getFilms();
      
      expect(films).toHaveLength(3);
      expect(films[0].episode_id).toBe(4);
      expect(films[2].episode_id).toBe(6);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should handle pagination when fetching films', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({
          data: {
            results: [{ 
              episode_id: 1, 
              title: 'Phantom Menace',
              release_date: '1999-05-19'
            }],
            next: 'http://example.com/films/?page=2'
          }
        })
        .mockResolvedValueOnce({
          data: {
            results: [{ 
              episode_id: 2, 
              title: 'Attack of the Clones',
              release_date: '2002-05-16'
            }],
            next: null
          }
        });

      const films = await swapiService.getFilms();
      
      expect(films).toHaveLength(2);
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it('should handle API errors gracefully', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(swapiService.getFilms()).rejects.toThrow('Failed to fetch films data');
    });
  });

  describe('getStarshipsForFilm', () => {
    it('should fetch starships for a given film', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          starships: [
            'http://example.com/starships/1',
            'http://example.com/starships/2'
          ]
        }
      });

      mockedAxios.get
        .mockResolvedValueOnce({
          data: { name: 'X-wing', cost_in_credits: '149999' }
        })
        .mockResolvedValueOnce({
          data: { name: 'TIE Fighter', cost_in_credits: '199999' }
        });

      const starships = await swapiService.getStarshipsForFilm('http://example.com/films/1');
      
      expect(starships).toHaveLength(2);
      expect(starships[0].name).toBe('X-wing');
      expect(starships[1].name).toBe('TIE Fighter');
    });

    it('should handle films with no starships', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          starships: []
        }
      });

      const starships = await swapiService.getStarshipsForFilm('http://example.com/films/1');
      expect(starships).toHaveLength(0);
    });

    it('should handle API errors when fetching starships', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(swapiService.getStarshipsForFilm('http://example.com/films/1'))
        .rejects.toThrow('Failed to fetch starships data');
    });
  });

  describe('getSpendingData', () => {
    it('should calculate correct spending data for films', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          results: [
            { 
              episode_id: 4, 
              title: 'A New Hope',
              url: 'http://example.com/films/1',
              starships: ['http://example.com/starships/1'],
              release_date: '1977-05-25'
            }
          ],
          next: null
        }
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          starships: ['http://example.com/starships/1']
        }
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          name: 'X-wing',
          cost_in_credits: '149999'
        }
      });

      const spendingData = await swapiService.getSpendingData();
      
      expect(spendingData).toHaveLength(1);
      expect(spendingData[0].totalSpending).toBe(149999);
      expect(spendingData[0].starships).toHaveLength(1);
      expect(spendingData[0].starships[0].name).toBe('X-wing');
    });

    it('should handle starships with unknown costs', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          results: [
            { 
              episode_id: 4, 
              title: 'A New Hope',
              url: 'http://example.com/films/1',
              starships: ['http://example.com/starships/1', 'http://example.com/starships/2'],
              release_date: '1977-05-25'
            }
          ],
          next: null
        }
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          starships: ['http://example.com/starships/1', 'http://example.com/starships/2']
        }
      });

      mockedAxios.get
        .mockResolvedValueOnce({
          data: {
            name: 'X-wing',
            cost_in_credits: '149999'
          }
        })
        .mockResolvedValueOnce({
          data: {
            name: 'Death Star',
            cost_in_credits: 'unknown'
          }
        });

      const spendingData = await swapiService.getSpendingData();
      
      expect(spendingData[0].totalSpending).toBe(149999);
      expect(spendingData[0].starships).toHaveLength(1);
    });

    it('should handle API errors in spending calculation', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(swapiService.getSpendingData())
        .rejects.toThrow('Failed to calculate spending data');
    });
  });
}); 