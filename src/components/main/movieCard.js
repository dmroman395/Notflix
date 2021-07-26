import React from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'

function MovieCard({ movie, getMovieDetails, lang }) {
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
    }

    return (
        <div className="movie-card-container">
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
    )
}

export default MovieCard
