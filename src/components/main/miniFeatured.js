import React, {useState, useEffect} from 'react'
import '../../css/main/featured.css'
import MovieCardIcon from './movieCardIcon'
import MovieCardIconPlayBig from './movieCardIconPlayBig'

import logo from '../../images/logo-short.jpg'
import check from '../../images/check.png'
import cancel from '../../images/cancel.png'
import plus from '../../images/plus.png'
import thumbsUp from '../../images/like.png'
import thumbsDown from '../../images/dislike.png'
import thumbsUpFilled from '../../images/like-filled.png'
import thumbsDownFilled from '../../images/dislike-filled.png'
import playButton from '../../images/play-button.png'

function MiniFeatured({ movie, lang, setSelectedMovie, watchList, setWatchlist, isInList, setIsInList}) {
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const { backdrop_path, title } = movie

    let play
    let remove
    let add
    let like
    let dislike
    let imagePath
    let moreMovies

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/original/${backdrop_path}`
    }

    if (lang === 'English') {
        play = 'Play'
        remove = 'Remove from My List'
        add = 'Add to My List'
        like = 'I like this'
        dislike = 'Not for me'
    } else {
        play = 'Reproducir'
        remove = 'Quitar de Mi Lista'
        add = 'Agregar a Mi Lista'
        like = 'Me gusta esto'
        dislike = 'No es para mí'
    }

    function handleCancel() {
        const reset = {}
        document.body.style.overflowY = 'scroll'
        document.body.style.position = '';
        document.body.style.top = '';
        const moreInfoContainer = document.querySelector('.moreInfo-container')
        moreInfoContainer.style.opacity = '0'
        const overlay = document.querySelector('.overlay')
        overlay.addEventListener('transitionend', () => setSelectedMovie(reset))
    }

    function handleIconState(e) {
        const type = e.target.id

        switch(type) {
            case 'like':
                setLiked(!liked)
                break;
            case 'dislike':
                setDisliked(!disliked)
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        if (watchList) {
            for (let item of watchList) {
                if (item.id == movie.id) {
                    setIsInList(true)
                }
            }
        }
    },[watchList])

    return (
        <div
            className="moreInfo-featured"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `linear-gradient(
                    to top,
                    rgba(20,20,20, 1) 1%, 
                    rgba(0, 0, 0, 0) 50%
                ),
                url(https://image.tmdb.org/t/p/original/${imagePath})`,
                backgroundPosition: 'center center',
            }}
        >
            <div className='cancel-container'>
                <div className='cancel' onClick={handleCancel}>
                    <img src={cancel}></img>
                </div>
            </div>
            <div className="content">
                <h1>{title}</h1>
                <div className='icon-row'>
                    <MovieCardIconPlayBig icon={playButton} text={play} title={title} lang={lang}/>
                    {isInList ? <MovieCardIcon icon={check} text={remove} id={'remove'} movie={movie} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchList={watchList} /> : <MovieCardIcon icon={plus} text={add} id={'add'} movie={movie} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchList={watchList}/> }
                    {liked ? <MovieCardIcon icon={thumbsUpFilled} text={like} id={'like'} liked={liked} setLiked={setLiked}/> : <MovieCardIcon icon={thumbsUp} text={like} liked={liked} setLiked={setLiked} id={'like'}/> }
                    {disliked ? <MovieCardIcon icon={thumbsDownFilled} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> : <MovieCardIcon icon={thumbsDown} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> }
                </div>
            </div>
        </div>
    )
}

export default MiniFeatured
