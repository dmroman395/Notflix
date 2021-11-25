import React, { useState } from 'react'
import { useAuth } from './contexts/authContext'
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
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [isExploreEmpty, setIsExploreEmpty] = useState(true)
    const [isNewPopular, setIsNewPopular] = useState(true)

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
        { isExploreEmpty ?
            <Main lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies}
            setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} getTrending={getTrending} getAction={getAction} getComedy={getComedy} getHorror={getHorror} getNowPlaying={getNowPlaying} getTopRated={getTopRated} getPopular={getPopular} getMovieDetails={getMovieDetails} getSimilarMovies={getSimilarMovies} getGenres={getGenres} isExploreEmpty={isExploreEmpty} setIsExploreEmpty={setIsExploreEmpty} isNewPopular={isNewPopular} setIsNewPopular={setIsNewPopular} nowPlayingMovies={nowPlayingMovies} setNowPlayingMovies={setNowPlayingMovies} />
            :
            <ExploreAll movies={exploreMovies} exploreMovies={exploreMovies} setExploreMovies={setExploreMovies} lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} selectedGenre={selectedGenre}setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} getMovies={getMovies} isExploreEmpty={isExploreEmpty} setIsExploreEmpty={setIsExploreEmpty} isNewPopular={isNewPopular} setIsNewPopular={setIsNewPopular} nowPlayingMovies={nowPlayingMovies} />
        }
    </React.Fragment>

    const landing = 
        <React.Fragment>
            { needsSignIn ? <LandingPage lang={lang} setLang={setLang} sendToSignIn={sendToSignIn}/> : <SignInPage lang={lang} setLang={setLang}/>
            }
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