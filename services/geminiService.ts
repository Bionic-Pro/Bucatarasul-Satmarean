import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, UserPreferences, NutritionalDetail } from "../types";

const createClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing!");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY' });
};

export const generateRecipe = async (prefs: UserPreferences): Promise<Recipe> => {
  const ai = createClient();
  
  // Logic based on detailed preferences
  const isChild = prefs.ageGroup !== 'adult';
  let targetAudience = isChild
    ? `Copii (vârsta ${prefs.ageGroup}), rețetă sănătoasă, atractivă vizual, ușor de digerat` 
    : "Adulți (gust bogat, tradițional sau modern)";

  if (isChild && prefs.hideVeggies) {
    targetAudience += ". IMPORTANT: Ascunde legumele în preparat sau fă-le invizibile (copil mofturos).";
  }

  const mealTypeMap: Record<string, string> = {
    mic_dejun: "Mic Dejun",
    pranz_cina: "Prânz sau Cină",
    gustare: "Gustare",
    smoothie: "Smoothie"
  };
  const mealContext = mealTypeMap[prefs.mealType] || "Masă principală";

  const avoidContext = prefs.avoidIngredients ? `EVITĂ COMPLET: ${prefs.avoidIngredients}. ` : "";
  const spiceContext = prefs.spices.length > 0 ? `Folosește condimentele: ${prefs.spices.join(', ')}. ` : "";

  const systemInstruction = `
    Ești un bucătar șef expert din Satu Mare, România. 
    Specialitatea ta este să creezi rețete rapide (maxim 25 minute) folosind ingredientele disponibile.
    Vorbești doar în limba Română.
    Stilul tău combină tradiția locală (ardelenească/sătmăreană) cu nevoile moderne de nutriție.
    Dacă rețeta este pentru copii, fii creativ și asigură-te că este echilibrată nutrițional.
    Include detalii nutriționale valide (calorii pozitive, descrieri reale) pentru ingredientele principale.
    Folosește un ton cald, prietenos.
  `;

  const prompt = `
    Generează o rețetă completă bazată pe următoarele constrângeri:
    
    INGREDIENTE DISPONIBILE: ${prefs.ingredients.join(', ')}.
    ${spiceContext}
    ${avoidContext}
    TIP MASĂ: ${mealContext}.
    PENTRU CINE: ${targetAudience}.
    PORȚII: ${prefs.portions}.
    TIMP LIMITĂ: Maxim 25 minute.
    
    IMPORTANT: Rețeta trebuie să fie inspirată din zona Satu Mare sau bucătăria românească modernă.
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
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            cookingTime: { type: Type.STRING },
            portions: { type: Type.NUMBER },
            difficulty: { type: Type.STRING, enum: ["Ușor", "Mediu"] },
            caloriesPerPortion: { type: Type.NUMBER },
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
                  details: { type: Type.STRING, description: "Vitamine/Minerale (ex: 'Vit C, Fier'). Must not be empty." },
                  calories: { type: Type.NUMBER, description: "Calorii aprox per porție. Must be > 0." }
                }
              }
            }
          },
          required: ["title", "description", "cookingTime", "ingredients", "steps", "chefTips", "portions", "difficulty", "caloriesPerPortion", "nutritionalDetails"],
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Recipe;
      return { ...data, id: crypto.randomUUID(), createdAt: Date.now() };
    } else {
      throw new Error("Nu am primit un răspuns valid de la AI.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("A apărut o eroare la generarea rețetei. Te rugăm să încerci din nou.");
  }
};

export const generateRecipeImage = async (title: string, ingredients: string[]): Promise<string | null> => {
  const ai = createClient();
  try {
    const prompt = `A delicious, professional food photography shot of a dish named "${title}". 
    The dish contains: ${ingredients.slice(0, 5).join(', ')}. 
    Style: Rustic, home-cooked, inviting, warm lighting, 4k resolution.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Image gen error", e);
    return null;
  }
};