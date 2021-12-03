import React, {useState, useEffect} from 'react'
import '../../css/main/featured.css'
import MovieCardIcon from './contentCardIcon'
import MovieCardIconPlayBig from './contentCardIconPlayBig'

import logo from '../../images/logo-short.jpg'
import check from '../../images/check.png'
import close from '../../images/cancel.png'
import plus from '../../images/plus.png'
import thumbsUp from '../../images/like.png'
import thumbsDown from '../../images/dislike.png'
import thumbsUpFilled from '../../images/like-filled.png'
import thumbsDownFilled from '../../images/dislike-filled.png'
import playButton from '../../images/play-button.png'

function MiniFeatured({ data, lang, watchlist, setWatchlist, isInList, setIsInList, exploreMovies, setExploreMovies, cancel}) {
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const { backdrop_path, title } = data

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
        if (watchlist) {
            for (let item of watchlist) {
                if (item.id == data.id) {
                    setIsInList(true)
                }
            }
        }
    },[watchlist])

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
                <div className='cancel' onClick={e => cancel(e)}>
                    <img src={close}></img>
                </div>
            </div>
            <div className="content">
                <h1>{title}</h1>
                <div className='icon-row'>
                    <MovieCardIconPlayBig icon={playButton} text={play} title={title} lang={lang}/>
                    {isInList ? <MovieCardIcon icon={check} text={remove} id={'remove'} data={data} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchlist={watchlist} setExploreMovies={setExploreMovies} exploreMovies={exploreMovies} /> : <MovieCardIcon icon={plus} text={add} id={'add'} data={data} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchlist={watchlist}/> }
                    {liked ? <MovieCardIcon icon={thumbsUpFilled} text={like} id={'like'} liked={liked} setLiked={setLiked}/> : <MovieCardIcon icon={thumbsUp} text={like} liked={liked} setLiked={setLiked} id={'like'}/> }
                    {disliked ? <MovieCardIcon icon={thumbsDownFilled} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> : <MovieCardIcon icon={thumbsDown} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> }
                </div>
            </div>
        </div>
    )
}

export default MiniFeatured