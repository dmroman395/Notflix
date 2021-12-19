import React from 'react'

import accordianDataEn from '../data/en/accordian.json'
import footerDataEn from '../data/en/footer.json'
import Accordian from '../components/landing/accordian'
import EmailSignUp from '../components/landing/emailSignUp'
import Footer from '../components/shared/footer'
import Hero from '../components/landing/hero'
import RowContainer from '../components/landing/rowsContainer'
import rowDataEn from '../data/en/row.json'
import '../css/landing/faq.css'

function LandingPage({ sendToSignIn} ) {

    return (
        <div className="landing">
            <Hero  sendToSignIn={sendToSignIn} />
            <RowContainer rowsInfo={rowDataEn}  />
            <div className="faq">
                <h1>Frequently Asked Questions</h1>
                    <Accordian data={accordianDataEn} />
                <div className="signup">
                    <EmailSignUp  sendToSignIn={sendToSignIn}/>
                </div>
            </div>
                <Footer
                    data={footerDataEn}
                    style={'footer1'}
                />
        </div>
    )
}

export default LandingPage
