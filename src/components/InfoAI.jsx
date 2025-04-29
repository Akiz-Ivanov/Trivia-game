import React from 'react';
import { useEffect, useRef } from 'react';

const GameCardExtraInfo = ({ label, content }) => {

    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.scrollIntoView({ behavior: 'smooth' })
        ref.current.focus()
    }, [])

    return (
        <div className="game-card__extra-info" ref={ref} tabIndex={-1}>
            {label === 'Hint' && <strong>{label}:</strong>}
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
        </div>
    )
}

export default GameCardExtraInfo;