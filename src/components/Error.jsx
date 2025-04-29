import Button from "./Button"
import errorImg from "../assets/svgs/error.svg"
import { RotateCw } from "lucide-react"
import { useState, useEffect } from "react"

export default function Error({ onClick, resetErrorBoundary }) {
    const [seconds, setSeconds] = useState(10)

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
            <img className="error-img" src={errorImg} alt="Error" />
            <p className="error-message">
                Couldn't fetch questions from the database.
            </p>
            <strong style={{ color: "skyblue" }}>
                Most likely not enough questions found for the selected parameters. Try reducing the number of questions or changing the difficulty.
            </strong>
            <strong style={{ color: seconds > 0 ? "orangered" : "green" }}>
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