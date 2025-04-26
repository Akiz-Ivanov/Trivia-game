import Button from "./Button"
import errorImg from "../assets/svgs/error.svg"
import { RotateCw } from "lucide-react"

export default function Error({ onClick, resetErrorBoundary }) {

    return (
        <div className="error-container">
            <img className="error-img" src={errorImg} alt="Success" />
            <p className="error-message">
                Couldn't fetch questions from the API.
            </p>
            <strong>Most likely not enough questions found for the selected parameters. Try reducing the number of questions or changing the difficulty.</strong>
            <strong>Please wait 10-15 seconds and click the button below to try restarting the game.</strong>
            <Button
                className="play-again-btn"
                type="button"
                onClick={onClick || resetErrorBoundary}
            >
                Try Again <RotateCw className="icon" size={20} strokeWidth={2} />
            </Button>
        </div>
    )
}