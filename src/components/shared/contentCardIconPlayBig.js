import React, {useState} from 'react'
import triangle from '../../images/triangle.png'
import '../../css/shared/movieCardIconPlayBig.css'

function ContentCardIconPlayBig({icon, title, lang}) {

    let playText

    if (lang === 'English') {
        playText = 'Play'
    } else {
        playText = 'Reproducir'
    }

    function handleClick() {
        const titleSplit = title.split(' ')
        let queryString='https://www.netflix.com/search?q='

        titleSplit.forEach(item => {
            queryString = queryString + `${item}%20`
        })

        window.open(queryString, '_blank')
    }

    return(
        <div onClick={handleClick} className='icon-container'>
            <div className='icon-circle-play-big'><img src={icon} className='card-icon'/>{playText}
            </div>
        </div>
    )
}

export default ContentCardIconPlayBig