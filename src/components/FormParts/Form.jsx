import Select from "./Select"
import Button from "../Button"
import { useRef, useEffect } from "react"
import "./Form.css"
import ReactSwitch from 'react-switch'

export default function Form({ onSubmit, onChange, isFirstRender, minimalMode, handleToggleAnimations, handleToggleIllustrations }) {

    const formRef = useRef(null)

    useEffect(() => {
        if (!isFirstRender) {
            formRef.current.focus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="form-container" ref={formRef} tabIndex={-1}>
                <form onSubmit={onSubmit}>
                    <h1>Ready, set, quiz! Choose your topic and start your trivia adventure!</h1>
                    <h2>Select a number of questions, category and difficulty:</h2>
                    <Select onChange={onChange} />
                    <div>
                        <label htmlFor="animationsToggle" style={{ display: 'flex', alignItems: 'center' }}>
                            <ReactSwitch
                                id="animationsToggle"
                                checked={minimalMode.animations}
                                onChange={handleToggleAnimations}
                                offColor="#888"
                                onColor="#0c0"
                            />
                            <span className="toggle-label" style={{ marginRight: '10px' }}>Enable animations (may impact performance on low-end devices)</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="illustrationsToggle" style={{ display: 'flex', alignItems: 'center' }}>
                            <ReactSwitch
                                id="illustrationsToggle"
                                checked={!minimalMode.illustrations}
                                onChange={handleToggleIllustrations}
                                offColor="#888"
                                onColor="#0c0"
                            />
                            <span className="toggle-label" style={{ marginRight: '10px' }}>Disable background illustrations</span>
                        </label>
                    </div>
                    <Button className="start-button" type="submit">
                        Start Game
                    </Button>
                </form>
            </div>
        </>
    )
}