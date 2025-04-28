import { Recipe } from '../../recipes/types';
import axiosInstance from '../../../services/axios';
import { ToggleFavoriteResponse } from '../types';

const API_BASE_URL = process.env['REACT_APP_API_BASE_URL'];

export const fetchFavorites = async (): Promise<Recipe[]> => {
  const response = await axiosInstance.get(`${API_BASE_URL}/favourite/get`);
  return response.data.favorites;
};

export const toggleFavorite = async (recipeId: number): Promise<ToggleFavoriteResponse> => {
  const response = await axiosInstance.post(`${API_BASE_URL}/favourite/toggle/${recipeId}`);
  return response.data;
};
