import React from 'react';
import { Ingredient, SmoothiePreset } from './types';
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
  // --- LEGUME RĂDĂCINOASE ---
  { id: 'l_rad_1', name: 'Morcov', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_2', name: 'Pătrunjel rădăcină', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_3', name: 'Păstârnac', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_4', name: 'Ridiche', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_5', name: 'Ridiche neagră', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_6', name: 'Sfeclă roșie', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_7', name: 'Scorțoneră', category: 'legume', subCategory: 'Rădăcinoase' },
  { id: 'l_rad_8', name: 'Țelină (rădăcină)', category: 'legume', subCategory: 'Rădăcinoase' },

  // --- LEGUME TUBERCULIFERE ---
  { id: 'l_tub_1', name: 'Cartofi', category: 'legume', subCategory: 'Tuberculifere' },
  { id: 'l_tub_2', name: 'Cartofi Dulci', category: 'legume', subCategory: 'Tuberculifere' },
  { id: 'l_tub_3', name: 'Topinambur', category: 'legume', subCategory: 'Tuberculifere' },

  // --- LEGUME BULBIFERE ---
  { id: 'l_bulb_1', name: 'Ceapă Galbenă', category: 'legume', subCategory: 'Bulbifere' },
  { id: 'l_bulb_2', name: 'Ceapă Roșie', category: 'legume', subCategory: 'Bulbifere' },
  { id: 'l_bulb_3', name: 'Ceapă Verde', category: 'legume', subCategory: 'Bulbifere' },
  { id: 'l_bulb_4', name: 'Usturoi', category: 'legume', subCategory: 'Bulbifere' },
  { id: 'l_bulb_5', name: 'Praz', category: 'legume', subCategory: 'Bulbifere' },

  // --- LEGUME VĂRZOASE ---
  { id: 'l_varz_1', name: 'Varză albă', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_2', name: 'Varză roșie', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_3', name: 'Varză creță', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_4', name: 'Varză de Bruxelles', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_5', name: 'Varză chinezească', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_6', name: 'Conopidă', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_7', name: 'Broccoli', category: 'legume', subCategory: 'Vărzoase' },
  { id: 'l_varz_8', name: 'Gulie', category: 'legume', subCategory: 'Vărzoase' },

  // --- LEGUME FRUNZOASE ---
  { id: 'l_frunz_1', name: 'Salată Verde', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_2', name: 'Spanac', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_3', name: 'Mărar', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_4', name: 'Pătrunjel frunze', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_5', name: 'Cimbru', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_6', name: 'Busuioc', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_7', name: 'Leuștean', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_8', name: 'Lobodă', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_9', name: 'Măcriș', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_10', name: 'Ștevie', category: 'legume', subCategory: 'Frunzoase/Aromatice' },
  { id: 'l_frunz_11', name: 'Lăptucă', category: 'legume', subCategory: 'Frunzoase/Aromatice' },

  // --- LEGUME BOSTĂNOASE ---
  { id: 'l_bost_1', name: 'Ardei Gras', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_2', name: 'Ardei Kapia', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_3', name: 'Ardei Iute', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_4', name: 'Castraveți', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_5', name: 'Dovlecei', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_6', name: 'Dovleac', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_7', name: 'Vinete', category: 'legume', subCategory: 'Bostănoase (Fructe)' },
  { id: 'l_bost_8', name: 'Roșii', category: 'legume', subCategory: 'Bostănoase (Fructe)' },

  // --- LEGUME PĂSTĂI ---
  { id: 'l_past_1', name: 'Fasole verde', category: 'legume', subCategory: 'Păstăi/Boabe' },
  { id: 'l_past_2', name: 'Mazăre', category: 'legume', subCategory: 'Păstăi/Boabe' },
  { id: 'l_past_3', name: 'Bob', category: 'legume', subCategory: 'Păstăi/Boabe' },
  { id: 'l_past_4', name: 'Linte', category: 'legume', subCategory: 'Păstăi/Boabe' },
  { id: 'l_past_5', name: 'Năut', category: 'legume', subCategory: 'Păstăi/Boabe' },
  { id: 'l_past_6', name: 'Soia', category: 'legume', subCategory: 'Păstăi/Boabe' },

  
  // --- CARNE ROȘIE ---
  { id: 'c_red_1', name: 'Carne de Vită', category: 'carne', subCategory: 'Carne Roșie (Vită/Oaie)' },
  { id: 'c_red_2', name: 'Mușchi de Vită', category: 'carne', subCategory: 'Carne Roșie (Vită/Oaie)' },
  { id: 'c_red_3', name: 'Coaste de Vită', category: 'carne', subCategory: 'Carne Roșie (Vită/Oaie)' },
  { id: 'c_red_4', name: 'Carne de Bivol', category: 'carne', subCategory: 'Carne Roșie (Vită/Oaie)' },
  { id: 'c_red_5', name: 'Carne de Miel', category: 'carne', subCategory: 'Carne Roșie (Vită/Oaie)' },
  { id: 'c_red_6', name: 'Carne de Capră', category: 'carne', subCategory: 'Carne Roșie (Vită/Oaie)' },

  // --- CARNE DE PORC ---
  { id: 'c_pork_1', name: 'Carne tocată de porc', category: 'carne', subCategory: 'Carne de Porc' },
  { id: 'c_pork_2', name: 'Piept de porc', category: 'carne', subCategory: 'Carne de Porc' },
  { id: 'c_pork_3', name: 'Cotlet de porc', category: 'carne', subCategory: 'Carne de Porc' },
  { id: 'c_pork_4', name: 'Ceafă de porc', category: 'carne', subCategory: 'Carne de Porc' },
  { id: 'c_pork_5', name: 'Pulpă de porc', category: 'carne', subCategory: 'Carne de Porc' },
  { id: 'c_pork_6', name: 'Costițe de porc', category: 'carne', subCategory: 'Carne de Porc' },
  { id: 'c_pork_7', name: 'Slănină / Gușă', category: 'carne', subCategory: 'Carne de Porc' },

  // --- CARNE DE PASĂRE ---
  { id: 'c_poultry_1', name: 'Piept de Pui', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_2', name: 'Pulpe de Pui', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_3', name: 'Aripioare de Pui', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_4', name: 'Pui Întreg', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_5', name: 'Piept de Curcan', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_6', name: 'Carne tocată de Curcan', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_7', name: 'Carne de Gâscă', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_8', name: 'Carne de Rață', category: 'carne', subCategory: 'Carne de Pasăre' },
  { id: 'c_poultry_9', name: 'Pui de Casă', category: 'carne', subCategory: 'Carne de Pasăre' },

  // --- VÂNĂTOARE ---
  { id: 'c_game_1', name: 'Carne de Cerb', category: 'carne', subCategory: 'Vânătoare' },
  { id: 'c_game_2', name: 'Carne de Căprioară', category: 'carne', subCategory: 'Vânătoare' },
  { id: 'c_game_3', name: 'Carne de Iepure', category: 'carne', subCategory: 'Vânătoare' },
  { id: 'c_game_4', name: 'Fazan', category: 'carne', subCategory: 'Vânătoare' },
  { id: 'c_game_5', name: 'Potârniche', category: 'carne', subCategory: 'Vânătoare' },

  // --- ORGANE ---
  { id: 'c_org_1', name: 'Ficat (Pui/Porc/Vită)', category: 'carne', subCategory: 'Organe & Măruntaie' },
  { id: 'c_org_2', name: 'Inimă', category: 'carne', subCategory: 'Organe & Măruntaie' },
  { id: 'c_org_3', name: 'Rinichi', category: 'carne', subCategory: 'Organe & Măruntaie' },
  { id: 'c_org_4', name: 'Limbă', category: 'carne', subCategory: 'Organe & Măruntaie' },
  { id: 'c_org_5', name: 'Pipote și Inimi', category: 'carne', subCategory: 'Organe & Măruntaie' },
  { id: 'c_org_6', name: 'Creier', category: 'carne', subCategory: 'Organe & Măruntaie' },

  // --- PROCESATE ---
  { id: 'c_proc_1', name: 'Cârnați', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_2', name: 'Salam', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_3', name: 'Pastramă', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_4', name: 'Șuncă Presată', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_5', name: 'Bacon / Kaiser', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_6', name: 'Pateu de ficat', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_7', name: 'Mici (Pastă)', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_8', name: 'Carne la Conservă', category: 'carne', subCategory: 'Mezeluri & Procesate' },
  { id: 'c_proc_9', name: 'Jumări', category: 'carne', subCategory: 'Mezeluri & Procesate' },

  // --- PEȘTE & FRUCTE DE MARE ---
  { id: 'c_fish_1', name: 'Păstrăv', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_2', name: 'Cod / Merluciu', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_3', name: 'Macrou', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_4', name: 'Somon', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_5', name: 'Ton', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_6', name: 'Creveți', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_7', name: 'Midii / Scoici', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  { id: 'c_fish_8', name: 'Calamar', category: 'carne', subCategory: 'Pește & Fructe de Mare' },
  
  // --- LACTATE & OUĂ ---
  // Subcategory: Lapte și băuturi lactate
  { id: 'lac_milk_1', name: 'Lapte de vacă', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_2', name: 'Lapte de capră', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_3', name: 'Lapte de oaie', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_4', name: 'Lapte vegetal', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_5', name: 'Lapte bătut', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_6', name: 'Iaurt natural', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_7', name: 'Iaurt cu fructe', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_8', name: 'Kefir', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },
  { id: 'lac_milk_9', name: 'Sana', category: 'lactate', subCategory: 'Lapte și băuturi lactate' },

  // Subcategory: Produse lactate fermentate / cremoase
  { id: 'lac_cream_1', name: 'Smântână fermentată', category: 'lactate', subCategory: 'Produse fermentate / cremoase' },
  { id: 'lac_cream_2', name: 'Smântână de gătit', category: 'lactate', subCategory: 'Produse fermentate / cremoase' },
  { id: 'lac_cream_3', name: 'Frișcă lichidă', category: 'lactate', subCategory: 'Produse fermentate / cremoase' },
  { id: 'lac_cream_4', name: 'Lapte condensat', category: 'lactate', subCategory: 'Produse fermentate / cremoase' },
  { id: 'lac_cream_5', name: 'Mascarpone', category: 'lactate', subCategory: 'Produse fermentate / cremoase' },

  // Subcategory: Brânzeturi
  { id: 'lac_cheese_1', name: 'Brânză de vaci (dulce)', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_2', name: 'Telemea', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_3', name: 'Caș', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_4', name: 'Urdă', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_5', name: 'Brânză de capră', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_6', name: 'Brânză de oaie', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_7', name: 'Brânză afumată', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_8', name: 'Brânză topită', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_9', name: 'Mozzarella', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_10', name: 'Parmezan', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_11', name: 'Cașcaval', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_12', name: 'Feta', category: 'lactate', subCategory: 'Brânzeturi' },
  { id: 'lac_cheese_13', name: 'Cheddar', category: 'lactate', subCategory: 'Brânzeturi' },

  // Subcategory: Unt și alte grăsimi lactate
  { id: 'lac_butter_1', name: 'Unt (82%)', category: 'lactate', subCategory: 'Unt și grăsimi' },
  { id: 'lac_butter_2', name: 'Unt sărat', category: 'lactate', subCategory: 'Unt și grăsimi' },
  { id: 'lac_butter_3', name: 'Unt cu ierburi', category: 'lactate', subCategory: 'Unt și grăsimi' },
  { id: 'lac_butter_4', name: 'Margarină', category: 'lactate', subCategory: 'Unt și grăsimi' },

  // Subcategory: Ouă
  { id: 'lac_egg_1', name: 'Ouă de găină', category: 'lactate', subCategory: 'Ouă' },
  { id: 'lac_egg_2', name: 'Ouă de prepeliță', category: 'lactate', subCategory: 'Ouă' },
  { id: 'lac_egg_3', name: 'Ouă de rață', category: 'lactate', subCategory: 'Ouă' },

  // --- FRUCTE ---
  // Subcategory: Fructe de sezon (vară)
  { id: 'fr_sum_1', name: 'Cireșe', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_2', name: 'Vișine', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_3', name: 'Afine', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_4', name: 'Mure', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_5', name: 'Zmeură', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_6', name: 'Mere (Vară)', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_7', name: 'Piersici', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_8', name: 'Piersici (Pară)', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_9', name: 'Nectarine', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_10', name: 'Prune', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_11', name: 'Caise', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_12', name: 'Smochine', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },
  { id: 'fr_sum_13', name: 'Struguri', category: 'fructe', subCategory: 'Fructe de sezon (vară)' },

  // Subcategory: Fructe de sezon (toamnă)
  { id: 'fr_aut_1', name: 'Mere (Toamnă)', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },
  { id: 'fr_aut_2', name: 'Pere', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },
  { id: 'fr_aut_3', name: 'Prune (Târzii)', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },
  { id: 'fr_aut_4', name: 'Măceșe', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },
  { id: 'fr_aut_5', name: 'Castane', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },
  { id: 'fr_aut_6', name: 'Nuci', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },
  { id: 'fr_aut_7', name: 'Mălai (Roșu/Galben)', category: 'fructe', subCategory: 'Fructe de sezon (toamnă)' },

  // Subcategory: Fructe citrice
  { id: 'fr_cit_1', name: 'Portocale', category: 'fructe', subCategory: 'Fructe citrice' },
  { id: 'fr_cit_2', name: 'Mandarine', category: 'fructe', subCategory: 'Fructe citrice' },
  { id: 'fr_cit_3', name: 'Grapefruit', category: 'fructe', subCategory: 'Fructe citrice' },
  { id: 'fr_cit_4', name: 'Lămâi', category: 'fructe', subCategory: 'Fructe citrice' },
  { id: 'fr_cit_5', name: 'Lime', category: 'fructe', subCategory: 'Fructe citrice' },
  { id: 'fr_cit_6', name: 'Bergamotă', category: 'fructe', subCategory: 'Fructe citrice' },

  // Subcategory: Fructe exotice / tropicale
  { id: 'fr_exo_1', name: 'Banane', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_2', name: 'Ananas', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_3', name: 'Mango', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_4', name: 'Papaya', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_5', name: 'Kiwi', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_6', name: 'Avocado', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_7', name: 'Rodie (Granat)', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_8', name: 'Nucă de Cocos', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },
  { id: 'fr_exo_9', name: 'Mangostin', category: 'fructe', subCategory: 'Fructe exotice / tropicale' },

  // Subcategory: Fructe uscate (în mod natural)
  { id: 'fr_dry_1', name: 'Dovlecel uscat', category: 'fructe', subCategory: 'Fructe uscate' },
  { id: 'fr_dry_2', name: 'Prune uscate', category: 'fructe', subCategory: 'Fructe uscate' },
  { id: 'fr_dry_3', name: 'Mere uscate', category: 'fructe', subCategory: 'Fructe uscate' },
  { id: 'fr_dry_4', name: 'Piersici uscate', category: 'fructe', subCategory: 'Fructe uscate' },
  { id: 'fr_dry_5', name: 'Curmale', category: 'fructe', subCategory: 'Fructe uscate' },
  { id: 'fr_dry_6', name: 'Stafide', category: 'fructe', subCategory: 'Fructe uscate' },

  // Subcategory: Fructe oleaginoase (fructe cu nucă)
  { id: 'fr_nut_1', name: 'Alune', category: 'fructe', subCategory: 'Fructe oleaginoase' },
  { id: 'fr_nut_2', name: 'Nuci de pădure', category: 'fructe', subCategory: 'Fructe oleaginoase' },
  { id: 'fr_nut_3', name: 'Migdale', category: 'fructe', subCategory: 'Fructe oleaginoase' },
  { id: 'fr_nut_4', name: 'Fistic', category: 'fructe', subCategory: 'Fructe oleaginoase' },
  { id: 'fr_nut_5', name: 'Semințe Floarea-Soarelui', category: 'fructe', subCategory: 'Fructe oleaginoase' },
  { id: 'fr_nut_6', name: 'Semințe Dovleac', category: 'fructe', subCategory: 'Fructe oleaginoase' },

  // Subcategory: Fructe de pădure
  { id: 'fr_ber_1', name: 'Coacăze (Negre/Roșii)', category: 'fructe', subCategory: 'Fructe de pădure' },
  { id: 'fr_ber_2', name: 'Jidovi', category: 'fructe', subCategory: 'Fructe de pădure' },

  
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
  { id: '39d', name: 'Griș', category: 'baza' },

  // --- SMOOTHIE BAR (Detailed) ---
  
  // Fructe proaspete
  { id: 'sm_fr_1', name: 'Banane', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_2', name: 'Mango', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_3', name: 'Ananas', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_4', name: 'Căpșuni', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_5', name: 'Zmeură', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_6', name: 'Mure', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_7', name: 'Afine', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_8', name: 'Kiwi', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_9', name: 'Portocală', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_10', name: 'Mandarină', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_11', name: 'Măr', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_12', name: 'Pară', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_13', name: 'Cireșe (cong)', category: 'smoothie', subCategory: 'Fructe proaspete' },
  { id: 'sm_fr_14', name: 'Vișine (cong)', category: 'smoothie', subCategory: 'Fructe proaspete' },

  // Fructe congelate / pulpe de fruct
  { id: 'sm_cong_1', name: 'Mix fructe tropicale', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },
  { id: 'sm_cong_2', name: 'Fructe de pădure cong.', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },
  { id: 'sm_cong_3', name: 'Pulpă de Acai', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },
  { id: 'sm_cong_4', name: 'Pulpă de Guava', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },
  { id: 'sm_cong_5', name: 'Pulpă Maracuja', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },
  { id: 'sm_cong_6', name: 'Cuburi Pepene Galben', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },
  { id: 'sm_cong_7', name: 'Cuburi Pepene Roșu', category: 'smoothie', subCategory: 'Fructe congelate / pulpe' },

  // Baze lichide
  { id: 'sm_liq_1', name: 'Lapte de Vacă', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_2', name: 'Lapte de Capră', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_3', name: 'Lapte de Ovăz', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_4', name: 'Lapte de Migdale', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_5', name: 'Lapte de Soia', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_6', name: 'Lapte de Cocos', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_7', name: 'Lapte de Orez', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_8', name: 'Iaurt Simplu', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_9', name: 'Iaurt Grecesc', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_10', name: 'Chefir', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_11', name: 'Suc de Portocale', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_12', name: 'Suc de Mere', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_13', name: 'Apă Plată', category: 'smoothie', subCategory: 'Baze lichide' },
  { id: 'sm_liq_14', name: 'Apă de Cocos', category: 'smoothie', subCategory: 'Baze lichide' },

  // Cereale & pseudo‑cereale
  { id: 'sm_cer_1', name: 'Ovăz', category: 'smoothie', subCategory: 'Cereale & pseudo‑cereale' },
  { id: 'sm_cer_2', name: 'Fulgi de Secară', category: 'smoothie', subCategory: 'Cereale & pseudo‑cereale' },
  { id: 'sm_cer_3', name: 'Fulgi de Grâu/Spelta', category: 'smoothie', subCategory: 'Cereale & pseudo‑cereale' },
  { id: 'sm_cer_4', name: 'Quinoa (fiartă)', category: 'smoothie', subCategory: 'Cereale & pseudo‑cereale' },
  { id: 'sm_cer_5', name: 'Hrișcă (hidratată)', category: 'smoothie', subCategory: 'Cereale & pseudo‑cereale' },
  { id: 'sm_cer_6', name: 'Granola', category: 'smoothie', subCategory: 'Cereale & pseudo‑cereale' },

  // Semințe și nuci
  { id: 'sm_seed_1', name: 'Semințe de In', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_2', name: 'Semințe de Dovleac', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_3', name: 'Semințe Floarea-soarelui', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_4', name: 'Semințe de Susan', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_5', name: 'Semințe de Chia', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_6', name: 'Semințe de Cânepă', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_7', name: 'Nuci', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_8', name: 'Alune', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_9', name: 'Migdale', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_10', name: 'Caju', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_11', name: 'Fistic', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_12', name: 'Nuci Pecan', category: 'smoothie', subCategory: 'Semințe și nuci' },
  { id: 'sm_seed_13', name: 'Macadamia', category: 'smoothie', subCategory: 'Semințe și nuci' },

  // Îndulcitori
  { id: 'sm_sweet_1', name: 'Sirop de Agave', category: 'smoothie', subCategory: 'Îndulcitori' },
  { id: 'sm_sweet_2', name: 'Sirop de Arțar', category: 'smoothie', subCategory: 'Îndulcitori' },
  { id: 'sm_sweet_3', name: 'Curmale (hidratate)', category: 'smoothie', subCategory: 'Îndulcitori' },
  { id: 'sm_sweet_4', name: 'Zahăr Brun', category: 'smoothie', subCategory: 'Îndulcitori' },
  { id: 'sm_sweet_5', name: 'Zahăr de Cocos', category: 'smoothie', subCategory: 'Îndulcitori' },
  { id: 'sm_sweet_6', name: 'Stevia / Eritritol', category: 'smoothie', subCategory: 'Îndulcitori' },
  { id: 'sm_sweet_7', name: 'Miere', category: 'smoothie', subCategory: 'Îndulcitori' },

  // Verdețuri & super‑foods verzi
  { id: 'sm_green_1', name: 'Spanac Proaspăt', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },
  { id: 'sm_green_2', name: 'Kale', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },
  { id: 'sm_green_3', name: 'Frunze de Sfeclă', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },
  { id: 'sm_green_4', name: 'Castravete', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },
  { id: 'sm_green_5', name: 'Spirulină (pudră)', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },
  { id: 'sm_green_6', name: 'Chlorella (pudră)', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },
  { id: 'sm_green_7', name: 'Iarbă de Grâu', category: 'smoothie', subCategory: 'Verdețuri & super‑foods' },

  // Proteine & suplimente
  { id: 'sm_prot_1', name: 'Pudră Proteică (Zer)', category: 'smoothie', subCategory: 'Proteine & suplimente' },
  { id: 'sm_prot_2', name: 'Pudră Proteică (Vegetală)', category: 'smoothie', subCategory: 'Proteine & suplimente' },
  { id: 'sm_prot_3', name: 'Colagen', category: 'smoothie', subCategory: 'Proteine & suplimente' },
  { id: 'sm_prot_4', name: 'Creatină', category: 'smoothie', subCategory: 'Proteine & suplimente' },
  { id: 'sm_prot_5', name: 'BCAA', category: 'smoothie', subCategory: 'Proteine & suplimente' },

  // Ingrediente pentru textură & cremozitate
  { id: 'sm_tex_1', name: 'Unt de Arahide', category: 'smoothie', subCategory: 'Textură & cremozitate' },
  { id: 'sm_tex_2', name: 'Unt de Migdale', category: 'smoothie', subCategory: 'Textură & cremozitate' },
  { id: 'sm_tex_3', name: 'Unt de Caju', category: 'smoothie', subCategory: 'Textură & cremozitate' },
  { id: 'sm_tex_4', name: 'Avocado', category: 'smoothie', subCategory: 'Textură & cremozitate' },
  { id: 'sm_tex_5', name: 'Brânză fină / Mascarpone', category: 'smoothie', subCategory: 'Textură & cremozitate' },
  { id: 'sm_tex_6', name: 'Tofu Silken', category: 'smoothie', subCategory: 'Textură & cremozitate' },

  // Arome, condimente și topping‑uri
  { id: 'sm_fla_1', name: 'Cacao pudră', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_2', name: 'Pudră de Roșcove', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_3', name: 'Scorțișoară', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_4', name: 'Vanilie', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_5', name: 'Cardamom', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_6', name: 'Ghimbir', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_7', name: 'Turmeric', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_8', name: 'Fulgi de Cocos', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_9', name: 'Ciocolată Neagră (rasă)', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_10', name: 'Nibs de Cacao', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
  { id: 'sm_fla_11', name: 'Coajă rasă Lămâie/Portocală', category: 'smoothie', subCategory: 'Arome & topping‑uri' },
];

export const SMOOTHIE_PRESETS: SmoothiePreset[] = [
  {
    id: 'sm_pre_1',
    name: 'Energie Tropicală',
    category: 'Energie',
    ingredients: ['Banane', 'Mango', 'Ananas', 'Lapte de Migdale', 'Ovăz', 'Miere']
  },
  {
    id: 'sm_pre_2',
    name: 'Energie cu Cacao',
    category: 'Energie',
    ingredients: ['Banane', 'Lapte de Vacă', 'Cacao pudră', 'Unt de Arahide', 'Semințe de Chia']
  },
  {
    id: 'sm_pre_3',
    name: 'Green Detox Basic',
    category: 'Detox',
    ingredients: ['Spanac Proaspăt', 'Măr', 'Castravete', 'Suc de Lămâie', 'Apă Plată']
  },
  {
    id: 'sm_pre_4',
    name: 'Green Protein',
    category: 'Detox',
    ingredients: ['Spanac Proaspăt', 'Avocado', 'Banane', 'Lapte de Cocos', 'Pudră Proteică (Vegetală)', 'Semințe de Cânepă']
  },
  {
    id: 'sm_pre_5',
    name: 'Slim Berry',
    category: 'Slăbit',
    ingredients: ['Fructe de pădure cong.', 'Iaurt Simplu', 'Apă Plată', 'Semințe de In', 'Stevia / Eritritol']
  },
  {
    id: 'sm_pre_6',
    name: 'Slim Verde',
    category: 'Slăbit',
    ingredients: ['Castravete', 'Spanac Proaspăt', 'Măr', 'Avocado', 'Semințe de In', 'Apă de Cocos']
  },
  {
    id: 'sm_pre_7',
    name: 'Protein Banana Oats',
    category: 'Proteic',
    ingredients: ['Banane', 'Ovăz', 'Lapte de Vacă', 'Pudră Proteică (Zer)', 'Unt de Arahide']
  },
  {
    id: 'sm_pre_8',
    name: 'Berry Protein',
    category: 'Proteic',
    ingredients: ['Fructe de pădure cong.', 'Banane', 'Iaurt Grecesc', 'Lapte de Soia', 'Pudră Proteică (Vegetală)']
  },
  {
    id: 'sm_pre_9',
    name: 'Strawberry Shake',
    category: 'Kids',
    ingredients: ['Căpșuni', 'Banane', 'Lapte de Vacă', 'Iaurt Simplu', 'Miere']
  },
  {
    id: 'sm_pre_10',
    name: 'Apple Pie Smoothie',
    category: 'Kids',
    ingredients: ['Măr', 'Banane', 'Lapte de Ovăz', 'Ovăz', 'Scorțișoară', 'Vanilie']
  },
];

export const ROMANIAN_SPICES = [
  "Pătrunjel", "Mărar", "Leuștean", "Cimbru", "Boia Dulce", "Boia Iute", "Piper", "Busuioc", "Tarhon", "Oregano", "Usturoi Granulat", "Foi de Dafin"
];