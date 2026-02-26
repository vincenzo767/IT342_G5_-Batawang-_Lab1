// API Types
export interface Country {
  id: number;
  name: string;
  code: string;
  continent: string;
  description: string;
  flagEmoji: string;
  latitude: number;
  longitude: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  iconName: string;
  colorCode: string;
}

export interface Ingredient {
  id: number;
  name: string;
  description: string;
  category: string;
  isTraditional: boolean;
  commonSubstitutes: string[];
}

export interface RecipeIngredient {
  id: number;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  preparation?: string;
  isOptional: boolean;
  notes?: string;
}

export interface Step {
  id: number;
  orderIndex: number;
  instruction: string;
  hasTimer: boolean;
  timerSeconds?: number;
  timerLabel?: string;
  isParallel: boolean;
  parallelGroup?: number;
  tips?: string;
  temperature?: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  country: Country;
  categories: Category[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  defaultServings: number;
  difficultyLevel: string;
  imageUrl?: string;
  culturalContext?: string;
  ingredients: RecipeIngredient[];
  steps: Step[];
}

export interface ScaledIngredient {
  ingredientId: number;
  ingredientName: string;
  originalQuantity: number;
  scaledQuantity: number;
  unit: string;
  preparation?: string;
  isOptional: boolean;
}

export interface ScaledStep {
  stepId: number;
  orderIndex: number;
  instruction: string;
  hasTimer: boolean;
  originalTimerSeconds?: number;
  scaledTimerSeconds?: number;
  timerLabel?: string;
  isParallel: boolean;
  parallelGroup?: number;
  tips?: string;
}

export interface ScaledRecipe {
  recipeId: number;
  recipeName: string;
  originalServings: number;
  requestedServings: number;
  scalingFactor: number;
  scaledIngredients: ScaledIngredient[];
  scaledSteps: ScaledStep[];
  adjustedTotalTime: number;
}

export interface TimerSequence {
  stepId: number;
  orderIndex: number;
  timerLabel: string;
  durationSeconds: number;
  startAtSecond: number;
  canStartEarly: boolean;
  parallelGroup?: number;
  instruction: string;
}

export interface TimerOrchestration {
  recipeId: number;
  recipeName: string;
  timerSequence: TimerSequence[];
  totalCookingTime: number;
  orchestrationStrategy: string;
}

export interface ActiveTimer {
  stepId: number;
  timerLabel: string;
  durationSeconds: number;
  remainingSeconds: number;
  state: 'RUNNING' | 'PAUSED' | 'COMPLETED';
  startTime: number;
}
