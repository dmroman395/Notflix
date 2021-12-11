import React, {useState, useEffect} from 'react'
import '../../css/shared/movieCard.css'
import logo from '../../images/logo-short.jpg'
import ContentCard from './contentCard'

function MovieCardTopTen({ movie, getMovieDetails, lang, index, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, watchlist, setWatchlist }) {
    const [movieDetails, setMovieDetails] = useState({})
    const [hover, setHover] = useState(false)

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
            const details = await getMovieDetails(lang, id)
            setMovieDetails(details)
            setHover(true)
    }

    async function handleHover(e) {
        switch(e.type) {
            case 'mouseenter':
                await loadDetails()
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
        {hover ? <ContentCard 
                        lang={lang}
                        data={movieDetails}
                        getMovieDetails={getMovieDetails}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        similarMovies={similarMovies}
                        setSimilarMovies={setSimilarMovies}
                        watchlist={watchlist} 
                        setWatchlist={setWatchlist}
                        type={''}
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
