import apiClient from '../services/apiClient';
import { Country, Recipe, ScaledRecipe, TimerOrchestration } from '../types';

// Country APIs
export const countryApi = {
  getAll: () => apiClient.get<Country[]>('/countries'),
  getById: (id: number) => apiClient.get<Country>(`/countries/${id}`),
  getByCode: (code: string) => apiClient.get<Country>(`/countries/code/${code}`),
  getByContinent: (continent: string) => apiClient.get<Country[]>(`/countries/continent/${continent}`),
  getGroupedByContinent: () => apiClient.get<Record<string, Country[]>>('/countries/continents'),
};

// Recipe APIs
export const recipeApi = {
  getAll: () => apiClient.get<Recipe[]>('/recipes'),
  getById: (id: number) => apiClient.get<Recipe>(`/recipes/${id}`),
  getByCountry: (countryId: number) => apiClient.get<Recipe[]>(`/recipes/country/${countryId}`),
  getByCountryCode: (code: string) => apiClient.get<Recipe[]>(`/recipes/country/code/${code}`),
  getByCategory: (categoryId: number) => apiClient.get<Recipe[]>(`/recipes/category/${categoryId}`),
  search: (keyword: string) => apiClient.get<Recipe[]>(`/recipes/search?keyword=${keyword}`),
  getScaled: (id: number, servings: number) => 
    apiClient.get<ScaledRecipe>(`/recipes/${id}/scale?servings=${servings}`),
  getTimerSequence: (id: number) => 
    apiClient.get<TimerOrchestration>(`/recipes/${id}/timer-sequence`),
};

// AI APIs
export const aiApi = {
  getSubstitutions: (ingredientName: string, userRegion: string, allergies: string[]) =>
    apiClient.post<string[]>('/ai/substitutions', { ingredientName, userRegion, allergies }),
  getPersonalizedTips: (recipeName: string, skillLevel: string, dietaryRestrictions: string[]) =>
    apiClient.post<string>('/ai/personalized-tips', { recipeName, skillLevel, dietaryRestrictions }),
  getCulturalContext: (dishName: string, countryCode: string) =>
    apiClient.get<string>(`/ai/cultural-context?dishName=${dishName}&countryCode=${countryCode}`),
};

export default apiClient;
