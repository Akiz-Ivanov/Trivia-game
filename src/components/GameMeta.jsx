export default function GameMeta({ currentQuestionIndex, maxScore, category, difficulty }) {
    return (
        <div className="game-card__meta">
            <p className="game-category">{category}</p>
            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{
                        width: `${((currentQuestionIndex + 1) / maxScore) * 100}%`,
                    }}
                />
            </div>
            <span>Question {currentQuestionIndex + 1} / {maxScore} • {difficulty}</span>
        </div>
    )
}