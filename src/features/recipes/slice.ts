import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RecipeState, RecipeFilters } from './types';
import * as recipeService from './services/recipeService';
import { toggleFavorite } from '../favorites/slice';
import { logout } from 'features/auth/slice';

export const initialState: RecipeState = {
  recipes: [],
  selectedRecipeId: null,
  categories: [],
  filters: {
    ingredients: [],
    mealType: 'All',
    totalTime: 0,
  },
  isLoading: false,
  error: null,
};

export const predictRecipes = createAsyncThunk(
  'recipes/predict',
  async (filters: RecipeFilters, { rejectWithValue }) => {
    try {
      const recipes = await recipeService.predictRecipes(filters);
      if (!recipes || recipes.length === 0) {
        return rejectWithValue('No recipes found matching your criteria');
      }
      return recipes;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to predict recipes');
    }
  }
);

export const fetchUserInitData = createAsyncThunk(
  'recipes/fetchUserInitData',
  async (_, { rejectWithValue }) => {
    try {
      return await recipeService.fetchCategories();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSelectedRecipeId: (state, action) => {
      state.selectedRecipeId = action.payload;
    },
    setIngredients: (state, action: PayloadAction<string[]>) => {
      state.filters.ingredients = action.payload;
    },
    setMealType: (state, action: PayloadAction<string>) => {
      state.filters.mealType = action.payload;
    },
    setTotalTime: (state, action: PayloadAction<number>) => {
      state.filters.totalTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(predictRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(predictRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
      })
      .addCase(predictRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.recipes = [];
      })
      .addCase(fetchUserInitData.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const recipe = state.recipes.find(r => r.id === action.payload.recipeId);
        if (recipe) {
          recipe.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(logout, (state) => {
        state.recipes = [];
        state.selectedRecipeId = null;
        state.isLoading = false;
        state.error = null;
        state.filters = {
          ingredients: [],
          mealType: 'All',
          totalTime: 0,
        };
      });
  },
});

export const { setSelectedRecipeId, setIngredients, setMealType, setTotalTime } = recipeSlice.actions;
export default recipeSlice.reducer; 