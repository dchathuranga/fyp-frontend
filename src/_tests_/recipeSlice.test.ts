import recipeReducer, { initialState, predictRecipes, fetchUserInitData } from '../features/recipes/slice';
import { UnknownAction } from '@reduxjs/toolkit';

describe('recipeSlice reducer', () => {
  it('should return the initial state', () => {
    expect(recipeReducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  it('should handle pending predictRecipes', () => {
    const action = { type: predictRecipes.pending.type };
    const state = recipeReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fulfilled predictRecipes', () => {
    const mockRecipes = [{ id: 1, recipe_name: 'Mock Recipe' }];
    const action = { type: predictRecipes.fulfilled.type, payload: mockRecipes };
    const state = recipeReducer(initialState, action);
    expect(state.recipes).toEqual(mockRecipes);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle rejected predictRecipes', () => {
    const errorMessage = 'Failed to fetch recipe predictions';
    const action = { type: predictRecipes.rejected.type, payload: errorMessage };
    const state = recipeReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle fetchUserInitData fulfilled', () => {
    const mockCategories = ['Breakfast', 'Lunch', 'Dinner'];
    const action = { type: fetchUserInitData.fulfilled.type, payload: { categories: mockCategories } };
    const state = recipeReducer(initialState, action);
    expect(state.categories).toEqual(mockCategories);
  });

  it('should maintain other state properties when updating recipes', () => {
    const mockCategories = ['Breakfast', 'Lunch'];
    const stateWithCategories = recipeReducer(initialState, {
      type: fetchUserInitData.fulfilled.type,
      payload: { categories: mockCategories }
    });

    const mockRecipes = [{ id: 1, recipe_name: 'Mock Recipe' }];
    const state = recipeReducer(stateWithCategories, {
      type: predictRecipes.fulfilled.type,
      payload: mockRecipes
    });

    expect(state.recipes).toEqual(mockRecipes);
    expect(state.categories).toEqual(mockCategories);
  });

  it('should handle multiple state transitions correctly', () => {
    let state = recipeReducer(initialState, { type: predictRecipes.pending.type });
    expect(state.isLoading).toBe(true);

    state = recipeReducer(state, {
      type: predictRecipes.fulfilled.type,
      payload: [{ id: 1, recipe_name: 'Mock Recipe' }]
    });
    expect(state.isLoading).toBe(false);
    expect(state.recipes).toHaveLength(1);
  });
});
