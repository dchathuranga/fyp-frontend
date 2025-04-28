export interface Recipe {
  id: number;
  recipe_name: string;
  cuisine_path: string;
  total_time: string;
  total_time_mins: number;
  prep_time: string;
  cook_time: string;
  timing: string;
  servings: number;
  rating: number;
  ingredients: string;
  cleaned_ingredients: string;
  nutrition: string;
  directions: string;
  img_src: string;
  category: string;
  main_category: string;
  isFavorite: boolean;
}

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipeId: number | null;
  categories: string[];
  filters: RecipeFilters;
  isLoading: boolean;
  error: string | null;
}

export interface RecipeFilters {
  ingredients: string[];
  mealType: string | null;
  totalTime: number | null;
}
