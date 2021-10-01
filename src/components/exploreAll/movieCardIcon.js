import React, {useState} from 'react'
import triangle from '../../images/triangle.png'

function MovieCardIcon({icon, iconFilled, text, func, id, selectedMovie,setSelectedMovie, movie, runtime}) {
    const [iconState, setIconState] = useState(true)
    const [iconHover, setIconHover] = useState(false)

    function handleMoreInfo() {
        if (Object.keys(selectedMovie).length === 0) {
            const modMovie = {
                ...movie,
                runtime
            }
            setSelectedMovie(modMovie)
        }
    }

    function handleIconClick(e) {
        e.stopPropagation();
        switch(e.target.id) {
            case 'moreInfo':
                handleMoreInfo()
                break;
            default:
                setIconState(!iconState)
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
                {iconHover? bubble: null}
                <div className='icon-circle'>{iconState ? <img src={icon} onClick={handleIconClick} className='card-icon' id={id}/> : <img src={iconFilled} onClick={handleIconClick} className='card-icon' id={id}/>}</div>
            </div>
        )
    }

    
}

export default MovieCardIcon