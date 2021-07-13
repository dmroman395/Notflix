import React from 'react'
import '../../css/main/row.css'
import MovieCard from './movieCard'

function Row({ arr, lang, getMovieDetails }) {
    const row = arr.map((movie, i) => {
        return (
            <MovieCard
                lang={lang}
                movie={movie}
                getMovieDetails={getMovieDetails}
                key={i}
            />
        )
    })
    return (
        <div className="movie-row">
            <div className="arrow-container">
                <div className="arrow"></div>
                <div className="arrow"></div>
            </div>
            <div className="movies">{row}</div>
        </div>
    )
}

export default Row
