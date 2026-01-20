
export interface Ingredient {
  id: string;
  name: string;
  category: 'legume' | 'carne' | 'lactate' | 'baza' | 'fructe' | 'smoothie';
}

export interface NutritionalDetail {
  ingredient: string;
  details: string; // e.g., "Vit C, Iron" or general description
  calories: number;
  value?: number; // e.g., 12
  unit?: string; // e.g., "g", "mg", "µg"
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
export type CookingMethod = 'orice' | 'aragaz' | 'cuptor' | 'presiune' | 'airfryer' | 'drycooker' | 'gratar';

export interface UserPreferences {
  ingredients: string[];
  ageGroup: AgeGroup;
  mealType: MealType;
  cookingMethod: CookingMethod;
  hideVeggies: boolean;
  portions: number;
  avoidIngredients: string;
  allergens: string[];
  spices: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  preferences: {
    allergens: string[];
    avoidIngredients: string;
  };
}
