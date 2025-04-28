import favoritesReducer, { fetchFavorites, toggleFavorite, setError, setSelectedRecipeId } from '../features/favorites/slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { Recipe } from '../features/recipes/types';
import { FavoritesState } from 'features/favorites/types';

const initialState = {
  favorites: [],
  selectedRecipeId: null,
  loading: false,
  error: null,
};

const mockRecipe: Recipe = {
  id: 1,
  recipe_name: 'Test Recipe',
  cuisine_path: 'test-cuisine',
  total_time: '30 mins',
  total_time_mins: 30,
  prep_time: '10 mins',
  cook_time: '20 mins',
  timing: '30 mins',
  servings: 4,
  rating: 4.5,
  ingredients: 'test ingredients',
  cleaned_ingredients: 'test cleaned ingredients',
  nutrition: 'test nutrition',
  directions: 'test directions',
  img_src: 'test.jpg',
  category: 'test category',
  main_category: 'test main category',
  isFavorite: false,
};

describe('favoritesSlice reducer', () => {
  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  it('should handle fetchFavorites pending', () => {
    const action = { type: fetchFavorites.pending.type };
    const state = favoritesReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFavorites fulfilled', () => {
    const mockFavorites = [mockRecipe];
    const action = { type: fetchFavorites.fulfilled.type, payload: mockFavorites };
    const state = favoritesReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.favorites).toEqual(mockFavorites);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFavorites rejected', () => {
    const errorMessage = 'Failed to fetch favorites';
    const action = { type: fetchFavorites.rejected.type, payload: errorMessage };
    const state = favoritesReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle toggleFavorite fulfilled', () => {
    const initialState: FavoritesState = {
      favorites: [
        mockRecipe
      ],
      selectedRecipeId: null,
      loading: false,
      error: null
    };
    const mockResponse = {
      message: 'Recipe added to favorites',
      isFavorite: true,
      recipeId: 1
    };
    const action = { type: toggleFavorite.fulfilled.type, payload: mockResponse };
    const updatedState = favoritesReducer(initialState, action)
    expect(updatedState.favorites.find(r => r.id === 1)?.isFavorite).toBe(true);
  });

  it('should handle toggleFavorite rejected', () => {
    const action = { type: toggleFavorite.rejected.type };
    const state = favoritesReducer(initialState, action);

    expect(state.error).toBe('Failed to toggle favorite status');
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    const state = favoritesReducer(initialState, setError(errorMessage));
    expect(state.error).toBe(errorMessage);
  });

  it('should handle setSelectedRecipeId', () => {
    const recipeId = 1;
    const state = favoritesReducer(initialState, setSelectedRecipeId(recipeId));
    expect(state.selectedRecipeId).toBe(recipeId);
  });

  it('should handle toggleFavorite with non-existent recipe ID', () => {
    const mockResponse = {
      message: 'Recipe added to favorites',
      isFavorite: true,
      recipeId: 999
    };
    const action = { type: toggleFavorite.fulfilled.type, payload: mockResponse };
    const state = favoritesReducer(initialState, action);
    expect(state.favorites).toEqual([]);
  });

  it('should handle multiple state transitions correctly', () => {
    // pending
    let state = favoritesReducer(initialState, { type: fetchFavorites.pending.type });
    expect(state.loading).toBe(true);

    // fulfill
    const mockFavorites = [mockRecipe];
    state = favoritesReducer(state, {
      type: fetchFavorites.fulfilled.type,
      payload: mockFavorites
    });
    expect(state.loading).toBe(false);
    expect(state.favorites).toEqual(mockFavorites);

    // toggle a favorite
    const mockResponse = {
      message: 'Recipe added to favorites',
      isFavorite: true,
      recipeId: 1
    };
    state = favoritesReducer(state, {
      type: toggleFavorite.fulfilled.type,
      payload: mockResponse
    });
    expect(state.favorites.find(r => r.id === 1)?.isFavorite).toBe(true);
  });
}); 