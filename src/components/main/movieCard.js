import React from 'react'
import '../../css/main/movieCard.css'

function MovieCard({ movie, getMovieDetails, lang }) {
    const { backdrop_path, poster_path, id, title } = movie
    let details

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
            url(https://image.tmdb.org/t/p/w400${backdrop_path})`,
                    backgroundPosition: 'center',
                }}
            >
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default MovieCard
