import { useQuery } from '@tanstack/react-query';
import * as api from '../services/api';

export const useSpendingData = () => {
  return useQuery({
    queryKey: ['spending'],
    queryFn: api.getSpendingData,
  });
};

export const useFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: api.getFilms,
  });
}; 