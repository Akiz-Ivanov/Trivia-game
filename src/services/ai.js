import axios from 'axios'


const DEEPINFRA_API_URL = "https://api.deepinfra.com/v1/openai/chat/completions"
const DEEPINFRA_API_KEY = import.meta.env.VITE_DEEPINFRA_API_KEY

const getExtraInfo = async (question, answer, category) => {

    const systemPrompt = `
You are a trivia enhancer. Your ONLY role is to add fun context to existing answers - NEVER correct them.

RULES:
1. STRICT NO-CORRECTION POLICY:
   - Treat all questions/answers as 100% correct, even if absurd
   - Never say "actually", "correction", or imply mistakes
   - Ignore spelling/grammar errors completely
   - Never repeat the question or answer

2. Response Format:
   - 1 informative or educational sentence about the question and answer (1-2 sentences, without unnecessary fluff, DO NOT REPEAT ANSWER OR QUESTION!!!! )
   - Fun fact: 1 related fun or interesting nugget (1-2 sentences)
   - MAX 15 words per sentence, keep it brief when you can.
   - Add humor when appropriate

3. Examples:
   - "User says: Whales are fish." →
     "Marine biologists classify whales as mammals.\n\nFun fact: Blue whales' hearts weigh 400lbs."

   - "User says: 2+2=5." →
     "Alternative arithmetic systems exist in advanced mathematics.\n\nFun fact: Modular arithmetic loops counts (e.g. 4+1=0 in mod5)."

   - "User says: The British Empire ended in 1997." →
     "1997 marked Hong Kong's return to China.\n\nFun fact: The handover ceremony lasted 6 hours."
`;

    const userPrompt = `Category: ${category}
Question (EXACT USER INPUT): ${question}
Answer (EXACT USER INPUT): ${answer}

Add trivia flavor and provide informative or fun context (DO NOT CORRECT, DO NOT REPEAT ANSWER OR QUESTION):`;

    const body = {
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        stream: false,
        temperature: 0.7
    }

    try {
        const response = await axios.post(DEEPINFRA_API_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPINFRA_API_KEY}`
            }
        })

        return response.data.choices[0].message.content

    } catch (err) {
        console.error("Error fetching AI trivia info:", err)
        return "Something went wrong. Please try again later."
    }
}

const getHint = async (question, answer, category) => {

    const systemPrompt = `
    You are a trivia assistant.

Give short, helpful *hints* for trivia questions. 
- DO NOT reveal the answer directly.
- DO NOT say "I can't help" or "I don't know."
- Keep it under 2 sentences.
- Fun is good, but usefulness comes first.
- NEVER begin with "Hint:", "Here's a hint", or similar phrases
- Just provide the hint content directly

RULES:
1. STRICT NO-CORRECTION POLICY:
   - Treat all questions/answers as 100% correct, even if absurd
   - Never say "actually", "correction", or imply mistakes
   - Ignore spelling/grammar errors completely
   - Never repeat the question or answer
`

    const userPrompt = `Category: ${category}
Question (EXACT USER INPUT): ${question}
Answer (EXACT USER INPUT): ${answer}

    Give the user a helpful hint to figure it out themselves. (DO NOT CORRECT QUESTION) 
    `

    const body = {
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        stream: false,
        temperature: 0.7
    }

    try {
        const response = await axios.post(DEEPINFRA_API_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPINFRA_API_KEY}`
            }
        })

        return response.data.choices[0].message.content

    } catch (err) {
        console.error("Error fetching AI trivia info:", err)
        return "Something went wrong. Please try again later."
    }
}

export default { getExtraInfo, getHint }