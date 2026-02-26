import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isFocusMode: boolean;
  currentStepIndex: number;
  showFlavorMap: boolean;
  selectedContinent: string | null;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  isFocusMode: false,
  currentStepIndex: 0,
  showFlavorMap: false,
  selectedContinent: null,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleFocusMode: (state) => {
      state.isFocusMode = !state.isFocusMode;
    },
    setFocusMode: (state, action: PayloadAction<boolean>) => {
      state.isFocusMode = action.payload;
    },
    nextStep: (state) => {
      state.currentStepIndex += 1;
    },
    previousStep: (state) => {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex -= 1;
      }
    },
    setCurrentStepIndex: (state, action: PayloadAction<number>) => {
      state.currentStepIndex = action.payload;
    },
    toggleFlavorMap: (state) => {
      state.showFlavorMap = !state.showFlavorMap;
    },
    setSelectedContinent: (state, action: PayloadAction<string | null>) => {
      state.selectedContinent = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {
  toggleFocusMode,
  setFocusMode,
  nextStep,
  previousStep,
  setCurrentStepIndex,
  toggleFlavorMap,
  setSelectedContinent,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
