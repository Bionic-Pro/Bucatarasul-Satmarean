import React from 'react';
import { Ingredient } from './types';
import { Carrot, Beef, Milk, Wheat, Apple, CupSoda, Flame, Thermometer, Gauge, Wind, Disc, Utensils } from 'lucide-react';

export const CATEGORIES = {
  legume: { label: 'Legume & Verdețuri', icon: <Carrot className="w-5 h-5" /> },
  carne: { label: 'Carne & Proteine', icon: <Beef className="w-5 h-5" /> },
  lactate: { label: 'Lactate & Ouă', icon: <Milk className="w-5 h-5" /> },
  baza: { label: 'Cămară (Bază)', icon: <Wheat className="w-5 h-5" /> },
  fructe: { label: 'Fructe', icon: <Apple className="w-5 h-5" /> },
  smoothie: { label: 'Smoothie Bar', icon: <CupSoda className="w-5 h-5" /> },
};

export const COMMON_ALLERGENS = [
  { id: 'gluten', label: 'Fără Gluten' },
  { id: 'lactose', label: 'Fără Lactoză' },
  { id: 'sugar', label: 'Fără Zahăr (Diabet)' },
  { id: 'nuts', label: 'Fără Nuci/Alune' },
  { id: 'eggs', label: 'Fără Ouă' },
  { id: 'seafood', label: 'Fără Fructe de Mare' },
  { id: 'histamine', label: 'Nivel scăzut Histamină' },
];

export const COOKING_METHODS_LIST = [
  { id: 'orice', label: 'Orice Metodă', icon: <Utensils size={24} /> },
  { id: 'aragaz', label: 'Aragaz / Plită', icon: <Flame size={24} /> },
  { id: 'cuptor', label: 'La Cuptor', icon: <Thermometer size={24} /> },
  { id: 'presiune', label: 'Oală sub presiune', icon: <Gauge size={24} /> },
  { id: 'airfryer', label: 'Air Fryer', icon: <Wind size={24} /> },
  { id: 'drycooker', label: 'Dry Cooker', icon: <Disc size={24} /> },
];

export const PREDEFINED_INGREDIENTS: Ingredient[] = [
  // --- LEGUME ---
  { id: '1', name: 'Roșii', category: 'legume' },
  { id: '2', name: 'Castraveți', category: 'legume' },
  { id: '3', name: 'Ardei Gras', category: 'legume' },
  { id: '3b', name: 'Ardei Kapia', category: 'legume' },
  { id: '4', name: 'Cartofi', category: 'legume' },
  { id: '4b', name: 'Cartofi Dulci', category: 'legume' },
  { id: '5', name: 'Ceapă Galbenă', category: 'legume' },
  { id: '5b', name: 'Ceapă Roșie', category: 'legume' },
  { id: '6', name: 'Usturoi', category: 'legume' },
  { id: '7', name: 'Morcovi', category: 'legume' },
  { id: '8', name: 'Vinete', category: 'legume' },
  { id: '9', name: 'Dovlecei', category: 'legume' },
  { id: '9b', name: 'Broccoli', category: 'legume' },
  { id: '9c', name: 'Conopidă', category: 'legume' },
  { id: '9d', name: 'Spanac', category: 'legume' },
  { id: '9e', name: 'Țelină', category: 'legume' },
  
  // --- CARNE (Expanded) ---
  { id: '10', name: 'Piept de pui', category: 'carne' },
  { id: '10b', name: 'Pulpe de pui', category: 'carne' },
  { id: '10c', name: 'Ficăței de pui', category: 'carne' },
  { id: '11', name: 'Carne tocată', category: 'carne' },
  { id: '12', name: 'Șuncă/Bacon', category: 'carne' },
  { id: '13', name: 'Cârnați', category: 'carne' },
  { id: '13b', name: 'Mici (Pastă)', category: 'carne' },
  { id: '14', name: 'Carne de vită', category: 'carne' },
  { id: '15', name: 'Pește', category: 'carne' },
  { id: '15b', name: 'Somon', category: 'carne' },
  { id: '15c', name: 'Aripi de pui', category: 'carne' },
  { id: '15d', name: 'Pulpă de Porc', category: 'carne' },
  { id: '15e', name: 'Cotlet de Porc', category: 'carne' },
  { id: '15f', name: 'Ceafă de Porc', category: 'carne' },
  
  // --- LACTATE (Expanded) ---
  { id: '20', name: 'Ouă', category: 'lactate' },
  { id: '21', name: 'Lapte', category: 'lactate' },
  { id: '22', name: 'Brânză de vaci', category: 'lactate' },
  { id: '22b', name: 'Telemea', category: 'lactate' },
  { id: '22c', name: 'Urda', category: 'lactate' },
  { id: '23', name: 'Cașcaval', category: 'lactate' },
  { id: '23b', name: 'Mozzarella', category: 'lactate' },
  { id: '23c', name: 'Parmezan', category: 'lactate' },
  { id: '24', name: 'Smântână', category: 'lactate' },
  { id: '24b', name: 'Smântână de gătit', category: 'lactate' },
  { id: '25', name: 'Unt', category: 'lactate' },
  { id: '26', name: 'Iaurt Grecesc', category: 'lactate' },
  { id: '26b', name: 'Kefir', category: 'lactate' },
  
  // --- BAZA (Expanded) ---
  { id: '30', name: 'Făină', category: 'baza' },
  { id: '31', name: 'Mălai', category: 'baza' },
  { id: '32', name: 'Orez', category: 'baza' },
  { id: '33', name: 'Paste', category: 'baza' },
  { id: '33b', name: 'Tăiței de casă', category: 'baza' },
  { id: '34', name: 'Ulei', category: 'baza' },
  { id: '34b', name: 'Ulei de Măsline', category: 'baza' },
  { id: '35', name: 'Pâine', category: 'baza' },
  { id: '36', name: 'Bulion', category: 'baza' },
  { id: '37', name: 'Suc de roșii', category: 'baza' },
  { id: '38', name: 'Mazăre (conservă)', category: 'baza' },
  { id: '39', name: 'Fasole (conservă)', category: 'baza' },
  { id: '39b', name: 'Năut (conservă)', category: 'baza' },
  { id: '39c', name: 'Linte', category: 'baza' },
  { id: '39d', name: 'Griș', category: 'baza' },

  // --- FRUCTE ---
  { id: '40', name: 'Mere', category: 'fructe' },
  { id: '41', name: 'Prune', category: 'fructe' },
  { id: '42', name: 'Nuci', category: 'fructe' },
  { id: '43', name: 'Banane', category: 'fructe' },

  // --- SMOOTHIE ---
  { id: '50', name: 'Fructe de pădure', category: 'smoothie' },
  { id: '51', name: 'Ovăz', category: 'smoothie' },
  { id: '52', name: 'Miere', category: 'smoothie' },
  { id: '53', name: 'Chia', category: 'smoothie' },
];

export const ROMANIAN_SPICES = [
  "Pătrunjel", "Mărar", "Leuștean", "Cimbru", "Boia Dulce", "Boia Iute", "Piper", "Busuioc", "Tarhon", "Oregano", "Usturoi Granulat", "Foi de Dafin"
];