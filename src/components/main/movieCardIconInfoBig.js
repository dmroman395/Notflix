import React, {useEffect, useState} from 'react'
import info from '../../images/info.png'
import '../../css/main/movieCardIconInfoBig.css'

function MovieCardIconInfoBig({icon, movie, lang, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, id}) {
    const [movieDetails, setMovieDetails] = useState({})

    const {runtime} = movieDetails

    const {
        getMovieDetails,
        getSimilarMovies
    } = require('../../controllers/moviesController')

    let infoText;

    if (lang === 'English') {
        infoText = 'More Info'
    } else {
        infoText = 'Más Info'
    }

    function handleMoreInfo() {
        if (Object.keys(selectedMovie).length === 0) {
            const modMovie = {
                ...movie,
                runtime
            }
            setSelectedMovie(modMovie)
        }
    }

    function handleHover() {
        loadDetails()
        loadSimilar()
    }

    async function loadDetails() {
        if (Object.keys(movieDetails).length === 0) {
            const details = await getMovieDetails(lang, id)
            setMovieDetails(details)
        }
    }

    async function loadSimilar() {
        if (Object.keys(similarMovies).length === 0) {
            const data = await getSimilarMovies(lang, id)
            setSimilarMovies(data)
        }
    }

    return(
        <div onClick={handleMoreInfo} onMouseEnter={handleHover} className='icon-container-big'>
            <div className='icon-circle-info-big'><img src={icon} className='card-icon'/>{infoText}
            </div>
        </div>
    )
}

export default MovieCardIconInfoBig