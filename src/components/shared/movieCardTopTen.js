import React, {useState, useEffect} from 'react'
import '../../css/shared/movieCard.css'
import logo from '../../images/logo-short.jpg'
import MovieCard from './contentCard'

function MovieCardTopTen({ movie, getMovieDetails, lang, index, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, watchlist, setWatchlist }) {
    const [hover, setHover] = useState(false)
    const [movieDetails, setMovieDetails] = useState({})

    const { poster_path, id } = movie
    const { runtime } = movieDetails

    let details
    let imagePath

    if (poster_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${poster_path}`
    }

    async function loadDetails() {
        if (Object.keys(movieDetails).length === 0) {
            const details = await getMovieDetails(lang, id)
            setMovieDetails(details.data)
            setHover(true)
        }
    }

    async function handleHover(e) {
        switch(e.type) {
            case 'mouseenter':
                await loadDetails()
                setHover(true)
                break;
            case 'mouseleave':
                setHover(false)
                break;
            default:
                break;
        }
    }

    let numberTen

    if (index + 1 === 10) {
        numberTen = <h1 className='number ten'>{index + 1}</h1>
    } else {
        numberTen = <h1 className='number'>{index + 1}</h1>
    }

    return (
        <div className="movie-ten-container" onMouseEnter={e => handleHover(e)} onMouseLeave={e => handleHover(e)}> 
        {hover ? <MovieCard 
                        lang={lang}
                        movie={movie}
                        getMovieDetails={getMovieDetails}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        similarMovies={similarMovies}
                        setSimilarMovies={setSimilarMovies}
                        watchlist={watchlist} 
                        setWatchlist={setWatchlist}
                        type={'v2'}
                        runtime2={runtime}
                        /> 
                : 
                <React.Fragment>
                    {numberTen}
                    <div
                        className="movie-ten"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${imagePath})`,
                            backgroundPosition: 'center',
                        }}
                    >
                    </div>
                </React.Fragment>
        }
        </div>
    )
}

export default MovieCardTopTen
