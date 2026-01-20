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
  { id: '5c', name: 'Ceapă Verde', category: 'legume' },
  { id: '6', name: 'Usturoi', category: 'legume' },
  { id: '7', name: 'Morcovi', category: 'legume' },
  { id: '8', name: 'Vinete', category: 'legume' },
  { id: '9', name: 'Dovlecei', category: 'legume' },
  { id: '9b', name: 'Broccoli', category: 'legume' },
  { id: '9c', name: 'Conopidă', category: 'legume' },
  { id: '9d', name: 'Varză', category: 'legume' },
  { id: '9e', name: 'Fasole Verde', category: 'legume' },
  { id: '9f', name: 'Mazăre', category: 'legume' },
  { id: '9g', name: 'Ciuperci', category: 'legume' },
  { id: '9h', name: 'Țelină (Rădăcină)', category: 'legume' },
  { id: '9i', name: 'Praz', category: 'legume' },
  { id: '9j', name: 'Spanac', category: 'legume' },
  { id: '9k', name: 'Sfeclă Roșie', category: 'legume' },
  { id: '9l', name: 'Ridichi', category: 'legume' },
  { id: '9m', name: 'Salată Verde', category: 'legume' },
  { id: '9n', name: 'Porumb (conservă)', category: 'legume' },
  
  // --- CARNE ---
  { id: '10', name: 'Piept de pui', category: 'carne' },
  { id: '10b', name: 'Pulpe de pui', category: 'carne' },
  { id: '10c', name: 'Ficăței de pui', category: 'carne' },
  { id: '11', name: 'Carne tocată (Amestec)', category: 'carne' },
  { id: '12', name: 'Șuncă/Bacon', category: 'carne' },
  { id: '13', name: 'Cârnați', category: 'carne' },
  { id: '14', name: 'Ceafă de Porc', category: 'carne' },
  { id: '15', name: 'Cotlet de Porc', category: 'carne' },
  { id: '16', name: 'Carne de Vită', category: 'carne' },
  { id: '17', name: 'Carne de Curcan', category: 'carne' },
  { id: '18', name: 'Pește (Păstrăv)', category: 'carne' },
  { id: '19', name: 'Somon', category: 'carne' },
  { id: '19b', name: 'Ton (conservă)', category: 'carne' },
  { id: '19c', name: 'Salam/Mezeluri', category: 'carne' },
  
  // --- LACTATE ---
  { id: '20', name: 'Ouă', category: 'lactate' },
  { id: '21', name: 'Lapte', category: 'lactate' },
  { id: '22', name: 'Brânză de vaci', category: 'lactate' },
  { id: '23', name: 'Cașcaval', category: 'lactate' },
  { id: '23b', name: 'Mozzarella', category: 'lactate' },
  { id: '23c', name: 'Telemea', category: 'lactate' },
  { id: '23d', name: 'Parmezan', category: 'lactate' },
  { id: '24', name: 'Smântână', category: 'lactate' },
  { id: '24b', name: 'Smântână de gătit', category: 'lactate' },
  { id: '25', name: 'Unt', category: 'lactate' },
  { id: '26', name: 'Iaurt Grecesc', category: 'lactate' },
  { id: '27', name: 'Kefir / Sana', category: 'lactate' },
  { id: '28', name: 'Mascarpone', category: 'lactate' },

  // --- BAZA (Cămară) ---
  { id: '30', name: 'Făină', category: 'baza' },
  { id: '31', name: 'Mălai', category: 'baza' },
  { id: '32', name: 'Orez', category: 'baza' },
  { id: '33', name: 'Paste (Spaghete/Penne)', category: 'baza' },
  { id: '33b', name: 'Tăiței de casă', category: 'baza' },
  { id: '34', name: 'Ulei de Floarea Soarelui', category: 'baza' },
  { id: '34b', name: 'Ulei de Măsline', category: 'baza' },
  { id: '35', name: 'Pâine / Crutoane', category: 'baza' },
  { id: '36', name: 'Bulion / Suc de roșii', category: 'baza' },
  { id: '37', name: 'Fasole (boabe/conservă)', category: 'baza' },
  { id: '38', name: 'Năut', category: 'baza' },
  { id: '39', name: 'Linte', category: 'baza' },
  { id: '39b', name: 'Griș', category: 'baza' },
  { id: '39c', name: 'Pesmet', category: 'baza' },
  { id: '39d', name: 'Oțet', category: 'baza' },
  { id: '39e', name: 'Muștar', category: 'baza' },
  { id: '39f', name: 'Miere', category: 'baza' },

  // --- FRUCTE ---
  { id: '40', name: 'Mere', category: 'fructe' },
  { id: '41', name: 'Prune', category: 'fructe' },
  { id: '42', name: 'Nuci', category: 'fructe' },
  { id: '43', name: 'Banane', category: 'fructe' },
  { id: '44', name: 'Pere', category: 'fructe' },
  { id: '45', name: 'Struguri', category: 'fructe' },
  { id: '46', name: 'Lămâie', category: 'fructe' },
  { id: '47', name: 'Portocale', category: 'fructe' },
  { id: '48', name: 'Pepene', category: 'fructe' },
  { id: '49', name: 'Cireșe/Vișine', category: 'fructe' },

  // --- SMOOTHIE ---
  { id: '50', name: 'Banane', category: 'smoothie' },
  { id: '51', name: 'Fructe de Pădure (Congelate)', category: 'smoothie' },
  { id: '52', name: 'Fulgi de Ovăz', category: 'smoothie' },
  { id: '53', name: 'Iaurt Grecesc', category: 'smoothie' },
  { id: '54', name: 'Spanac Baby', category: 'smoothie' },
  { id: '55', name: 'Unt de Arahide', category: 'smoothie' },
  { id: '56', name: 'Semințe de Chia', category: 'smoothie' },
  { id: '57', name: 'Avocado', category: 'smoothie' },
  { id: '58', name: 'Lapte Vegetal (Migdale/Soia)', category: 'smoothie' },
  { id: '59', name: 'Mango', category: 'smoothie' },
  { id: '60', name: 'Ananas', category: 'smoothie' },
  { id: '61', name: 'Scorțișoară', category: 'smoothie' },
  { id: '62', name: 'Semințe de In', category: 'smoothie' },
  { id: '63', name: 'Pudră Proteică', category: 'smoothie' },
];

export const ROMANIAN_SPICES = [
  "Pătrunjel", "Mărar", "Leuștean", "Cimbru", "Boia Dulce", "Boia Iute", "Piper", "Busuioc", "Tarhon", "Oregano", "Usturoi Granulat", "Foi de Dafin"
];
