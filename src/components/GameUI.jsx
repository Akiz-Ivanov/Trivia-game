import Button from "./Button"
import clsx from 'clsx'
import './GameUI.css'
import { motion, AnimatePresence } from "framer-motion"
import { categoryBg } from '../assets/imports.js'
import GameMeta from "./GameMeta.jsx"
import { ArrowRight, BarChart2, Sparkles, Lightbulb } from "lucide-react"

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
    minimalMode,
    handleExtraInfoClick,
    handleHintClick,
    gameAddons,
    isLoading
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

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    className="game-card"
                    style={{
                        backgroundImage: minimalMode.illustrations ? `url(${categoryBg[question.category]})` : "none",
                        willChange: minimalMode.animations ? 'transform, opacity' : 'auto'
                    }}
                    initial={minimalMode.animations ? { opacity: 0 } : false}
                    animate={minimalMode.animations ? { opacity: 1 } : false}
                    exit={minimalMode.animations ? { opacity: 0 } : false}
                    transition={minimalMode.animations ? {
                        duration: isMobile ? 0.2 : 0.3,
                        ease: "easeOut"
                    } : undefined}
                    layout={minimalMode.animations} 
                >
                    <GameMeta
                        category={question.category}
                        difficulty={question.difficulty}
                        currentQuestionIndex={currentQuestionIndex}
                        maxScore={maxScore}
                    />
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
                            Next Question <ArrowRight className="icon" size={20} />
                        </Button>
                    )}
                    {isLastQuestion && (
                        <Button
                            className="game-card__show-results"
                            type="button"
                            onClick={handleShowResults}
                            disabled={!selectedAnswer}
                        >
                            Show Results <BarChart2 className="icon" size={20} />
                        </Button>
                    )}
                    <div className="game-card__game-addons-container">
                        <Button
                            type="button"
                            onClick={() => handleHintClick(question.question, question.correct_answer, question.category)}
                            disabled={selectedAnswer || !!gameAddons.hint || isLoading}
                            className="game-card__extra-info-button"
                            aria-label="Get hint from the AI"
                        >
                            Get a Hint <Lightbulb color="#facc15" fill="#facc15" className="icon" size={20} strokeWidth={2.5} />
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleExtraInfoClick(question.question, question.correct_answer, question.category)}
                            disabled={!selectedAnswer || !!gameAddons.aiTrivia || isLoading}
                            className="game-card__extra-info-button"
                            aria-label="Get additional information and a fun fact about this question"
                        >
                            Trivia Flavor <Sparkles className="icon" size={20} color="#ffd700" />
                        </Button>
                    </div>
                    {gameAddons.hint && (
                        <div className="game-card__extra-info">
                            <strong>Hint:</strong> {gameAddons.hint}
                        </div>
                    )}
                    {gameAddons.aiTrivia && (
                        <div className="game-card__extra-info" dangerouslySetInnerHTML={{ __html: gameAddons.aiTrivia.replace(/\n/g, '<br />') }}>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    )

}