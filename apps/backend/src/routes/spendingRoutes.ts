import { Router } from 'express';
import { swapiService } from '../services/swapiService';

const router = Router();

router.get('/spending', async (req, res) => {
  try {
    const spendingData = await swapiService.getSpendingData();
    res.json(spendingData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spending data' });
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