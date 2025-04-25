import Button from "./Button"
import errorImg from "../assets/svgs/error.svg"

export default function Error({ onClick }) {
    
    return (
        <div className="error-container">
            <img className="error-img" src={errorImg} alt="Success" />
            <p className="error-message">
                Couldn't fetch questions from the API. Most likely not enough questions found for the selected parameters.
            </p>
            <strong>Try reducing the number of questions or changing the difficulty. Please click the button below to try restarting the game.</strong>
            <Button className="play-again-btn" type="button" onClick={onClick}>Restart Game</Button>
        </div>
    )
}