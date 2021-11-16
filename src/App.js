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
    const [watchlist, setWatchlist] = useState([])

    const {
        getTrending,
        getAction,
        getComedy,
        getHorror,
        getNowPlaying,
        getTopRated,
        getPopular,
        getMovieDetails,
        getSimilarMovies,
        getGenres,
        getMovies
    } = require('./controllers/moviesController')

    const { currentUser } = useAuth()

    const sendToSignIn = () => {
        setNeedsSignIn(false)
    }

    const mainApp =
     <React.Fragment>
        {exploreMovies.length === 0 ?
            <Main lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies}
            setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} getTrending={getTrending} getAction={getAction} getComedy={getComedy} getHorror={getHorror} getNowPlaying={getNowPlaying} getTopRated={getTopRated} getPopular={getPopular} getMovieDetails={getMovieDetails} getSimilarMovies={getSimilarMovies} getGenres={getGenres} />
            :
            <ExploreAll movies={exploreMovies} setExploreMovies={setExploreMovies} lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} selectedGenre={selectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} getMovies={getMovies} />
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