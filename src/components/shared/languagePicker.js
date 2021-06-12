import React from 'react'

function LanguagePicker({ lang, setLang }) {
    const changeLang = () => {
        if (lang === 'English') {
            setLang('Spanish')
        } else {
            setLang('English')
        }
    }

    return (
        <select defaultValue={lang} value={lang} onChange={changeLang}>
            <option
                lang="en"
                value="English"
                data-language="en"
                data-country="US"
            >
                English
            </option>
            <option
                lang="es"
                value="Spanish"
                data-language="es"
                data-country="US"
            >
                Español
            </option>
        </select>
    )
}

export default LanguagePicker
