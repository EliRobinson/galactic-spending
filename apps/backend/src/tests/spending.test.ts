import request from 'supertest';
import app from '../index';

describe('Spending API', () => {
  it('should return spending data', async () => {
    const response = await request(app).get('/api/spending');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return films data', async () => {
    const response = await request(app).get('/api/films');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
}); 