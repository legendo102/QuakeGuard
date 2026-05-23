
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AIAnalysisResult } from "../types";

export const analyzeRisk = async (profile: UserProfile): Promise<AIAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Türkiye'de yaşayan bir kullanıcı için deprem risk analizi yap.
  Kullanıcı Bilgileri:
  Şehir: ${profile.city}
  İlçe: ${profile.district}
  Bina Yaşı: ${profile.buildingAge}
  Bina Yapı Malzemesi: ${profile.material}

  Lütfen JSON formatında şunları döndür:
  1. riskPercent (0-100 arası bir sayı, konuma ve yapıya bağlı tahmini risk)
  2. summary (Kısa bir özet metin)
  3. recommendations (En az 4 maddelik bir dizi öneri)
  
  Dil tamamen Türkçe olmalıdır. Yanıt sadece JSON objesi olsun.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskPercent: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["riskPercent", "summary", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    // Fallback static analysis if AI fails
    return {
      riskPercent: 65,
      summary: "Analiz sırasında bir hata oluştu, ancak genel verilere göre bölgeniz riskli kategoride olabilir.",
      recommendations: [
        "Deprem çantanızı hazır tutun.",
        "Eşyalarınızı sabitleyin.",
        "Yaşam üçgeni alanlarını belirleyin.",
        "Binanızın deprem dayanıklılığını kontrol ettirin."
      ]
    };
  }
};
