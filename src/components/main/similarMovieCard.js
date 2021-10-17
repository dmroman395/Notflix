import React, {useState} from 'react'
import '../../css/main/similarMoveCard.css'
import MovieCardIcon from './movieCardIcon'
import logo from '../../images/logo-short.jpg'
import plus from '../../images/plus.png'
import check from '../../images/check.png'


function SimilarMovieCard({movie, lang, key}) {

    const { backdrop_path, title, vote_average, overview, release_date } = movie

    let add
    let imagePath
    let shortOverview

    if (lang === 'English') {
        add = 'Add to My List'
    } else {
        add = 'Agregar a Mi Lista'
    }

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/original/${backdrop_path}`
    }

    if (overview.length > 150) {
        shortOverview = `${overview.substring(0,140)}...`
    } else {
        shortOverview = overview
    }

    const year = release_date.substring(0,4)

    const match = Math.floor(vote_average * 10)

    function handleClick(e) {
        e.stopPropagation()
        const titleSplit = title.split(' ')
        let queryString='https://www.netflix.com/search?q='

        titleSplit.forEach(item => {
            queryString = queryString + `${item}%20`
        })

        window.open(queryString, '_blank')
    }

    return (
            <div className='similarMovie' onClick={e => handleClick(e)}>
                <div
                    className='banner' 
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${imagePath})`,
                        backgroundPosition: 'center',
                    }}>
                        <h5>{title}</h5>
                </div>
                <div className='info'>
                    <div className='info-top'>
                        <div className='match-year'>
                            <p className='match'>{`${match}% Match`}</p>
                            <p className='runtime'>{year}</p>
                        </div>
                        <MovieCardIcon icon={plus} iconFilled={check} text={add}/>
                    </div>
                    <h6 className='info-bottom'>{shortOverview}</h6>
                </div>
            </div>
    )
}

export default SimilarMovieCard