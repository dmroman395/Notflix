import React, {useState, useEffect} from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'
import MovieCardHover from './movieCardHover'

function MovieCard({ movie, getMovieDetails, lang }) {
    const [movieDetails, setMovieDetails] = useState({})

    const { backdrop_path, id, title } = movie
    let details
    let imagePath

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    async function loadDetails() {
        details = await getMovieDetails(lang, id)
        setMovieDetails(details.data)
    }

    function handleOut() {
        setMovieDetails({})
    }

    const movieCard = 
        <div className="movie-card-container" onMouseOver={loadDetails} onMouseOut={handleOut}>
            <div
                className="movie-card"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `
                url(${imagePath})`,
                    backgroundPosition: 'center',
                }}
            >
                <h1>{title}</h1>
            </div>
        </div>

    return (
        <div>
            {Object.keys(movieDetails).length > 0 ? null: movieCard}
            <div className='movie-card-hover-container'>
                {Object.keys(movieDetails).length > 0 ? <MovieCardHover movie={movieDetails} setMovieDetails={setMovieDetails}/>:null}
            </div>
        </div>
        
    )
}

export default MovieCard
