import React, { useEffect, useState} from 'react'
import { useAuth } from '../contexts/authContext'
import '../css/main/main.css'
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'

import Featured from '../components/main/featured'
import Row from '../components/shared/row'
import RowNotflix from '../components/main/rowNotflix'
import RowTopTen from '../components/shared/rowTopTen'
import Footer from '../components/shared/footer'
import MoreInfo from '../components/shared/moreInfo'

const {getUserWatchList} = require('../controllers/userListController')

function Main({ selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, setExploreMovies, setSelectedGenre, watchlist, setWatchlist, getTrending, getAction, getComedy, getHorror, getNowPlaying, getTopRated, getPopular, getMovieDetails, getSimilarMovies, getMovieGenres, getTVGenres, setIsExploreEmpty, setIsNewPopular, nowPlayingMovies, setNowPlayingMovies }) {

    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [featuredMovie, setFeaturedMovie] = useState({})
    const [trendingMovies, setTrendingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const { currentUser } = useAuth()

    async function loadTrending() {
        const trending = []

        await getTrending(1).then((movies) => {
            movies.forEach((movie) => {
                trending.push(movie)
            })
        })
        setTrendingMovies(trending)
        const randIndex = Math.round(Math.random() * trending.length)
        const randMovie = trending[randIndex]
        setFeaturedMovie(randMovie)
    }

    async function loadPopular() {
        const popular = []

        await getPopular(1).then((movies) => {
            movies.forEach((movie) => {
                popular.push(movie)
            })
            setPopularMovies(popular)
        })
    }

    async function loadAction() {
        const action = []

        await getAction(1).then((movies) => {
            movies.forEach((movie) => {
                action.push(movie)
            })
            setActionMovies(action)
        })
    } 

    async function loadComedy() {
        const comedy = []

        await getComedy(1).then((movies) => {
            movies.forEach((movie) => {
                comedy.push(movie)
            })
            setComedyMovies(comedy)
        })
    }

    async function loadHorror() {
        const horror = []

        await getHorror(1).then((movies) => {
            movies.forEach((movie) => {
                horror.push(movie)
            })
            setHorrorMovies(horror)
        })
    }

    async function loadNowPlaying() {
        const nowPlaying = []

        await getNowPlaying(1).then((movies) => {
            movies.forEach((movie) => {
                nowPlaying.push(movie)
            })
            setNowPlayingMovies(nowPlaying)
        })
    }

    async function loadTopRated() {
        const topRated = []

        await getTopRated(1).then((movies) => {
            movies.forEach((movie) => {
                topRated.push(movie)
            })
            setTopRatedMovies(topRated)
        })
    }

    async function loadGenres() {
        if (window.localStorage.length === 0) {
            await getMovieGenres().then(data => {
                data.data.genres.forEach(genre => {
                    window.localStorage.setItem(genre.id, genre.name)
                })
            })
            await getTVGenres().then(data => {
                data.data.genres.forEach(genre => {
                    window.localStorage.setItem(genre.id, genre.name)
                })
            })
        }
    }

    async function loadWatchlist() {
        const data = await getUserWatchList(currentUser.uid)

        setWatchlist(data)
    }

    async function loadMovies() {
        await loadWatchlist()
        await loadTrending()
        await loadPopular()
        await loadAction()
        await loadComedy()
        await loadHorror()
        await loadNowPlaying()
        await loadTopRated()
        await loadGenres()
    }

    useEffect(() => {
        loadMovies()
    }, [])


    return (
        <div className='main'>
            {Object.keys(selectedMovie).length === 0  ? 
                null
                : 
                <MoreInfo data={selectedMovie} similarMovies={similarMovies}  setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist}/>
            }
            <Featured  movie={featuredMovie} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} watchlist={watchlist} setWatchlist={setWatchlist} nowPlayingMovies={nowPlayingMovies}/>
            <div className='rows-container'>
                {
                   (watchlist && watchlist.length != 0) ?
                    <Row
                    arr={watchlist}
                    getMovieDetails={getMovieDetails}                    
                    headline={'My List'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                /> :
                null
                }
                <Row
                    arr={popularMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Popular on Notflix'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={trendingMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Trending Now'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                
                <Row
                    arr={actionMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Action & Adventure'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <RowNotflix
                    arr={topRatedMovies}
                    getMovieDetails={getMovieDetails}
                    getSimilarMovies={getSimilarMovies}
                    setSimilarMovies={setSimilarMovies}                    
                    headline={'Only on Notflix'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <RowTopTen
                    arr={nowPlayingMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Top 10 in the U.S. Today'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={comedyMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Comedy'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={horrorMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Horror'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
            </div>
                <Footer                        
                    data={footerDataEn}
                    style={'footer3'}
                />
        </div>
    )
}

export default Main
