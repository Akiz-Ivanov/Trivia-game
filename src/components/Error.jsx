import Button from "./Button"

export default function Error({ onClick }) {
    return (
        <div className="error-container">
            <p className="error-message">
                Couldn't fetch questions from the API. Most likely not enough questions found for the selected parameters.
            </p>
            <strong>Try reducing the number of questions or changing the difficulty. Please come back later or click the button below to try restarting the game.</strong>
            <Button onClick={onClick}>Restart Game</Button>
        </div>
    )
}