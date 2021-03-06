import React, {useState} from 'react'
import { useAuth } from '../../contexts/authContext'
import triangle from '../../images/triangle.png'

function ContentCardIcon({icon, text, func, id, setSelectedMovie, data, setWatchlist, watchlist, setIsInList, liked, setLiked, disliked, setDisliked, setExploreMovies, exploreMovies }) {
    const [iconHover, setIconHover] = useState(false)
    const { currentUser } = useAuth()

    const { handleWatchList } = require('../../controllers/userListController')
    const { getMovieDetails } = require('../../controllers/moviesController')
    const { getShowDetails } = require('../../controllers/tvShowsController')

    async function handleMoreInfo() {

        if (data.contentType === 'movie') {
            const details = await getMovieDetails(data.id)
            setSelectedMovie(details)
        } else {
            const details = await getShowDetails(data.id, 1)
            setSelectedMovie(details)
        }

        if (watchlist) {
            for (let item of watchlist) {
                if (item.id == data.id) {
                    setIsInList(true)
                }
            }
        }
    }

    async function handleWatchListState(type, contentType) {
        const result = await handleWatchList(data, currentUser.uid, type, contentType)
        await setWatchlist(result)
    }

    function handleExploreMovies() {
        if (exploreMovies) {
            exploreMovies.forEach((exploreMovie, i) => {
                if (data.id === exploreMovie.id ) {
                     exploreMovies.splice(i, 1)
                }
            })
            setExploreMovies(exploreMovies)
        }
    }

   async function handleIconClick(e) {
        e.stopPropagation();
        switch(e.target.id) {
            case 'moreInfo':
                handleMoreInfo()
                break;
            case 'like':
                setLiked(!liked)
                break;
            case 'dislike':
                setDisliked(!disliked)
                break;
            case 'add':
                handleWatchListState('add', data.contentType)
                setIsInList(true)
                break;
            case 'remove':
                handleExploreMovies()
                handleWatchListState('remove')
                setIsInList(false)
                break;
            default:
                break;
        }
    }

    function handleIconHover(e) {
        if (e.type === 'mouseenter') {
            setIconHover(true)
        } else {
            setIconHover(false)
        }
    }

    const bubble = 
    <div className='bubble-container'>
        <div className='bubble-text'>{text}</div>
        <img id='triangle' src={triangle}></img>
    </div>

    if (func) {
        return(
            <div onMouseEnter={e => handleIconHover(e)} onMouseLeave={e => handleIconHover(e)} onClick={func} className='icon-container'>
                {iconHover? bubble: null}
                <div className='icon-circle-play'><img src={icon} className='card-icon' id={id}/>
                </div>
            </div>
        )
    } else {
        return(
            <div onMouseEnter={e => handleIconHover(e)} onMouseLeave={e => handleIconHover(e)}  className='icon-container' >
                {iconHover ? bubble: null}
                <div className='icon-circle' onClick={e => handleIconClick(e)} id={id}><img src={icon} className='card-icon' id={id}/></div>
            </div>
        )
    }
}

export default ContentCardIcon