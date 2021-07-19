import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import '../css/main/main.css'
import Header from '../components/main/header'
import Featured from '../components/main/featured'
import Row from '../components/main/row'

const {
    getTrending,
    getMovies,
    getPopular,
    getMovieDetails,
} = require('../controllers/moviesController')

function Main(lang) {
    const [movies, setMovies] = useState([])
    const [featuredMovie, setFeaturedMovie] = useState({})
    const [trendingMovies, setTrendingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const { currentUser } = useAuth()

    let cachedMovies = []

    const localMovies = localStorage.getItem('movies')

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

    async function loadMovies(num) {
        for (let i = 1; i <= num; i++) {
            await getMovies(lang, i).then((movies) => {
                movies.data.results.forEach((movie) => {
                    cachedMovies.push(movie)
                })
            })
        }
        const cachedMoviesStr = JSON.stringify(cachedMovies)
        localStorage.setItem('movies', cachedMoviesStr)
    }

    useEffect(() => {
        if (localMovies) {
            loadTrending()
            loadPopular()
            const moviesArr = JSON.parse(localMovies)
            setMovies(moviesArr)
        } else {
            loadMovies(3)
            loadTrending()
            loadPopular()
        }
    }, [])

    return (
        <div className="main">
            <Header/>
            <Featured lang={lang} movie={featuredMovie}/>
            <Row
                arr={popularMovies}
                getMovieDetails={getMovieDetails}
                lang={lang}
            />
        </div>
    )
}

export default Main
