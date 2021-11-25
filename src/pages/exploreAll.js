import React, {useState} from "react"
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'
import Header from '../components/shared/header'
import Footer from '../components/shared/footer'
import MovieCard from "../components/shared/movieCard"
import MoreInfo from '../components/shared/moreInfo'
import NewPopular from "../components/exploreAll/newPopular"
import '../css/exploreAll/exploreAll.css'

function ExploreAll({movies, lang, setLang, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, selectedGenre, watchlist, setWatchlist, setExploreMovies, exploreMovies, getMovies, setSelectedGenre, setIsExploreEmpty, isExploreEmpty, setIsNewPopular, isNewPopular, nowPlayingMovies}) {
    const [pageCount, setPageCount] = useState(2)

    const {
        getMovieDetails
    } = require('../controllers/moviesController')

    const moviesMap = movies.map((movie, i) => {
        return (
                <MovieCard
                    lang={lang}
                    movie={movie}
                    getMovieDetails={getMovieDetails}
                    key={i}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                    movies={movies}
                    setExploreMovies={setExploreMovies}
                    exploreMovies={movies}
                    type={'2'}
                />
                
        )
    })

    async function loadMore () {
        const movieList = await getMovies(lang, selectedGenre, pageCount, 1)
        const newCount = pageCount + 1
        setPageCount(newCount)
        let newList = [...movies]
        for (let movie of movieList.data.results) {
            newList.push(movie)
        }
        setExploreMovies(newList)        
    }

    window.onscroll = () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        if (scrollTop + clientHeight >= scrollHeight - 75) {
            loadMore()
        }
    }

    let content

    if (isNewPopular) {
        content =
            <div className='content'>
                <NewPopular lang={lang} nowPlayingMovies={nowPlayingMovies} getMovieDetails={getMovieDetails} setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} setIsExploreEmpty={setIsExploreEmpty} isExploreEmpty={isExploreEmpty} setIsNewPopular={setIsNewPopular} exploreMovies={exploreMovies}/>
            </div>
    } else {
        content = 
            <div className='content'>
                <h1 className='genre'>{selectedGenre}</h1>
                <div className='movies-grid'>
                    {movies.length > 0 ? moviesMap : <h1 className='empty-list'>Looks like you don't have any movies in your watchlist</h1>}
                </div>
            </div>
    }

    return (
        <div className='exploreAll'>
                {Object.keys(selectedMovie).length === 0  ? 
                    null
                    : 
                    <MoreInfo movie={selectedMovie} similarMovies={similarMovies} lang={lang} setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist}/>
                }
            <Header setExploreMovies={setExploreMovies} lang={lang} setSelectedGenre={setSelectedGenre} watchlist={watchlist} setIsExploreEmpty={setIsExploreEmpty} setIsNewPopular={setIsNewPopular}/>
            {content}
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