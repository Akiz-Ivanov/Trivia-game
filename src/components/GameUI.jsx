import Button from "./Button"
import clsx from 'clsx'
import './GameUI.css'
import { motion, AnimatePresence } from "framer-motion"

export default function GameUI({
    question,
    answers,
    processAnswerSelection,
    nextQuestion,
    isLastQuestion,
    selectedAnswer,
    maxScore,
    currentQuestionIndex,
    handleShowResults,
    minimalMode
}) {

    //Render buttons
    const renderAnswers = answers.map(answer => {
        const isCorrect = answer === question.correct_answer
        return (
            <Button
                key={`${question.id}-${answer}`}
                type="button"
                onClick={() => processAnswerSelection(answer, isCorrect)}
                disabled={!!selectedAnswer}
                className={clsx(
                    'game-card__answer',
                    {
                        'game-card__answer--correct': selectedAnswer && isCorrect,
                        'game-card__answer--incorrect': answer === selectedAnswer && !isCorrect,
                    }
                )}
            >
                <span>{answer}</span>
            </Button>
        )
    })

    const categoryBg = {
        Geography: "/src/assets/geography.svg",
        "Science: Gadgets": "/src/assets/science-gadgets.svg",
        "General Knowledge": "/src/assets/general-knowledge.svg",
        "Entertainment: Books": "/src/assets/entertainment-books.svg",
        "Entertainment: Film": "/src/assets/entertainment-film.svg",
        "Entertainment: Music": "/src/assets/entertainment-music.svg",
        "Entertainment: Musicals & Theatres": "/src/assets/entertainment-musicals-theatres.svg",
        "Entertainment: Television": "/src/assets/entertainment-television.svg",
        "Entertainment: Video Games": "/src/assets/entertainment-video-games.svg",
        "Entertainment: Board Games": "/src/assets/entertainment-board-games.svg",
        "Science & Nature": "/src/assets/science-nature.svg",
        "Science: Computers": "/src/assets/science-computers.svg",
        "Science: Mathematics": "/src/assets/science-mathematics.svg",
        "Mythology": "/src/assets/mythology.svg",
        "Sports": "/src/assets/sports.svg",
        "History": "/src/assets/history.svg",
        "Politics": "/src/assets/politics.svg",
        "Art": "/src/assets/art.svg",
        "Celebrities": "/src/assets/celebrities.svg",
        "Animals": "/src/assets/animals.svg",
        "Vehicles": "/src/assets/vehicles.svg",
        "Entertainment: Comics": "/src/assets/entertainment-comics.svg",
        "Entertainment: Japanese Anime & Manga": "/src/assets/entertainment-anime-manga.svg",
        "Entertainment: Cartoon & Animations": "/src/assets/entertainment-cartoon-animations.svg"
    }

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    className="game-card"
                    style={{ backgroundImage: !minimalMode.illustrations ? `url(${categoryBg[question.category]})` : "none" }}
                    initial={minimalMode.animations ? false : { opacity: 0, scale: 0.95, y: 20 }}
                    animate={minimalMode.animations ? {} : { opacity: 1, scale: 1, y: 0 }}
                    exit={minimalMode.animations ? {} : { opacity: 0, scale: 0.95, y: -20 }}
                    transition={minimalMode.animations ? { duration: 0 } : { duration: 0.5 }}
                    layout
                >
                    <p className="game-category">{question.category}</p>
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${((currentQuestionIndex + 1) / maxScore) * 100}%`,
                            }}
                        />
                    </div>
                    <div className="game-card__meta">
                        <span>Question {currentQuestionIndex + 1} / {maxScore}</span>
                        <span className="meta-separator">•</span>
                        <span className="game-card__difficulty">{question.difficulty}</span>
                    </div>
                    <p className="game-card__question">{question.question}</p>
                    <div className="btn-wrapper">
                        {renderAnswers}
                    </div>
                    {!isLastQuestion && (
                        <Button
                            type="button"
                            className="game-card__next-question"
                            onClick={nextQuestion}
                            disabled={!selectedAnswer}
                            title={!selectedAnswer ? "Choose an answer to continue" : undefined}
                        >
                            Next Question
                        </Button>
                    )}
                    {isLastQuestion && (
                        <Button
                            className="game-card__show-results"
                            type="button"
                            onClick={handleShowResults}
                            disabled={!selectedAnswer}
                        >
                            Show Results
                        </Button>
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    )

}