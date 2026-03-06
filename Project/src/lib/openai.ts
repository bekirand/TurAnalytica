import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️ OPENAI_API_KEY is not set. OpenAI integration will not work.');
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build',
    baseURL: 'https://openrouter.ai/api/v1',
});
