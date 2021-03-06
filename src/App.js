import React, { useState } from 'react'
import { useAuth } from './contexts/authContext'
import LandingPage from './pages/landing'
import SignInPage from './pages/signInPage'
import Header from './components/shared/header'
import Main from './pages/main'
import ExploreAll from './pages/exploreAll'
import './css/app/App.css'

function App() {
    const [needsSignIn, setNeedsSignIn] = useState({
        status: true,
        email:''
    })
    const [selectedMovie, setSelectedMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    const [exploreMovies, setExploreMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [isExploreEmpty, setIsExploreEmpty] = useState(true)
    const [isNewPopular, setIsNewPopular] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

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
        getMovieGenres,
        getMovies
    } = require('./controllers/moviesController')

    const { getTVGenres } = require('./controllers/tvShowsController')

    const { currentUser } = useAuth()

    const sendToSignIn = (email) => {
        let modObj

        if (email) {
            modObj = {
                status: false,
                email
            }
        } else {
            modObj = {
                status: false,
                email: ''
            }
        }
        setNeedsSignIn(modObj)
    }

    const mainApp =
     <React.Fragment>
        { isExploreEmpty ?
            <React.Fragment>
                <Header setExploreMovies={setExploreMovies}  setSelectedGenre={setSelectedGenre} watchlist={watchlist} setIsExploreEmpty={setIsExploreEmpty} isExploreEmpty={isExploreEmpty} setIsNewPopular={setIsNewPopular} isSearch={isSearch} setIsSearch={setIsSearch}/>
                <Main  selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies}
                setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} getTrending={getTrending} getAction={getAction} getComedy={getComedy} getHorror={getHorror} getNowPlaying={getNowPlaying} getTopRated={getTopRated} getPopular={getPopular} getMovieDetails={getMovieDetails} getSimilarMovies={getSimilarMovies} getMovieGenres={getMovieGenres} getTVGenres={getTVGenres} isExploreEmpty={isExploreEmpty} setIsExploreEmpty={setIsExploreEmpty} isNewPopular={isNewPopular} setIsNewPopular={setIsNewPopular} nowPlayingMovies={nowPlayingMovies} setNowPlayingMovies={setNowPlayingMovies} />
            </React.Fragment>
            
            :
            <React.Fragment>
                <Header setExploreMovies={setExploreMovies}  setSelectedGenre={setSelectedGenre} watchlist={watchlist} setIsExploreEmpty={setIsExploreEmpty} isExploreEmpty={isExploreEmpty} setIsNewPopular={setIsNewPopular} isSearch={isSearch} setIsSearch={setIsSearch}/>
                <ExploreAll data={exploreMovies} exploreMovies={exploreMovies} setExploreMovies={setExploreMovies}  selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} selectedGenre={selectedGenre}setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} getMovies={getMovies} isExploreEmpty={isExploreEmpty} setIsExploreEmpty={setIsExploreEmpty} isNewPopular={isNewPopular} setIsNewPopular={setIsNewPopular} nowPlayingMovies={nowPlayingMovies} isSearch={isSearch} />
            </React.Fragment>
            
        }
    </React.Fragment>

    const landing = 
        <React.Fragment>
            { needsSignIn.status ? <LandingPage  sendToSignIn={sendToSignIn}/> : <SignInPage  needsSignIn={needsSignIn}/>
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