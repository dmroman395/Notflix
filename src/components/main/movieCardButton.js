import React, {useState} from 'react'
import triangle from '../../images/triangle.png'

function MovieCardIcon({icon, iconFilled, text}) {
    const [iconState, setIconState] = useState(true)
    const [iconHover, setIconHover] = useState(false)

    function handleIconClick() {
       setIconState(!iconState)
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

    return(
        <div onMouseEnter={e => handleIconHover(e)} onMouseLeave={e => handleIconHover(e)} onClick={handleIconClick}>
            {iconHover? bubble: null}
            <div className='icon-circle'>{iconState ? <img src={icon} onClick={handleIconClick} id='card-icon'/> : <img src={iconFilled} onClick={handleIconClick} id='card-icon' />  }</div>
        </div>
    )
}

export default MovieCardIcon