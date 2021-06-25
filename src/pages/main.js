import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import Header from '../components/main/header'
import Featured from '../components/main/featured'

const { getTrending, getMovies } = require('../controllers/moviesController')

function Main(lang) {
    const [movies, setMovies] = useState([])
    const [featuredMovie, setFeaturedMovie] = useState({})
    const { currentUser } = useAuth()

    let cachedMovies = []
    const trending = []

    const localMovies = localStorage.getItem('movies')

    async function loadTrending() {
        await getTrending(lang).then((movies) => {
            movies.data.results.forEach((movie) => {
                trending.push(movie)
            })
        })
        const randIndex = Math.round(Math.random() * trending.length)
        const randMovie = trending[randIndex]
        setFeaturedMovie(randMovie)
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
            const moviesArr = JSON.parse(localMovies)
            setMovies(moviesArr)
        } else {
            loadMovies(3)
            loadTrending()
        }
    }, [])

    return (
        <div>
            <Header />
            <Featured lang={lang} movie={featuredMovie} />
        </div>
    )
}

export default Main
