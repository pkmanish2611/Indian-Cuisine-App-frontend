export interface Dish {
  name: string;
  ingredients: string;
  diet: 'vegetarian' | 'non vegetarian';
  prep_time: number;
  cook_time: number;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
}

export interface Ingredients{
  success: boolean;
  count: number;
  data: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
  data: T[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DishSuggestionRequest {
  ingredients: string[];
}

export interface User {
  username: string;
  token: string;
}