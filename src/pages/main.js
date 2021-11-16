import React, { useEffect, useState} from 'react'
import { useAuth } from '../contexts/authContext'
import '../css/main/main.css'
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'
import Header from '../components/main/header'
import Featured from '../components/main/featured'
import Row from '../components/main/row'
import RowNotflix from '../components/main/rowNotflix'
import RowTopTen from '../components/main/rowTopTen'
import Footer from '../components/shared/footer'
import axios from 'axios'
import MoreInfo from '../components/main/moreInfo'

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
    getGenres
} = require('../controllers/moviesController')

const {getUserWatchList} = require('../controllers/userListController')

function Main({lang, setLang, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, setExploreMovies, setSelectedGenre, watchlist, setWatchlist }) {
    const [movieDetails, setMovieDetails] = useState({})
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [featuredMovie, setFeaturedMovie] = useState({})
    const [trendingMovies, setTrendingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const { currentUser } = useAuth()

    async function loadTrending() {
        const trending = []

        await getTrending(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
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

        await getPopular(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                popular.push(movie)
            })
            setPopularMovies(popular)
        })
    }

    async function loadAction() {
        const action = []

        await getAction(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                action.push(movie)
            })
            setActionMovies(action)
        })
    } 

    async function loadComedy() {
        const comedy = []

        await getComedy(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                comedy.push(movie)
            })
            setComedyMovies(comedy)
        })
    }

    async function loadHorror() {
        const horror = []

        await getHorror(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                horror.push(movie)
            })
            setHorrorMovies(horror)
        })
    }

    async function loadNowPlaying() {
        const nowPlaying = []

        await getNowPlaying(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                nowPlaying.push(movie)
            })
            setNowPlayingMovies(nowPlaying)
        })
    }

    async function loadTopRated() {
        const topRated = []

        await getTopRated(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                topRated.push(movie)
            })
            setTopRatedMovies(topRated)
        })
    }

    async function loadGenres() {
        if (window.localStorage.length === 0) {
            await getGenres(lang).then(data => {
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
                <MoreInfo movie={selectedMovie} similarMovies={similarMovies} lang={lang} setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist}/>
            }
            <Header/>
            <Featured lang={lang} movie={featuredMovie} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} watchlist={watchlist} setWatchlist={setWatchlist}/>
            <div className='rows-container'>
                {
                   (watchlist && watchlist.length != 0) ?
                    <Row
                    arr={watchlist}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'My List'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                /> :
                null
                }
                <Row
                    arr={popularMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Popular on Notflix'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                />
                <Row
                    arr={trendingMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Trending Now'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                />
                
                <Row
                    arr={actionMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Action & Adventure'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                />
                <RowNotflix
                    arr={topRatedMovies}
                    getMovieDetails={getMovieDetails}
                    getSimilarMovies={getSimilarMovies}
                    setSimilarMovies={setSimilarMovies}
                    lang={lang}
                    headline={'Only on Notflix'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                />
                <RowTopTen
                    arr={nowPlayingMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Top 10 in the U.S. Today'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                />
                <Row
                    arr={comedyMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Comedy'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                />
                <Row
                    arr={horrorMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Horror'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                />
            </div>
            {lang === 'English' ? 
                    <Footer
                        lang={lang}
                        setLang={setLang}
                        data={footerDataEn}
                        style={'footer3'}
                    />
                 : 
                    <Footer
                        lang={lang}
                        setLang={setLang}
                        data={footerDataEs}
                        style={'footer3'}
                    />
            }
        </div>
    )
}

export default Main
