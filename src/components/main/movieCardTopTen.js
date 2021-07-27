import React from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'

function MovieCardTopTen({ movie, getMovieDetails, lang, index }) {
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
            {index + 1 === 10 ? <h1 className='number ten'>{index + 1}</h1>:<h1 className='number'>{index + 1}</h1>}
            <div
                className="movie-ten"
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

export default MovieCardTopTen
