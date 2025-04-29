import Button from "./Button"
import './Results.css'
import success from "../assets/svgs/Breaking barriers-bro.svg"
import { Power } from "lucide-react"

export default function Results({ score, maxScore, resetGame, minimalMode }) {
    const scorePercentage = (score / maxScore) * 100;

    const message =
        scorePercentage < 33 ? "Better luck next time!" :
        scorePercentage < 66 ? "Pretty good!" :
        "Great job!"

    const messageStyle =
        scorePercentage < 33 ? "#e74c3c" :
        scorePercentage < 66 ? "#f1c40f" :
        "#2ecc71";


    const imgStyle = minimalMode.animations
        ? { animation: 'floatIn 1s ease-in-out', transform: 'none', opacity: 1 }
        : {};

    return (
        <div className="results-card">
            {minimalMode.illustrations
                && <img src={success} alt="Success" style={imgStyle} />}
            <p className="score-text">Correct answers: {score} out of {maxScore}.</p>
            <p className="percentage-text">Percentage: {scorePercentage.toFixed(2)}%</p>
            <p className="message-text" style={{ color: messageStyle }}>{message}</p>
            <Button className="play-again-btn" type="button" onClick={resetGame}>
                Play Again <Power className="icon" size={20} strokeWidth={2} />
            </Button>
        </div>
    )
}