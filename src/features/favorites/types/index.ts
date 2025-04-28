import { Recipe } from '../../recipes/types';

export interface FavoritesState {
  favorites: Recipe[];
  selectedRecipeId: number | null;
  loading: boolean;
  error: string | null;
}

export interface ToggleFavoriteResponse {
  message: string;
  isFavorite: boolean;
  recipeId: number;
}
