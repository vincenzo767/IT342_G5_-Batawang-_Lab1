import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, ScaledRecipe, Country } from '../types';

interface RecipeState {
  selectedRecipe: Recipe | null;
  scaledRecipe: ScaledRecipe | null;
  recipes: Recipe[];
  countries: Country[];
  selectedCountry: Country | null;
  servings: number;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  selectedRecipe: null,
  scaledRecipe: null,
  recipes: [],
  countries: [],
  selectedCountry: null,
  servings: 4,
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
      if (action.payload) {
        state.servings = action.payload.defaultServings;
      }
    },
    setScaledRecipe: (state, action: PayloadAction<ScaledRecipe | null>) => {
      state.scaledRecipe = action.payload;
    },
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<Country | null>) => {
      state.selectedCountry = action.payload;
    },
    setServings: (state, action: PayloadAction<number>) => {
      state.servings = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedRecipe,
  setScaledRecipe,
  setRecipes,
  setCountries,
  setSelectedCountry,
  setServings,
  setLoading,
  setError,
} = recipeSlice.actions;

export default recipeSlice.reducer;
