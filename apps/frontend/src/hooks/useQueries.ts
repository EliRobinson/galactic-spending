import { useQuery } from '@tanstack/react-query';
import * as api from '../services/api';
import { SpendingData } from "../types/spending";

export const useSpendingData = () => {
  return useQuery<SpendingData[]>({
    queryKey: ["spending"],
    queryFn: async () => {
      const response = await fetch("/api/spending");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export const useFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: api.getFilms,
  });
}; 