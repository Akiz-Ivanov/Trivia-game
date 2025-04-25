import { decode } from 'html-entities'
import axios from 'axios'
import { nanoid } from 'nanoid'

let sessionToken = null

const getNewSessionToken = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api_token.php?command=request')
        sessionToken = response.data.token
        return sessionToken
    } catch(error) {
        console.error('Failed to get token:', error)
        throw error
    }
}

export const resetTriviaToken = () => {
    sessionToken = null
}

export const fetchTriviaData = async (amount, category, difficulty) => {

    if (!sessionToken) {
        await getNewSessionToken()
    }

    try {
        const response = await axios.get('https://opentdb.com/api.php', {
            params: { amount, category, difficulty, token: sessionToken }
        })

        if (response.data.response_code === 4) {
            await getNewSessionToken() // Get fresh token
            return fetchTriviaData(amount, category, difficulty)
        }

        if (response.data.response_code !== 0) {
            throw new Error(`API Error ${response.data.response_code}`);
        }
    
        return response.data.results.map(question => ({
            ...question,
            question: decode(question.question),
            correct_answer: decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(decode),
            category: decode(question.category),
            id: nanoid()
        }))

    } catch (error) {
        console.error('Error fetching trivia data:', error)
    }
}

export default { fetchTriviaData, resetTriviaToken }