import React, {useState, useEffect} from 'react'
import ContentCardIcon from './contentCardIcon'

import '../../css/shared/movieCard.css'

import logo from '../../images/logo-short.jpg'
import check from '../../images/check.png'
import plus from '../../images/plus.png'
import thumbsUp from '../../images/like.png'
import thumbsDown from '../../images/dislike.png'
import thumbsUpFilled from '../../images/like-filled.png'
import thumbsDownFilled from '../../images/dislike-filled.png'
import downArrow from '../../images/down-chevron.png'
import playButton from '../../images/play-button.png'

const { getSimilarMovies } = require('../../controllers/moviesController')

const { getSimilarShows } = require('../../controllers/tvShowsController')

function ContentCard({ data,  setSelectedMovie, setSimilarMovies, watchlist, setWatchlist, type, setExploreMovies, exploreMovies}) {
    const [isInList, setIsInList] = useState(false)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const { backdrop_path, id, title, vote_average, genre_ids, contentType, release_date, first_air_date } = data

    const play = 'Play'
    const remove = 'Remove from My List'
    const add = 'Add to My List'
    const like = 'I like this'
    const dislike = 'Not for me'
    const moreInfo = 'More info'
    let imagePath
    let year

    const match = vote_average * 10

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    if (contentType === 'tv') { 
        year = first_air_date.substring(0,4)
    } else {
        year = release_date.substring(0,4)
    }

    const genreList = genre_ids.map((genre, i) => {
        if (i < 3) {
            const genreName = window.localStorage.getItem(genre)
            return (
                <React.Fragment key={i}>
                     <p>{genreName}</p><span className='dot'>&#8226;</span>
                </React.Fragment>
            )
        } 
    })

    function handlePlay() {
        const titleSplit = title.split(' ')
        let queryString='https://www.netflix.com/search?q='

        titleSplit.forEach(item => {
            queryString = queryString + `${item}%20`
        })

        window.open(queryString, '_blank')
    }

    async function loadSimilar() {
        if(contentType === 'movie') {
            const results = await getSimilarMovies(id)
            setSimilarMovies(results)
        } else {
            const results = await getSimilarShows(id)
            setSimilarMovies(results)
        }
    }

    function handleMovieCardHover() {
        loadSimilar();
    }

    function fadeIn(num) {
        const dataElm = document.getElementById(`${num}`)
        dataElm.style.opacity = '1'
    }

    useEffect(() => {
        if (watchlist) {
            for (let item of watchlist) {
                if (item.id == data.id) {
                    setIsInList(true)
                }
            }
        }
        fadeIn(randInt)
    },[watchlist])

    const randInt = Math.floor(Math.random()*100000)

    const bottomHalf = 
            <div className='bottom-half'>
                <div className='icon-row'>
                    <div className='icons'>
                        <ContentCardIcon icon={playButton} text={play} func={handlePlay}/>
                        {isInList ? <ContentCardIcon icon={check} text={remove} id={'remove'} randInt={randInt} data={data} setIsInList={setIsInList} setWatchlist={setWatchlist} watchlist={watchlist} setExploreMovies={setExploreMovies} exploreMovies={exploreMovies}/> :  <ContentCardIcon icon={plus} text={add} id={'add'} data={data} setIsInList={setIsInList} setWatchlist={setWatchlist} watchlist={watchlist}/>}
                        {liked ? <ContentCardIcon icon={thumbsUpFilled} text={like} id={'like'} liked={liked} setLiked={setLiked}/> : <ContentCardIcon icon={thumbsUp} text={like} liked={liked} setLiked={setLiked} id={'like'}/> }
                        {disliked ? <ContentCardIcon icon={thumbsDownFilled} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> : <ContentCardIcon icon={thumbsDown} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> }
                    </div>
                    <div className='icons'>
                        <ContentCardIcon  icon={downArrow} text={moreInfo} setSelectedMovie={setSelectedMovie} data={data} id={'moreInfo'} />
                    </div>
                </div>
                <div className='match-row'>
                    <span className='match'>{`${match}% Match`}</span>
                    <span className='runtime'>{year}</span>
                    <span className='hd'>HD</span>
                </div>
                <div className='genre-list-container'>{genreList}</div>
            </div>
    return (
        <div className={`content-container`} id={`${randInt}`}>
            <div className="content" onMouseEnter={handleMovieCardHover}>
            <div
                className="content-card"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${imagePath})`,
                    backgroundPosition: 'center',
                }}
            >
                <h1 id='title'>{title}</h1>
            </div>
            {bottomHalf}
        </div>
        </div>
        
    )
}

export default ContentCard
