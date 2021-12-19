import React, {useEffect, useState} from 'react'
import MiniFeatured from './miniFeatured'
import SimilarContentCard from './similarContentCard'
import EpisodeCardList from './episodeCardList'
import '../../css/shared/moreInfo.css'
import downArrow from '../../images/down-chevron.png'

function MoreInfo({data, similarMovies, setSelectedMovie, watchlist, setWatchlist, setExploreMovies, exploreMovies}) {
    const [listExpanded, setListExpanded] = useState(false)
    const [isInList, setIsInList] = useState(false)
    const [season, setSeason] = useState(data.contentType == 'tv' ? data['season/1'].episodes: null)

    const { backdrop_path, id, vote_average, runtime, overview, release_date, first_air_date, contentType, seasons } = data

    let imagePath
    let seasonText
    let year
    let hours
    let minutes

    function handleScroll() {
        document.body.style.overflow = 'hidden'
        const overlay = document.querySelector('.overlay')
        const currScrollPos = window.scrollY
        overlay.style.top = `${currScrollPos}px`
        overlay.style.overflow = 'scroll'
        overlay.style.opacity = '1'
        const moreInfoContainer = document.querySelector('.moreInfo-container')
        moreInfoContainer.style.opacity = '1'
    }

    const match = Math.floor(vote_average*10)

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    if (contentType === 'tv') { 
        year = first_air_date.substring(0,4)
        if(data.seasons.length > 1) {
            seasonText = `${data.seasons.length} Seasons`
        }
        else {
            seasonText = `1 Season`
        }
    } else {
        year = release_date.substring(0,4)
        hours = Math.floor(runtime/60)
        minutes = runtime % 60
    }

    const similarMovieList = similarMovies.map((movie, i) => {
        return <SimilarContentCard data={movie} key={i} watchlist={watchlist} setWatchlist={setWatchlist} setExploreMovies={setExploreMovies} exploreMovies={exploreMovies} />
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

    function handleCancel(e) {
        e.stopPropagation()
        if (e.target.id =='cancel' || e.target.id == 'cancelIcon') {
            const reset = {}
            document.body.style.overflowY = 'scroll'
            document.body.style.position = '';
            document.body.style.top = '';
            const moreInfoContainer = document.querySelector('.moreInfo-container')
            moreInfoContainer.style.opacity = '0'
            const overlay = document.querySelector('.overlay')
            overlay.addEventListener('transitionend', () => setSelectedMovie(reset))
        }
    }

    useEffect(handleScroll,[])

    return (
         <div className='overlay' id='cancel' onClick={e => handleCancel(e)}>
                <div className='moreInfo-container'>
                    <div className='moreInfo-featured'>
                        <MiniFeatured data={data} watchlist={watchlist} setWatchlist={setWatchlist} isInList={isInList} setIsInList={setIsInList} setExploreMovies={setExploreMovies} exploreMovies={exploreMovies} />
                    </div>
                    <div className='moreInfo-info'>
                        <p>
                            <span className='match'>{`${match}% Match`}</span>  
                            <span className='runtime'>{year}</span>  
                            <span className='runtime'>{contentType === 'movie' ? `${hours}h ${minutes}m`: seasonText }</span>  
                            <span className='hd'>HD</span>
                        </p>
                        <h3>
                            {overview}
                        </h3>
                        {contentType === 'tv' ? <EpisodeCardList showId={id} data={season} seasons={seasons} setSeason={setSeason}/> : null}
                        <div className='similarMovies'>
                            <h1>More Like This</h1>
                            <div className='similarMovies-grid'>
                                {similarMovieList}
                            </div>
                        </div>
                        {/* <div className='expand-container'>
                            <div className='expand' onClick={handleList}>
                                <img src={downArrow} id='expandArrow'></img>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
    )
}

export default MoreInfo