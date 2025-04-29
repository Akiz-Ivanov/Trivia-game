import ReactSwitch from "react-switch";
import "./Options.css"; // Add styles later

export default function OptionsModal({
    isOpen,
    onClose,
    minimalMode,
    handleToggleAnimations,
    handleToggleIllustrations,
    isMusicPlaying,
    toggleMusic,
}) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            
            tabIndex={-1}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    onClose();
                }
            }}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 style={{ textAlign: "center" }} id="modal-title">Options</h2>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                    ×
                </button>
                <p id="modal-description" style={{ textAlign: "center",  marginBottom: "1rem" }}>Adjust the settings for audio and performance.</p>
                <div className="modal-section">
                    <h3>Audio</h3>
                    <label htmlFor="musicToggle" style={{ display: "flex", alignItems: "center" }} autoFocus>
                        <ReactSwitch
                            id="musicToggle"
                            checked={isMusicPlaying}
                            onChange={toggleMusic}
                            offColor="#888"
                            onColor="#0c0"
                        />
                        <span className="toggle-label">Background Music</span>
                    </label>
                </div>

                <div className="modal-section">
                    <h3>Performance</h3>
                    <label htmlFor="animationsToggle" style={{ display: "flex", alignItems: "center" }}>
                        <ReactSwitch
                            id="animationsToggle"
                            checked={minimalMode.animations}
                            onChange={handleToggleAnimations}
                            offColor="#888"
                            onColor="#0c0"
                            aria-checked={minimalMode.animations ? 'true' : 'false'}
                            aria-label="Enable animations"
                        />
                        <span className="toggle-label">Enable Animations</span>
                    </label>
                    <label htmlFor="illustrationsToggle" style={{ display: "flex", alignItems: "center" }}>
                        <ReactSwitch
                            id="illustrationsToggle"
                            checked={!minimalMode.illustrations}
                            onChange={handleToggleIllustrations}
                            offColor="#888"
                            onColor="#0c0"
                            aria-checked={!minimalMode.illustrations ? 'true' : 'false'}
                            aria-label="Disable illustrations"
                        />
                        <span className="toggle-label">Disable Illustrations</span>
                    </label>
                </div>
            </div>
        </div>
    )
}