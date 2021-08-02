import React, {useState, useEffect} from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'
import Check from '../../images/check.svg'
import Add from '../../images/add.svg'
import ThumbsUp from '../../images/thumbs-up.svg'
import ThumbsDown from '../../images/thumbs-down.svg'
import ThumbsUpFilled from '../../images/thumbs-up-filled.svg'
import ThumbsDownFilled from '../../images/thumbs-down-filled.svg'
import DownArrow from '../../images/down-chevron.svg'
import Play from '../../images/play-button.svg'


function MovieCard({ movie, getMovieDetails, lang }) {
    const [hover, setHover] = useState(false)
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
        // details = await getMovieDetails(lang, id)
        // setMovieDetails(details.data)
        setHover(true)
    }

    function handleOut() {
        // setMovieDetails({})
        setHover(false)
    }

    const bottomHalf = 
            <div className='bottom-half'>
                <div className='icon-row'>
                    <div className='icons'>
                        <div className='icon-circle-play'><Play id='card-icon'/></div>
                        <div>
                            <div className='bubble-container'>
                                <div className='bubble'>Remove</div>
                            </div>                            
                            <div className='icon-circle'><Check id='card-icon'/></div>
                        </div>
                        <div>
                            <div className='bubble-container'>
                                <div className='bubble'>Add to List</div>
                            </div>                           
                            <div className='icon-circle'><Add id='card-icon'/></div>
                        </div>
                        <div>
                            <div className='bubble-container'>
                                <div className='bubble'>Like</div>
                            </div>                            
                            <div className='icon-circle'><ThumbsUp id='card-icon' /></div>
                        </div>
                        <div>
                            <div className='bubble-container'>
                                <div className='bubble'>Dislike</div> 
                            </div>
                            <div className='icon-circle'><ThumbsDown id='card-icon'/></div>
                        </div>
                    </div>
                    <div>
                        <div className='bubble-container'>
                            <div className='bubble'>More Info</div>
                        </div>
                        <div className='icon-circle'><DownArrow id='card-icon'/></div>
                    </div>
                    
                </div>
                <div>
                    <span>Match</span>
                    <span>Runtime</span>
                    <div>HD</div>
                </div>
                <div>Genres</div>
            </div>
        
    return (
        <div className="movie" onMouseOver={loadDetails} onMouseLeave={handleOut}>
            <div
                className="movie-card"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `
                url(${imagePath})`,
                    backgroundPosition: 'center',
                }}
            >
                <h1 id='title'>{title}</h1>
            </div>
            {bottomHalf}
        </div>
        
    )
}

export default MovieCard
