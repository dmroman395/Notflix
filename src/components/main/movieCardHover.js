import React, {useState} from 'react'
import '../../css/main/movieCard.css'
import plus from '../../images/plus.png'
import thumbsUpLogo from '../../images/thumbs-up.png'
import thumbsDownLogo from '../../images/thumbs-down.png'
import downArrow from '../../images/down-chevron.png'
import play from '../../images/play.png'
import logo from '../../images/logo-short.jpg'

function MovieCardHover({ movie, setMovieDetails }) {
    const [add, setAdd] = useState(false)
    const [thumbsUp, setThumbsUp] = useState(false)
    const [thumbsDown, setThumbsDown] = useState(false)
    const [moreInfo, setMoreInfo] = useState(false)

    const {backdrop_path, title} = movie

    let imagePath

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    function handleOut() {
        setMovieDetails({})
    }
    
    return (
        <div className="movie-card-hover" onMouseOut={handleOut}>
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
            <div className='bottom-half'>
                <div className='icon-row'>
                    <div className='icons'>
                        <div className='icon-circle'><img src={play}></img></div>
                        <div className='icon-circle'><img src={plus}></img></div>
                        <div className='icon-circle'><img src={thumbsUpLogo}></img></div>
                        <div className='icon-circle'><img src={thumbsDownLogo}></img></div>
                    </div>
                    <div className='icon-circle'><img src={downArrow}></img></div>
                </div>
                <div>
                    <span>Match</span>
                    <span>Runtime</span>
                    <div>HD</div>
                </div>
                <div>Genres</div>
            </div>
        </div>
    )
}

export default MovieCardHover
