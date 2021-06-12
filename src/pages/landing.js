import React from 'react'

import accordianDataEn from '../data/en/accordian.json'
import accordianDataEs from '../data/es/accordian.json'
import footerDataEn from '../data/en/footer.json'
import footerDataEs from '../data/es/footer.json'
import Accordian from '../components/landing/accordian'
import EmailSignUp from '../components/landing/emailSignUp'
import Footer from '../components/shared/footer'
import Hero from '../components/landing/hero'
import RowContainer from '../components/landing/rowsContainer'
import rowDataEn from '../data/en/row.json'
import rowDataEs from '../data/es/row.json'
import '../css/landing/faq.css'

function LandingPage({ lang, setLang }) {
    let FAQ

    if (lang === 'English') {
        FAQ = 'Frequently Asked Questions'
    } else {
        FAQ = 'Preguntas Frecuentes'
    }

    return (
        <div className="landing">
            <Hero lang={lang} setLang={setLang} />
            {lang === 'English' ? (
                <RowContainer rowsInfo={rowDataEn} lang={lang} />
            ) : (
                <RowContainer rowsInfo={rowDataEs} lang={lang} />
            )}
            <div className="faq">
                <h1>{FAQ}</h1>
                {lang === 'English' ? (
                    <Accordian data={accordianDataEn} />
                ) : (
                    <Accordian data={accordianDataEs} />
                )}
                <div className="signup">
                    <EmailSignUp lang={lang} />
                </div>
            </div>
            {lang === 'English' ? (
                <Footer
                    lang={lang}
                    setLang={setLang}
                    data={footerDataEn}
                    style={'footer1'}
                />
            ) : (
                <Footer
                    lang={lang}
                    setLang={setLang}
                    data={footerDataEs}
                    style={'footer1'}
                />
            )}
        </div>
    )
}

export default LandingPage
