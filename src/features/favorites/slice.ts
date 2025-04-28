import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FavoritesState } from './types';
import * as favoritesService from './services/favoritesService';
import { logout } from 'features/auth/slice';

export const initialState: FavoritesState = {
  favorites: [],
  selectedRecipeId: null,
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      return await favoritesService.fetchFavorites();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch favorite recipes');
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (recipeId: number, { rejectWithValue }) => {
    try {
      return await favoritesService.toggleFavorite(recipeId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to toggle favorite status');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setSelectedRecipeId: (state, action: PayloadAction<number>) => {
      state.selectedRecipeId = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          const recipe = state.favorites.find(r => r.id === action.payload.recipeId);
          if (recipe) {
            recipe.isFavorite = action.payload.isFavorite;
          }
        } else {
          state.favorites = state.favorites.filter(r => r.id !== action.payload.recipeId);
        }
      })
      .addCase(toggleFavorite.rejected, (state) => {
        state.error = "Failed to toggle favorite status";
      })
      .addCase(logout, (state) => {
        state.favorites = [];
        state.selectedRecipeId = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setSelectedRecipeId, setError } = favoritesSlice.actions;
export default favoritesSlice.reducer; 