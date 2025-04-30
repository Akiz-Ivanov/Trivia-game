import { useState } from "react"
import Button from "./Button"
import './Results.css'
import success from "../assets/svgs/Breaking barriers-bro.svg"
import { Power } from "lucide-react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Results({ score, maxScore, resetGame, minimalMode }) {

    const [imageLoaded, setImageLoaded] = useState(false);

    const scorePercentage = (score / maxScore) * 100;

    const message =
        scorePercentage < 33 ? "Better luck next time!" :
            scorePercentage < 66 ? "Pretty good!" :
                "Great job!"

    const messageStyle =
        scorePercentage < 33 ? "#ff7043" :
            scorePercentage < 66 ? "#9fffb8" :
                "#81c784";

    const imgStyle = minimalMode.animations
        ? { animation: 'floatIn 1s ease-in-out', transform: 'none', opacity: 1 }
        : {};

    return (
        <div className="results-card">
            {minimalMode.illustrations && (
                <div className="error-img-wrapper">
                    {!imageLoaded && (
                        <Skeleton
                            containerClassName="skeleton-wrapper"
                            height="100%"
                            width="100%"
                            baseColor="rgba(100, 150, 255, 0.08)"
                            highlightColor="rgba(180, 220, 255, 0.15)"
                        />
                    )}
                    <img 
                        src={success} 
                        alt="Success" 
                        onLoad={() => setImageLoaded(true)} 
                        style={imgStyle} />
                </div>
            )}
            <p className="score-text">Correct answers: {score} out of {maxScore}.</p>
            <p className="percentage-text">Percentage: {scorePercentage.toFixed(2)}%</p>
            <p className="message-text" style={{ color: messageStyle }}>{message}</p>
            <Button className="play-again-btn" type="button" onClick={resetGame}>
                Play Again <Power className="icon" size={20} strokeWidth={2} />
            </Button>
        </div>
    )
}