import axios from 'axios'
import {
    EXTRA_INFO_SYSTEM_PROMPT,
    HINT_SYSTEM_PROMPT
} from './aiPrompts';
// System prompts used inside the requestPayload of axios requests

// DeepInfra API endpoint and key (loaded from environment variables)
const DEEPINFRA_API_URL = "https://api.deepinfra.com/v1/openai/chat/completions"
const DEEPINFRA_API_KEY = import.meta.env.VITE_DEEPINFRA_API_KEY

// Handle API errors
// const handleApiError = (err) => {
//     if (axios.isCancel(err)) {
//         console.log('Request canceled:', err.message);
//         return "";
//     }
//     console.error("API Error:", err);
//     return "Something went wrong. Please try again later.";
// };

// Fetch extra info
const getExtraInfo = async (question, answer, category, signal) => {

    // Dynamically generated user prompt (includes question/answer/category)
    const userPrompt = `Category: ${category}
Question (EXACT USER INPUT): ${question}
Answer (EXACT USER INPUT): ${answer}

Add trivia flavor and provide informative or fun context (DO NOT CORRECT, DO NOT REPEAT ANSWER OR QUESTION):`

    // requestPayload of axios request below
    const requestPayload = {
        messages: [
            { role: "system", content: EXTRA_INFO_SYSTEM_PROMPT },
            { role: "user", content: userPrompt }
        ],
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        stream: false,
        temperature: 0.7
    }

    // Axios request for extra info
    try {
        const response = await axios.post(DEEPINFRA_API_URL, requestPayload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPINFRA_API_KEY}`
            },
            signal
        })
        return response.data.choices[0].message.content

    } catch (err) {
        if (axios.isCancel(err)) {
            console.log('Extra info request canceled')
            return ""
        }
        console.error("DeepInfra API Error:", err.response?.data || err.message);
        return "Something went wrong. Please try again later."
    }
}

// Fetch hint
const getHint = async (question, answer, category, signal) => {

    // Dynamically generated user prompt (includes question/answer/category)
    const userPrompt = `Category: ${category}
Question (EXACT USER INPUT): ${question}
Answer (EXACT USER INPUT): ${answer}

    Give the user a helpful hint to figure it out themselves. (DO NOT CORRECT QUESTION) 
    `

    // requestPayload for axios request below it
    const requestPayload = {
        messages: [
            { role: "system", content: HINT_SYSTEM_PROMPT },
            { role: "user", content: userPrompt }
        ],
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        stream: false,
        temperature: 0.7
    }

    // axios request for hint
    try {
        const response = await axios.post(DEEPINFRA_API_URL, requestPayload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPINFRA_API_KEY}`
            },
            signal
        })

        return response.data.choices[0].message.content

    } catch (err) {
        if (axios.isCancel(err)) {
            console.log('Extra info request canceled')
            return ""
        }
        console.error("DeepInfra API Error:", err.response?.data || err.message);
        return "Something went wrong. Please try again later."
    }
}

export default { getExtraInfo, getHint }