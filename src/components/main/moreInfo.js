import React, {useEffect, useState} from 'react'
import MiniFeatured from './miniFeatured'
import SimilarMovieCard from './similarMovieCard'
import '../../css/main/moreInfo.css'
import downArrow from '../../images/down-chevron.png'

function MoreInfo({movie, similarMovies, lang, setSelectedMovie}) {
    const [listExpanded, setListExpanded] = useState(false)

    const { backdrop_path, id, title, vote_average, runtime, genres, overview, release_date } = movie

    let play
    let remove
    let add
    let like
    let dislike
    let imagePath
    let moreMovies

    function handleScroll() {
        document.body.style.overflow='hidden'
        const overlay = document.querySelector('.overlay')
        const currScrollPos = window.scrollY
        overlay.style.top = `${currScrollPos}px`
        overlay.style.overflow = 'scroll'
        overlay.style.opacity = '1'
        const moreInfoContainer = document.querySelector('.moreInfo-container')
        moreInfoContainer.style.opacity = '1'
    }

    const year = release_date.substring(0,4)
    const hours = Math.floor(runtime/60)
    const minutes = runtime % 60

    const match = Math.floor(vote_average*10)

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    const similarMovieList = similarMovies.map((movie, i) => {
        return <SimilarMovieCard movie={movie} lang={lang} key={i}/>
    })

    function handleList() {
        const grid = document.querySelector('.similarMovies-grid')
        const arrow = document.querySelector('#expandArrow').parentNode
        if (listExpanded) {
            grid.style.marginBottom = '0'
            grid.style.maxHeight = '1000px'
            arrow.classList.toggle('rotated')
            setListExpanded(!listExpanded)
        } else {
            grid.style.marginBottom = '50px'
            grid.style.maxHeight = '2500px'
            arrow.classList.toggle('rotated')
            setListExpanded(!listExpanded)
        }
    }

    useEffect(handleScroll,[])

    return (
         <div className='overlay'>
                <div className='moreInfo-container'>
                    <div className='moreInfo-featured'>
                        <MiniFeatured movie={movie} lang={lang} setSelectedMovie={setSelectedMovie} />
                    </div>
                    <div className='moreInfo-info'>
                        <p>
                            <span className='match'>{`${match}% Match`}</span>  
                            <span className='runtime'>{year}</span>  
                            <span className='runtime'>{`${hours}h ${minutes}m`}</span>  
                            <span className='hd'>HD</span>
                        </p>
                        <h3>
                            {overview}
                        </h3>
                        <div className='similarMovies'>
                            <h1>More Like This</h1>
                            <div className='similarMovies-grid'>
                                {similarMovieList}
                            </div>
                        </div>
                        <div className='expand-container'>
                            <div className='expand' onClick={handleList}>
                                <img src={downArrow} id='expandArrow'></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MoreInfo