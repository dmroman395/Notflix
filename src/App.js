import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/authContext'
import LandingPage from './pages/landing'
import SignInPage from './pages/signInPage'
import Main from './pages/main'
import ExploreAll from './pages/exploreAll'
import './css/app/App.css'

function App() {
    const [lang, setLang] = useState('English')
    const [needsSignIn, setNeedsSignIn] = useState(true)
    const [selectedMovie, setSelectedMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    const [exploreMovies, setExploreMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState([])

    const { currentUser } = useAuth()

    const sendToSignIn = () => {
        setNeedsSignIn(false)
    }

    const mainApp =
     <React.Fragment>
        {exploreMovies.length === 0 ?
            <Main lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies}
            setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre} />
            :
            <ExploreAll movies={exploreMovies} setExploreMovies={setExploreMovies} lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} selectedGenre={selectedGenre} />
        }
    </React.Fragment>

    const landing = 
        <React.Fragment>
            { needsSignIn ? <LandingPage lang={lang} setLang={setLang} sendToSignIn={sendToSignIn}/> : <SignInPage lang={lang} setLang={setLang}/>}
        </React.Fragment>

    return (
        <React.Fragment>
            {
                currentUser != null ? mainApp : landing
            }
        </React.Fragment>
    )
}

export default App