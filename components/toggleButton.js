import React from 'react'
import styles from '../styles/button.module.css'
const toggleButton = ({language, toggleLanguage}) => {
    return (
        <div>
            <button variant="primary" type="button" className={styles.button} value={language} onClick={() => toggleLanguage(language)}>
                {language === 'en' ? 'fr' : 'en'}
            </button>
        </div>
    )
}
export default toggleButton;
