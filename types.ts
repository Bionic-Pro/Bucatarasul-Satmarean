export interface Ingredient {
  id: string;
  name: string;
  category: 'legume' | 'carne' | 'lactate' | 'baza' | 'fructe' | 'smoothie';
}

export interface NutritionalDetail {
  ingredient: string;
  details: string; // e.g., "Vit C, Iron"
  calories: number;
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  cookingTime: string;
  portions: number;
  difficulty: 'Ușor' | 'Mediu';
  caloriesPerPortion: number;
  ingredients: string[];
  steps: string[];
  chefTips: string; // "Sfatul Sătmăreanului"
  nutritionalDetails: NutritionalDetail[];
  imageUrl?: string;
  createdAt?: number;
}

export type AgeGroup = '1-3' | '4-8' | '9-13' | 'adult';
export type MealType = 'mic_dejun' | 'pranz_cina' | 'gustare' | 'smoothie';

export interface UserPreferences {
  ingredients: string[];
  ageGroup: AgeGroup;
  mealType: MealType;
  hideVeggies: boolean;
  portions: number;
  avoidIngredients: string;
  spices: string[];
}