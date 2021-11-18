import React, {useState} from 'react'
import { useAuth } from '../../contexts/authContext'
import triangle from '../../images/triangle.png'

function MovieCardIcon({icon, text, func, id, selectedMovie,setSelectedMovie, movie, runtime, setWatchlist, setIsInList, liked, setLiked, disliked, setDisliked, randInt }) {
    const [iconHover, setIconHover] = useState(false)
    const { currentUser } = useAuth()

    const { handleWatchList } = require('../../controllers/userListController')

    function handleMoreInfo() {
        if (Object.keys(selectedMovie).length === 0) {
            const modMovie = {
                ...movie,
                runtime
            }
            setSelectedMovie(modMovie)
        }
    }

    async function handleWatchListState(type) {
        const data = await handleWatchList(movie, currentUser.uid,type)
        await setWatchlist(data)
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
                handleWatchListState('add')
                setIsInList(true)
                break;
            case 'remove':
                const movieElm = document.getElementById(`${randInt}`)
                movieElm.classList.remove('fadein')
                movieElm.classList.add('fadeout')
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
            <div onMouseEnter={e => handleIconHover(e)} onMouseLeave={e => handleIconHover(e)} onClick={e => handleIconClick(e)} className='icon-container'>
                {iconHover ? bubble: null}
                <div className='icon-circle'><img src={icon} onClick={handleIconClick} className='card-icon' id={id}/></div>
            </div>
        )
    }
}

export default MovieCardIcon