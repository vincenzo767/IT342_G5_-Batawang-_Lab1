import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import timerReducer from './timerSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    timers: timerReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
