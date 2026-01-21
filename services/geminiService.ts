
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, UserPreferences, NutritionalDetail } from "../types";
import { COOKING_METHODS_LIST } from "../constants";

const createClient = () => {
  // Verifică prioritar variabila de mediu injectată de platforma de hosting (Vercel, Netlify, etc.)
  const apiKey = process.env.API_KEY || (window as any)._env_?.API_KEY;
  
  if (!apiKey) {
    console.warn("Atenție: Cheia API lipsește. Aplicația va solicita utilizatorului să își folosească propria cheie pentru testare.");
  }
  
  return new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });
};

export const generateRecipe = async (prefs: UserPreferences): Promise<Recipe[]> => {
  const ai = createClient();
  
  const isChild = prefs.ageGroup !== 'adult';
  let targetAudience = isChild
    ? `Copii (vârsta ${prefs.ageGroup}), rețetă sănătoasă, atractivă vizual, ușor de digerat` 
    : "Adulți (gust bogat, tradițional sau modern)";

  if (isChild && prefs.hideVeggies) {
    targetAudience += ". IMPORTANT: Ascunde legumele în preparat sau fă-le invizibile.";
  }

  const mealTypeLabels = prefs.mealTypes.map(mt => {
    if (mt === 'mic_dejun') return "Mic Dejun";
    if (mt === 'pranz_cina') return "Prânz sau Cină";
    if (mt === 'gustare') return "Gustare";
    if (mt === 'smoothie') return "Smoothie";
    return mt;
  }).join(", ");

  const avoidContext = prefs.avoidIngredients ? `EVITĂ COMPLET: ${prefs.avoidIngredients}. ` : "";
  const spiceContext = prefs.spices.length > 0 ? `Folosește condimentele: ${prefs.spices.join(', ')}. ` : "";
  
  const cookingMethodLabel = COOKING_METHODS_LIST.find(m => m.id === prefs.cookingMethod)?.label || 'Orice Metodă';
  const cookingMethodContext = prefs.cookingMethod !== 'orice' ? `METODA DE GĂTIRE OBLIGATORIE: ${cookingMethodLabel}.` : "";

  const allergenContext = prefs.allergens.length > 0 
    ? `CRITIC - ALERGENI: Rețeta NU trebuie să conțină: ${prefs.allergens.join(', ')}.` 
    : "";

  const systemInstruction = `
    Ești un bucătar șef expert din Satu Mare, România. 
    Vorbești doar în limba Română. Stil local ardelenesc.
    Generezi un meniu bazat pe ingredientele selectate.
    Dacă utilizatorul a selectat mai multe tipuri de masă, returnează EXACT o rețetă pentru fiecare tip selectat.
  `;

  const prompt = `
    Generează rețete pentru următoarele tipuri de masă: ${mealTypeLabels}.
    INGREDIENTE DISPONIBILE: ${prefs.ingredients.join(', ')}.
    ${spiceContext}
    ${avoidContext}
    ${allergenContext}
    ${cookingMethodContext}
    PENTRU CINE: ${targetAudience}.
    PORȚII: ${prefs.portions}.
    TIMP LIMITĂ PER REȚETĂ: Maxim 25 minute.
    
    IMPORTANT: Returnează un array JSON valid de obiecte rețetă.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              cookingTime: { type: Type.STRING },
              portions: { type: Type.NUMBER },
              difficulty: { type: Type.STRING, enum: ["Ușor", "Mediu"] },
              caloriesPerPortion: { type: Type.NUMBER },
              mealType: { type: Type.STRING },
              ingredients: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              chefTips: { type: Type.STRING },
              nutritionalDetails: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    ingredient: { type: Type.STRING },
                    details: { type: Type.STRING },
                    calories: { type: Type.NUMBER },
                    value: { type: Type.NUMBER },
                    unit: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["title", "description", "cookingTime", "ingredients", "steps", "chefTips", "portions", "difficulty", "caloriesPerPortion", "mealType"],
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Recipe[];
      return data.map(r => ({ 
        ...r, 
        id: crypto.randomUUID(), 
        createdAt: Date.now() 
      }));
    } else {
      throw new Error("Nu am primit un răspuns valid de la AI.");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Dacă eroarea este legată de lipsa cheii, forțăm dialogul de selecție dacă suntem în mediul AI Studio
    if (error.message?.includes("Requested entity was not found") && window.aistudio?.openSelectKey) {
      window.aistudio.openSelectKey();
    }
    throw new Error("Eroare la generare. Verifică setările API în Profil.");
  }
};

export const generateRecipeImage = async (title: string, ingredients: string[]): Promise<string | null> => {
  const ai = createClient();
  try {
    const prompt = `High quality food photography: "${title}" with ${ingredients.slice(0, 3).join(', ')}. 4k, rustic style.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "16:9" } },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (e) {
    return null;
  }
};
