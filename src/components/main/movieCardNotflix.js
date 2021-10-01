import React from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'

function MovieCardNotflix({ movie, getMovieDetails, lang }) {
    const {  poster_path, id } = movie
    let details
    let imagePath

    if (poster_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${poster_path}`
    }

    async function loadDetails() {
        details = await getMovieDetails(lang, id)
    }

    return (
        <div className="movie-container">
            <div
                className="movie-poster"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `linear-gradient(
                        to top,
                        rgba(20,20,20, .9) 1%, 
                        rgba(0, 0, 0, 0) 30%
                    ),
                    url(${imagePath})`,
                    backgroundPosition: 'center',
                }}
            >
            </div>
        </div>
    )
}

export default MovieCardNotflix
