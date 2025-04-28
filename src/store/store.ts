import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import recipeReducer from '../features/recipes/slice';
import favoritesReducer from '../features/favorites/slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 