import React, {useState} from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'
import MovieCard from './movieCard'

function MovieCardTopTen({ movie, getMovieDetails, lang, index }) {
    const {hover, setHover} = useState(false)
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

    // function handleHover(e) {
    //     switch(e.type) {
    //         case 'mouseenter':
    //             console.log('testinnnnnnnngggggggg')
    //             setHover(true)
    //             break;
    //         case 'mouiseexit':
    //             setHover(false)
    //             break;
    //         default:
    //             break;
    //     }
    // }

    return (
        <div className="movie-ten-container"> 
        {/* {hover ? <MovieCard movie={movie} lang={lang}/> : ( */}
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
