import axios from 'axios';
import { Recipe, RecipeFilters } from '../types';
import axiosInstance from '../../../services/axios';

const API_BASE_URL = process.env['REACT_APP_API_BASE_URL'];

export const predictRecipes = async (filters: RecipeFilters): Promise<Recipe[]> => {
  const response = await axiosInstance.post(`${API_BASE_URL}/recipe/predict`, {
    ingredients: filters.ingredients,
    top_n: 25,
    mealType: filters?.mealType,
    totalTime: filters?.totalTime,
  });
  return response.data.predictions;
};

export const fetchCategories = async (): Promise<{ categories: string[] }> => {
  const response = await axios.get(`${API_BASE_URL}/recipe/categories`);
  return response.data;
};
