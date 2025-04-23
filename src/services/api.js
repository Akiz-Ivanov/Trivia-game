import { decode } from 'html-entities'
import axios from 'axios'
import { nanoid } from 'nanoid'

export const fetchTriviaData = async (amount, category, difficulty) => {
    const response = await axios.get('https://opentdb.com/api.php', {
        params: { amount, category, difficulty }
    });

    return response.data.results.map(question => ({
        ...question,
        question: decode(question.question),
        correct_answer: decode(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(decode),
        category: decode(question.category),
        id: nanoid()
    }));
}

export default { fetchTriviaData }