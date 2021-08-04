import React, {useState, useEffect} from 'react'
import '../../css/main/movieCard.css'
import logo from '../../images/logo-short.jpg'
import triangle from '../../images/triangle.png'
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
    const [removeHover, setRemoveHover] = useState(false)
    const [addHover, setAddHover] = useState(false)
    const [likeHover, setLikeHover] = useState(false)
    const [dislikeHover, setDislikeHover] = useState(false)
    const [moreInfoHover, setMoreInfoHover] = useState(false)
    const [movieDetails, setMovieDetails] = useState({})

    const { backdrop_path, id, title, vote_average, genre_ids } = movie

    let remove
    let add
    let like
    let dislike
    let moreInfo
    let details
    let imagePath

    const match = vote_average * 10

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    if (lang.lang === 'English') {
        remove = 'Remove from My List'
        add = 'Add to My List'
        like = 'I like this'
        dislike = 'Not for me'
        moreInfo = 'More info'
    } else {
        remove = 'Quitar de Mi Lista'
        add = 'Agregar a Mi Lista'
        like = 'Me gusta esto'
        dislike = 'No es para mí'
        moreInfo = 'Más información'
    }

    function handleRemoveHover(e) {
        if (e.type === 'mouseenter') {
            setRemoveHover(true)
        } else {
            setRemoveHover(false)
        }
    }

    function handleAddHover(e) {
        if (e.type === 'mouseenter') {
            setAddHover(true)
        } else {
            setAddHover(false)
        }
    }

    function handleLikeHover(e) {
        if (e.type === 'mouseenter') {
            setLikeHover(true)
        } else {
            setLikeHover(false)
        }
    }

    function handleDislikeHover(e) {
        if (e.type === 'mouseenter') {
            setDislikeHover(true)
        } else {
            setDislikeHover(false)
        }
    }

    function handleMoreInfoHover(e) {
        if (e.type === 'mouseenter') {
            setMoreInfoHover(true)
            console.log('enter')
        } else {
            setMoreInfoHover(false)
            console.log('leave')
        }
    }

    async function loadDetails() {
        if (Object.keys(movieDetails).length === 0) {
            // details = await getMovieDetails(lang, id)
            // setMovieDetails(details.data)
        }
        
        setHover(true)
    }

    function handleOut() {
        // setMovieDetails({})
        setHover(false)
    }

    const removeBubble = 
        <div className='bubble-container'>
            <div className='bubble-text'>{remove}</div>
            <img id='triangle' src={triangle}></img>
        </div>

    const addBubble = 
        <div className='bubble-container'>
            <div className='bubble-text'>{add}</div>
            <img id='triangle' src={triangle}></img>
        </div>

    const likeBubble = 
        <div className='bubble-container'>
            <div className='bubble-text'>{like}</div>
            <img id='triangle' src={triangle}></img>
        </div>

    const dislikeBubble = 
        <div className='bubble-container'>
            <div className='bubble-text'>{dislike}</div>
            <img id='triangle' src={triangle}></img>
        </div>

    const moreInfoBubble = 
        <div className='bubble-container'>
            <div className='bubble-text'>{moreInfo}</div>
            <img id='triangle' src={triangle}></img>
        </div>

    const bottomHalf = 
            <div className='bottom-half'>
                <div className='icon-row'>
                    <div className='icons'>
                        <div className='icon-circle-play'><Play id ='card-icon'/></div>
                            <div onMouseEnter={e => handleRemoveHover(e)} onMouseLeave={e => handleRemoveHover(e)}>
                                {removeHover? removeBubble: null}
                                <div className='icon-circle' ><Check id='card-icon'/></div> 
                            </div>
                            <div onMouseEnter={e => handleAddHover(e)} onMouseLeave={e => handleAddHover(e)}>
                                {addHover? addBubble: null}
                                <div className='icon-circle' ><Add id='card-icon' /></div>
                            </div>    
                            <div onMouseEnter={e => handleLikeHover(e)} onMouseLeave={e => handleLikeHover(e)}>
                                {likeHover? likeBubble: null}
                                <div className='icon-circle' ><ThumbsUp id='card-icon' /></div>
                            </div>
                            <div onMouseEnter={e => handleDislikeHover(e)} onMouseLeave={e => handleDislikeHover(e)}>   
                                {dislikeHover? dislikeBubble: null} 
                                <div className='icon-circle' ><ThumbsDown id='card-icon'/></div>
                            </div>
                        </div>
                    <div onMouseEnter={e => handleMoreInfoHover(e)} onMouseLeave={e => handleMoreInfoHover(e)}>
                        {moreInfoHover? moreInfoBubble: null}
                        <div className='icon-circle'><DownArrow id='card-icon' /></div>
                    </div>
                </div>
                <div className='match-row'>
                    <span className='match'>{`${match}% Match`}</span>
                    <span className='runtime'>Runtime</span>
                    <span className='hd'>HD</span>
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
