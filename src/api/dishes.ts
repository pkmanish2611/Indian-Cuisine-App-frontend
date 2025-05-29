import axios from 'axios';
import { Dish, PaginatedResponse, DishSuggestionRequest } from './types';
import { getAuthToken } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance without global auth interceptor
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDishes = async (params: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}): Promise<PaginatedResponse<Dish>> => {
  const response = await api.get('/dishes', { params });
  return response.data;
};

export const getDishByName = async (name: string): Promise<Dish> => {
  const response = await api.get(`/dishes/${encodeURIComponent(name)}`);
  return response.data.data;
};

export const searchDishes = async (query: string): Promise<Dish[]> => {
  const response = await api.get('/dishes/search', { params: { q: query } });
  return response.data.data;
};

export const getDishSuggestions = async (
  ingredients: DishSuggestionRequest
): Promise<Dish[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await api.post('/dishes/suggestions/ingredients', ingredients, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};