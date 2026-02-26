import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveTimer } from '../types';

interface TimerState {
  activeTimers: ActiveTimer[];
  sessionId: string;
  isConnected: boolean;
}

const initialState: TimerState = {
  activeTimers: [],
  sessionId: Math.random().toString(36).substring(2, 11),
  isConnected: false,
};

const timerSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    startTimer: (state, action: PayloadAction<ActiveTimer>) => {
      const existing = state.activeTimers.find(t => t.stepId === action.payload.stepId);
      if (!existing) {
        state.activeTimers.push(action.payload);
      }
    },
    pauseTimer: (state, action: PayloadAction<number>) => {
      const timer = state.activeTimers.find(t => t.stepId === action.payload);
      if (timer) {
        timer.state = 'PAUSED';
      }
    },
    resumeTimer: (state, action: PayloadAction<number>) => {
      const timer = state.activeTimers.find(t => t.stepId === action.payload);
      if (timer?.state === 'PAUSED') {
        timer.state = 'RUNNING';
        timer.startTime = Date.now();
      }
    },
    updateTimerRemaining: (state, action: PayloadAction<{ stepId: number; remaining: number }>) => {
      const timer = state.activeTimers.find(t => t.stepId === action.payload.stepId);
      if (timer) {
        timer.remainingSeconds = action.payload.remaining;
        if (timer.remainingSeconds <= 0) {
          timer.state = 'COMPLETED';
        }
      }
    },
    completeTimer: (state, action: PayloadAction<number>) => {
      const timer = state.activeTimers.find(t => t.stepId === action.payload);
      if (timer) {
        timer.state = 'COMPLETED';
        timer.remainingSeconds = 0;
      }
    },
    removeTimer: (state, action: PayloadAction<number>) => {
      state.activeTimers = state.activeTimers.filter(t => t.stepId !== action.payload);
    },
    clearAllTimers: (state) => {
      state.activeTimers = [];
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  resumeTimer,
  updateTimerRemaining,
  completeTimer,
  removeTimer,
  clearAllTimers,
  setConnectionStatus,
} = timerSlice.actions;

export default timerSlice.reducer;
