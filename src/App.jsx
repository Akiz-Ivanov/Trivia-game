import { useState, useEffect } from 'react'
import api from './services/api'
import './App.css'
import Form from './components/FormParts/Form'
import GameUI from './components/GameUI'
import Error from './components/Error'
import shuffleArray from './utils'
import LoadingOverlay from './components/LoadingOverlay'
import Results from './components/Results'

function App() {
  // Static value for the initial form data
  const initialFormData = {
    amount: "10",
    category: undefined,
    difficulty: undefined
  }

  //State values
  const [formData, setFormData] = useState(initialFormData)
  const [triviaData, setTriviaData] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isGameOn, setIsGameOn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [minimalMode, setMinimalMode] = useState({
    animations: true,
    illustrations: false
  })

  // Derived values
  const maxScore = triviaData.length

  useEffect(() => {
    Object.entries(minimalMode).forEach(([key, value]) => {
      const className = `minimal-mode-${key}`;
      document.body.classList.toggle(className, value);
    });
  }, [minimalMode]);

  // Shuffle answers when trivia data or question index changes
  useEffect(() => {
    if (triviaData.length) {
      const { incorrect_answers, correct_answer } = triviaData[currentQuestionIndex]
      const answers = [...incorrect_answers, correct_answer]
      const shuffledAnswers = shuffleArray(answers)
      setShuffledAnswers(shuffledAnswers)
    }
  }, [triviaData, currentQuestionIndex])

  //Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  //Start game
  const startGame = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { amount, category, difficulty } = formData
    api.fetchTriviaData(amount, category, difficulty)
      .then(triviaData => {
        if (triviaData.length === 0) {
          setIsError(true);
          console.error("No trivia questions found for the selected parameters. Try reducing the number of questions or changing the difficulty.")
        } else {
          setTriviaData(triviaData)
          setIsGameOn(true)
        }
      })
      .catch(error => {
        console.error("Couldn't fetch Trivia Game data", error)
        setIsError(true)
        setIsFirstRender(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
    setIsFirstRender(false)
  }

  // Reset the error state
  const resetError = () => {
    setIsError(false)
  }

  // Reset the game state
  const resetGame = () => {
    setFormData(initialFormData)
    setTriviaData([])
    setIsFirstRender(true)
    setShowResults(false)
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShuffledAnswers([])
  }

  // Load next question
  const loadNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
  }

  // Process the selected answer (correct or incorrect)
  const processAnswerSelection = (answer, isCorrect) => {
    if (selectedAnswer) return
    setSelectedAnswer(answer)
    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }
  }

  const handleShowResults = () => {
    setIsGameOn(false)
    setShowResults(true)
  }



  const handleToggleAnimations = () => setMinimalMode(prev => ({ ...prev, animations: !prev.animations }))

  const handleToggleIllustrations = () => setMinimalMode(prev => ({ ...prev, illustrations: !prev.illustrations }))

  // Render JSX based on the current game state
  return (
    <main>
      {!isGameOn && !isError && !isLoading && !showResults ?
        <Form
          onChange={handleChange}
          onSubmit={startGame}
          isFirstRender={isFirstRender}
          minimalMode={minimalMode}
          handleToggleAnimations={handleToggleAnimations}
          handleToggleIllustrations={handleToggleIllustrations} />
        : null}
      {isLoading && <LoadingOverlay />}
      {isGameOn && !isError && (
        <GameUI
          question={triviaData[currentQuestionIndex]}
          answers={shuffledAnswers}
          isLastQuestion={currentQuestionIndex === triviaData.length - 1}
          selectedAnswer={selectedAnswer}
          processAnswerSelection={processAnswerSelection}
          nextQuestion={loadNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          maxScore={maxScore}
          handleShowResults={handleShowResults}
          minimalMode={minimalMode}
        />
      )}
      {isError && <Error onClick={resetError} />}
      {showResults && <Results score={score} maxScore={maxScore} resetGame={resetGame} minimalMode={minimalMode} />}
    </main>
  )
}

export default App