import { Router } from 'express';
import { swapiService } from '../services/swapiService';

const router: Router = Router();

router.get('/spending', async (req, res) => {
  try {
    const spendingData = await swapiService.getSpendingData();
    if (!spendingData) {
      return res.status(500).json({ error: 'No spending data received' });
    }
    res.json(spendingData);
  } catch (error) {
    console.error('Error in /spending route:', error);
    res.status(500).json({ 
      error: 'Failed to fetch spending data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/films', async (req, res) => {
  try {
    const films = await swapiService.getFilms();
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch films' });
  }
});

export default router; 