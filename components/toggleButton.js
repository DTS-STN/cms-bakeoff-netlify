import React from 'react'

const toggleButton = ({language, toggleLanguage}) => {
    return (
        <div>
            <button type="button" className="primary" value={language} onClick={() => toggleLanguage(language)}>{language}</button>
        </div>
    )
}

export default toggleButton;
