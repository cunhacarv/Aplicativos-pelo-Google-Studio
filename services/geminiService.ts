
import { GoogleGenAI } from "@google/genai";

const getGeminiApiKey = () => {
    // In a real application, you would use a more secure way to handle API keys.
    // For this example, we assume it's set in the environment variables.
    return process.env.API_KEY;
};

export const getExplanation = async (userPrompt: string): Promise<string> => {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
        return "API Key not found. Please set the API_KEY environment variable.";
    }
    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = `Com base nos princípios de resistência elétrica para um laboratório de física, explique o seguinte: ${userPrompt}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                systemInstruction: "Você é um tutor de física prestativo. Explique conceitos relacionados à eletricidade de forma clara e concisa, como se estivesse ajudando um aluno com seu relatório de laboratório. Use o português do Brasil.",
                temperature: 0.7,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching explanation from Gemini:", error);
        return "Desculpe, ocorreu um erro ao tentar obter uma explicação. Por favor, tente novamente mais tarde.";
    }
};
