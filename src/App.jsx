import { useState, useEffect, useRef } from 'react'
import api from './services/api'
import './App.css'
import Form from './components/FormParts/Form'
import GameUI from './components/GameUI'
import Error from './components/Error'
import shuffleArray from './utils'
import LoadingOverlay from './components/LoadingOverlay'
import Results from './components/Results'
import ai from './services/ai'
import { ErrorBoundary } from 'react-error-boundary';

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
    animations: false,
    illustrations: true
  })
  const [gameAddons, setGameAddons] = useState({
    aiTrivia: '',
    hint: ''
  })

  // Derived values
  const maxScore = triviaData.length

  // Refs
  const controllerRef = useRef(new AbortController())

  // Apply minimal mode
  useEffect(() => {

    document.body.classList.toggle('minimal-mode-animations', !minimalMode.animations);

    document.body.classList.toggle('minimal-mode-illustrations', !minimalMode.illustrations);

  }, [minimalMode]);

  // Shuffle answers when trivia data or question index changes
  useEffect(() => {

    controllerRef.current = new AbortController()

    if (triviaData.length) {
      const { incorrect_answers, correct_answer } = triviaData[currentQuestionIndex]
      const answers = [...incorrect_answers, correct_answer]
      const shuffledAnswers = shuffleArray(answers)
      setShuffledAnswers(shuffledAnswers)
    }

    return () => {
      controllerRef.current.abort();
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
    setFormData(initialFormData)
    setIsError(false)
    api.resetTriviaToken()
  }

  // Reset the game state
  const resetGame = () => {
    setFormData(initialFormData)
    setTriviaData([])
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShuffledAnswers([])
    setGameAddons(prev => ({ ...prev, aiTrivia: '', hint: '' }))
    
    setIsGameOn(false)
    setIsError(false)
    setIsLoading(false)
    setShowResults(false)
    setIsFirstRender(true)
    
    api.resetTriviaToken()
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
  }

  // Load next question
  const loadNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setGameAddons(prev => ({ ...prev, aiTrivia: '', hint: '' }))
  }

  // Process the selected answer (correct or incorrect)
  const processAnswerSelection = (answer, isCorrect) => {
    if (selectedAnswer) return
    setSelectedAnswer(answer)
    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }
  }

  // Show results button click
  const handleShowResults = () => {
    setIsGameOn(false)
    setShowResults(true)
  }

  // Fetch extra info 
  const handleExtraInfoClick = (question, answer, category) => {
    setIsLoading(true)
    ai.getExtraInfo(question, answer, category, controllerRef.current.signal)
      .then(message => {
        setGameAddons(prev => ({ ...prev, aiTrivia: message, hint: '' }))
      })
      .catch(error => {
        console.error("Error fetching extra info:", error);
        setGameAddons(prev => ({ ...prev, aiTrivia: "Sorry, couldn't fetch extra info." }));
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Fetch hint
  const handleHintClick = (question, answer, category) => {
    setIsLoading(true)
    ai.getHint(question, answer, category, controllerRef.current.signal)
      .then(message => {
        setGameAddons(prev => ({ ...prev, hint: message }))
      })
      .catch(error => {
        console.error("Error fetching hint:", error);
        setGameAddons(prev => ({ ...prev, hint: "Sorry, couldn't fetch hint." }));
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Toggle animations
  const handleToggleAnimations = () => setMinimalMode(prev => ({ ...prev, animations: !prev.animations }))

  // Toggle illustrations
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
      {isGameOn && !isError && (
        <ErrorBoundary
          FallbackComponent={Error}
          onReset={resetGame}
        >

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
            handleExtraInfoClick={handleExtraInfoClick}
            handleHintClick={handleHintClick}
            gameAddons={gameAddons}
            isLoading={isLoading}
          />
        </ErrorBoundary>
      )}
      {isLoading && <LoadingOverlay />}
      {isError && <Error onClick={resetError} />}
      {showResults && <Results score={score} maxScore={maxScore} resetGame={resetGame} minimalMode={minimalMode} />}
    </main>
  )
}

export default App