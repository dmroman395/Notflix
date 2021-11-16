import React, {useState, useEffect} from 'react'
import '../../css/main/similarMoveCard.css'
import MovieCardIcon from './movieCardIcon'
import logo from '../../images/logo-short.jpg'
import plus from '../../images/plus.png'
import check from '../../images/check.png'


function SimilarMovieCard({movie, lang, key, watchList, setWatchlist }) {
    const [isInList, setIsInList] = useState(false)

    const { backdrop_path, title, vote_average, overview, release_date } = movie

    let remove
    let add
    let imagePath
    let shortOverview

    if (lang === 'English') {
        add = 'Add to My List'
        remove = 'Remove from My List'
    } else {
        add = 'Agregar a Mi Lista'
        remove = 'Quitar de Mi Lista'
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

    useEffect(() => {
        if (watchList) {
            for (let item of watchList) {
                if (item.id == movie.id) {
                    setIsInList(true)
                }
            }
        }
    },[watchList])

    const randInt = Math.floor(Math.random()*100000)

    return (
            <div className='similarMovie' onClick={e => handleClick(e)} id={`${randInt}`}>
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
                        {isInList ? <MovieCardIcon icon={check} iconFilled={check} text={remove} id={'remove'} movie={movie} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchList={watchList} /> : <MovieCardIcon icon={plus} iconFilled={check} text={add} id={'add'} movie={movie} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchList={watchList}/> }
                    </div>
                    <h6 className='info-bottom'>{shortOverview}</h6>
                </div>
            </div>
    )
}

export default SimilarMovieCard