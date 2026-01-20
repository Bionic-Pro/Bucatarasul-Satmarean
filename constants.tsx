import React from 'react';
import { Ingredient } from './types';
import { Carrot, Beef, Milk, Wheat, Apple, CupSoda } from 'lucide-react';

export const CATEGORIES = {
  smoothie: { label: 'Smoothie Bar', icon: <CupSoda className="w-5 h-5" /> },
  legume: { label: 'Legume & Verdețuri', icon: <Carrot className="w-5 h-5" /> },
  carne: { label: 'Carne & Proteine', icon: <Beef className="w-5 h-5" /> },
  lactate: { label: 'Lactate & Ouă', icon: <Milk className="w-5 h-5" /> },
  baza: { label: 'Cămară (Bază)', icon: <Wheat className="w-5 h-5" /> },
  fructe: { label: 'Fructe', icon: <Apple className="w-5 h-5" /> },
};

export const PREDEFINED_INGREDIENTS: Ingredient[] = [
  // Smoothie Essentials
  { id: '50', name: 'Banane', category: 'smoothie' },
  { id: '51', name: 'Fructe de Pădure', category: 'smoothie' },
  { id: '52', name: 'Fulgi de Ovăz', category: 'smoothie' },
  { id: '53', name: 'Iaurt Grecesc', category: 'smoothie' },
  { id: '54', name: 'Spanac Baby', category: 'smoothie' },
  { id: '55', name: 'Unt de Arahide', category: 'smoothie' },
  { id: '56', name: 'Semințe de Chia', category: 'smoothie' },
  { id: '57', name: 'Avocado', category: 'smoothie' },
  { id: '58', name: 'Lapte Vegetal', category: 'smoothie' },
  { id: '59', name: 'Mango', category: 'smoothie' },
  { id: '60', name: 'Ananas', category: 'smoothie' },
  { id: '61', name: 'Scorțișoară', category: 'smoothie' },

  // Legume
  { id: '1', name: 'Roșii', category: 'legume' },
  { id: '2', name: 'Castraveți', category: 'legume' },
  { id: '3', name: 'Ardei', category: 'legume' },
  { id: '4', name: 'Cartofi', category: 'legume' },
  { id: '5', name: 'Ceapă', category: 'legume' },
  { id: '6', name: 'Usturoi', category: 'legume' },
  { id: '7', name: 'Morcovi', category: 'legume' },
  { id: '8', name: 'Vinete', category: 'legume' },
  { id: '9', name: 'Dovlecei', category: 'legume' },
  
  // Carne
  { id: '10', name: 'Piept de pui', category: 'carne' },
  { id: '11', name: 'Carne tocată', category: 'carne' },
  { id: '12', name: 'Șuncă/Slăninuță', category: 'carne' },
  { id: '13', name: 'Cârnați afumați', category: 'carne' },
  
  // Lactate
  { id: '20', name: 'Ouă', category: 'lactate' },
  { id: '21', name: 'Lapte', category: 'lactate' },
  { id: '22', name: 'Brânză de vaci', category: 'lactate' },
  { id: '23', name: 'Cașcaval', category: 'lactate' },
  { id: '24', name: 'Smântână', category: 'lactate' },
  { id: '25', name: 'Unt', category: 'lactate' },

  // Baza
  { id: '30', name: 'Făină', category: 'baza' },
  { id: '31', name: 'Mălai', category: 'baza' },
  { id: '32', name: 'Orez', category: 'baza' },
  { id: '33', name: 'Paste', category: 'baza' },
  { id: '34', name: 'Ulei', category: 'baza' },
  { id: '35', name: 'Pâine', category: 'baza' },

  // Fructe
  { id: '40', name: 'Mere', category: 'fructe' },
  { id: '41', name: 'Prune (Silvoiță)', category: 'fructe' },
  { id: '42', name: 'Nuci', category: 'fructe' },
];

export const ROMANIAN_SPICES = [
  "Pătrunjel", "Mărar", "Leuștean", "Cimbru", "Boia Dulce", "Piper", "Busuioc", "Tarhon"
];