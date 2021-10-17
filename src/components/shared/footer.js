import React from 'react'
import LanguagePicker from '../shared/languagePicker'
import '../../css/shared/footer.css'

function Footer({ lang, setLang, data, style }) {
    let questions

    if (lang == 'English') {
        questions = 'Questions? Call '
    } else {
        questions = '¿Preguntas? Llama al '
    }

    const list = data.map((link, i) => {
        return (
            <li key={i}>
                <a href={`${link.link}`}>{link.display}</a>
            </li>
        )
    })

    const changeLang = () => {
        if (lang === 'English') {
            setLang('English')
        } else {
            setLang('Spanish')
        }
    }

    return (
        <div className={style}>
            <h5>
                {questions}
                <a href="tel:1-844-505-2993">1-844-505-2993</a>
            </h5>
            <div>
                <ul className="footer-list">{list}</ul>
            </div>
            <div className="lang-signin">
                <LanguagePicker lang={lang} setLang={setLang} />
            </div>
        </div>
    )
}

export default Footer
