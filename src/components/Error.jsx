import Button from "./Button"
import errorImg from "../assets/svgs/error.svg"
import { RotateCw } from "lucide-react"
import { useState, useEffect } from "react"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Error({ onClick, resetErrorBoundary }) {
    const [seconds, setSeconds] = useState(10)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev === 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        // Cleanup on component unmount
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="error-container">
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
                    className={`error-img ${imageLoaded ? 'loaded' : ''}`}
                    src={errorImg}
                    alt="Error"
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
            </div>
            <p className="error-message">
                Couldn't fetch questions from the database.
            </p>
            <strong style={{ color: "skyblue" }}>
                Most likely not enough questions found for the selected parameters. Try reducing the number of questions or changing the difficulty.
            </strong>
            <strong style={{ color: seconds > 0 ? "#ffb347" : "#9fffb8" }}>
                {seconds > 0 ? `Please wait ${seconds} seconds and click the button below to try restarting the game.` : "Click the button below to try restarting the game"}
            </strong>
            <Button
                className={`play-again-btn ${seconds > 0 ? 'countdown' : ''}`}
                type="button"
                onClick={onClick || resetErrorBoundary}
                disabled={seconds > 0}
            >
                {seconds > 0 ? `${seconds} sec` : 'Try Again'}
                {seconds === 0 && <RotateCw className="icon" size={20} strokeWidth={2} />}
            </Button>
        </div>
    )
}