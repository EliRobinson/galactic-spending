import axios from 'axios';
import { SpendingData } from '../types/spending';

const api = axios.create({
  baseURL: '/api'
});

export const getSpendingData = async (): Promise<SpendingData[]> => {
  const { data } = await api.get<SpendingData[]>('/spending');
  return data;
};

export const getFilms = async () => {
  const { data } = await api.get('/films');
  return data;
}; 