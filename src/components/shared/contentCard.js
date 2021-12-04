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

const {
    getMovieDetails,
    getSimilarMovies,
} = require('../../controllers/moviesController')

const { getSimilarShows } = require('../../controllers/tvShowsController')

function ContentCard({ data, lang, selectedMovie, setSelectedMovie, setSimilarMovies, watchlist, setWatchlist, type, runtime2, setExploreMovies, exploreMovies, contentType}) {
    const [dataDetails, setMovieDetails] = useState({})
    const [isInList, setIsInList] = useState(false)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const { backdrop_path, id, title, vote_average, genre_ids } = data
    const {runtime} = dataDetails

    let play
    let remove
    let add
    let like
    let dislike
    let moreInfo
    let imagePath
    let seasonText

    const hours = Math.floor(runtime2 ? runtime2/60 : runtime/60)
    const minutes = (runtime2 ? runtime2 : runtime) % 60

    const match = vote_average * 10

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    if (lang === 'English') {
        play = 'Play'
        remove = 'Remove from My List'
        add = 'Add to My List'
        like = 'I like this'
        dislike = 'Not for me'
        moreInfo = 'More info'
    } else {
        play = 'Reproducir'
        remove = 'Quitar de Mi Lista'
        add = 'Agregar a Mi Lista'
        like = 'Me gusta esto'
        dislike = 'No es para mí'
        moreInfo = 'Más información'
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

    async function loadDetails() {
        if (Object.keys(dataDetails).length === 0) {
            const details = await getMovieDetails(lang, id)
            setMovieDetails(details.data)
        }
    }

    async function loadSimilar() {
        if(contentType === 'movie') {
            const result = await getSimilarMovies(lang, id)
            const results = result.data.results
            setSimilarMovies(results)
        } else {
            const result = await getSimilarShows(lang, id)
            const results = result.data.results
            setSimilarMovies(results)
            console.log('similar shows: ',results)
        }

    }

    function handleMovieCardHover() {
        loadDetails();
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

    if (contentType === 'tv') { 
        if(data.seasons.length > 1) {
            seasonText = `${data.seasons.length} Seasons`
        }
        else {
            seasonText = `1 Season`
        }
    }

    const bottomHalf = 
            <div className='bottom-half'>
                <div className='icon-row'>
                    <div className='icons'>
                        <ContentCardIcon icon={playButton} text={play} func={handlePlay}/>
                        {isInList ? <ContentCardIcon icon={check} text={remove} id={'remove'} randInt={randInt} data={data} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchlist={watchlist} setExploreMovies={setExploreMovies} exploreMovies={exploreMovies}/> :  <ContentCardIcon icon={plus} text={add} id={'add'} data={data} setIsInList={setIsInList} lang={lang} setWatchlist={setWatchlist} watchlist={watchlist}/>}
                        {liked ? <ContentCardIcon icon={thumbsUpFilled} text={like} id={'like'} liked={liked} setLiked={setLiked}/> : <ContentCardIcon icon={thumbsUp} text={like} liked={liked} setLiked={setLiked} id={'like'}/> }
                        {disliked ? <ContentCardIcon icon={thumbsDownFilled} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> : <ContentCardIcon icon={thumbsDown} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> }
                    </div>
                    <div className='icons'>
                        <ContentCardIcon icon={downArrow} text={moreInfo} selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie} data={data} id={'moreInfo'} runtime={runtime2 ? runtime2 : runtime}/>
                    </div>
                </div>
                <div className='match-row'>
                    <span className='match'>{`${match}% Match`}</span>
                    <span className='runtime'>{contentType === 'tv' ? seasonText :`${hours}h ${minutes}m`}</span>
                    <span className='hd'>HD</span>
                </div>
                <div className='genre-list-container'>{genreList}</div>
            </div>
    return (
        <div className={`content-container${type}`} id={`${randInt}`}>
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
