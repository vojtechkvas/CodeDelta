import { useState, useCallback } from 'react';
import { retryFetch } from '../utils/fetch.ts';


export const useGeminiReview = () => {
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReview = useCallback(async (prompt: string) => {
        setIsLoading(true);
        setError(null);
        setAiResponse('');

        const systemPrompt = import.meta.env.VITE_SYSTEM_INSTRUCTION_PROMPT
     //   const MAX_RETRIES = import.meta.env.VITE_MAX_RETRIES  ;
        const apiKey = import.meta.env.VITE_API_KEY
        const MODEL_NAME = import.meta.env.VITE_MODEL_NAME


        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

        console.log(systemPrompt)
        console.log(MODEL_NAME)

        /*
        const apiKey = " "; 
        const modelName = 'gemini-2.5-flash-preview-09-2025';

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        */
        console.log("apiUrl")
        console.log(apiKey)
        console.log(apiUrl)
        console.log(prompt)
        console.log(systemPrompt)
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        try {
            const response = await retryFetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                setAiResponse(candidate.content.parts[0].text);
            } else {
                setError("AI returned an unexpected response structure.");
            }

        } catch (err) {
            if (isError(err)) {
                setError(`Failed to fetch AI response: ${err.message}`);
                console.error('API Error:', err);
            } else {
                setError("Failed to fetch AI response: An unknown error occurred.");
                console.error('Unknown API Error:', err);
            }
        } finally {
            setIsLoading(false);
        }
    }, []); 

    return { aiResponse, isLoading, error, fetchReview, setAiResponse, setError, setIsLoading };
};


function isError(e: any): e is Error {
    return e && typeof e === 'object' && 'message' in e;
}