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
        <div className="movie-card-container">
            <div
                className="movie-poster"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `
            url(${imagePath})`,
                    backgroundPosition: 'center',
                }}
            >
            </div>
        </div>
    )
}

export default MovieCardNotflix
