import request from 'supertest';
import express from 'express';
import spendingRoutes from '../routes/spendingRoutes';
import { swapiService } from '../services/swapiService';
import { SpendingData, Film } from '../types/starship';

const app = express();
app.use(express.json());
app.use(spendingRoutes);

describe('Spending Routes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('GET /spending', () => {
    it('should return spending data', async () => {
      const mockSpendingData: SpendingData[] = [{
        episode: 4,
        title: 'A New Hope',
        totalSpending: 149999,
        starships: [{ name: 'X-wing', cost: 149999 }]
      }];

      jest.spyOn(swapiService, 'getSpendingData').mockResolvedValueOnce(mockSpendingData);

      const response = await request(app).get('/spending');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSpendingData);
    });

    it('should handle errors', async () => {
      jest.spyOn(swapiService, 'getSpendingData').mockRejectedValueOnce(new Error('Service error'));

      const response = await request(app).get('/spending');
      
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to fetch spending data');
    });
  });

  describe('GET /films', () => {
    it('should return films data', async () => {
      const mockFilms: Film[] = [{
        episode_id: 4,
        title: 'A New Hope',
        url: 'http://example.com/films/1',
        starships: [],
        release_date: '1977-05-25'
      }];

      jest.spyOn(swapiService, 'getFilms').mockResolvedValueOnce(mockFilms);

      const response = await request(app).get('/films');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFilms);
    });

    it('should handle errors', async () => {
      jest.spyOn(swapiService, 'getFilms').mockRejectedValueOnce(new Error('Service error'));

      const response = await request(app).get('/films');
      
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to fetch films');
    });
  });
}); 