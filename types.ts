
export interface Ingredient {
  id: string;
  name: string;
  category: 'legume' | 'carne' | 'lactate' | 'baza' | 'fructe' | 'smoothie';
}

export interface NutritionalDetail {
  ingredient: string;
  details: string;
  calories: number;
  value?: number;
  unit?: string;
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
  chefTips: string;
  nutritionalDetails: NutritionalDetail[];
  imageUrl?: string;
  createdAt?: number;
  mealType?: string; // Specific type if generated as part of a list
}

export type AgeGroup = '1-3' | '4-8' | '9-13' | 'adult';
export type MealType = 'mic_dejun' | 'pranz_cina' | 'gustare' | 'smoothie';
export type CookingMethod = 'orice' | 'aragaz' | 'cuptor' | 'presiune' | 'airfryer' | 'drycooker' | 'gratar';

export interface UserPreferences {
  ingredients: string[];
  ageGroup: AgeGroup;
  mealTypes: MealType[];
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
