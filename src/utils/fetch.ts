
/**
 * Exponential Backoff Retry Fetch implementation.
 */ 
export const retryFetch = async (url, options, maxRetries = import.meta.env.VITE_MAX_RETRIES) => {
    console.log("retryFetch")
    console.log(maxRetries)
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status === 429 && attempt < maxRetries - 1) {
                    const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue; 
                }
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            return response;
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            if (attempt === maxRetries - 1) {
                throw error;
            }
            const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("API request failed after multiple retries.");
};