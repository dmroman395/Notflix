import React from "react"
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'
import Header from '../components/main/header'
import Footer from '../components/shared/footer'
import MovieCard from "../components/exploreAll/movieCard"
import MoreInfo from '../components/exploreAll/moreInfo'
import '../css/exploreAll/exploreAll.css'

function ExploreAll({movies, lang, setLang, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, selectedGenre, watchlist, setWatchlist}) {

    const {
        getMovieDetails
    } = require('../controllers/moviesController')

    const allMovies = movies.map((movie, i) => {
        return (
            <div>
                <MovieCard
                    lang={lang}
                    movie={movie}
                    getMovieDetails={getMovieDetails}
                    key={i}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                />
            </div>
        )
    })


    return (
        <div className='exploreAll'>
                {Object.keys(selectedMovie).length === 0  ? 
                    null
                    : 
                    <MoreInfo movie={selectedMovie} similarMovies={similarMovies} lang={lang} setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist}/>
                }
            <Header />
            <div className='content'>
                <h1 className='genre'>{selectedGenre}</h1>
                <div className='movies-grid'>
                    {allMovies}
                </div>
            </div>
            {lang.lang === 'English' ? 
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

export default ExploreAll