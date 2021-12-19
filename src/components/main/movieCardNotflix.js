import React, {useState, useEffect} from 'react'
import MovieCardIcon from '../shared/contentCardIcon'

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

function MovieCardNotflix({ movie, getMovieDetails, getSimilarMovies, selectedMovie, setSelectedMovie, watchlist, setWatchlist, setSimilarMovies }) {
    const [movieDetails, setMovieDetails] = useState({})
    const [isInList, setIsInList] = useState(false)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)


    const { poster_path, id, genre_ids, vote_average } = movie
    const {runtime} = movieDetails

    const hours = Math.floor(runtime/60)
    const minutes = runtime % 60

    const match = vote_average * 10

    const play = 'Play'
    const remove = 'Remove from My List'
    const add = 'Add to My List'
    const like = 'I like this'
    const dislike = 'Not for me'
    const moreInfo = 'More info'
    let imagePath



    if (poster_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${poster_path}`
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
            const details = await getMovieDetails(id)
            setMovieDetails(details)
    }

    async function loadSimilar() {
            const data = await getSimilarMovies(id)
            setSimilarMovies(data)
    }

    function handleHover() {
            loadDetails()
            loadSimilar()
    }

    useEffect(() => {
        if (watchlist) {
            for (let item of watchlist) {
                if (item.id == movie.id) {
                    setIsInList(true)
                }
            }
        }
    },[watchlist])

    const bottomHalf = 
    <div className='content'>
        <div className='icon-row'>
            <div className='icons'>
                <MovieCardIcon icon={playButton} text={play} func={handlePlay}/>
                {isInList ? <MovieCardIcon icon={check} text={remove} id={'remove'} data={movie} setIsInList={setIsInList}  setWatchlist={setWatchlist} watchlist={watchlist} /> :  <MovieCardIcon icon={plus} text={add} id={'add'} data={movie} setIsInList={setIsInList}  setWatchlist={setWatchlist} watchlist={watchlist}/>}
                {liked ? <MovieCardIcon icon={thumbsUpFilled} text={like} id={'like'} liked={liked} setLiked={setLiked}/> : <MovieCardIcon icon={thumbsUp} text={like} liked={liked} setLiked={setLiked} id={'like'}/> }
                {disliked ? <MovieCardIcon icon={thumbsDownFilled} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> : <MovieCardIcon icon={thumbsDown} text={dislike} id={'dislike'} disliked={disliked} setDisliked={setDisliked}/> }
            </div>
            <div className='icons'>
                <MovieCardIcon icon={downArrow} text={moreInfo} selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie} data={movieDetails} id={'moreInfo'} runtime={runtime}/>
            </div>
        </div>
        <div className='match-row'>
            <span className='match'>{`${match}% Match`}</span>
            <span className='runtime'>{`${hours}h ${minutes}m`}</span>
            <span className='hd'>HD</span>
        </div>
        <div className='genre-list-container'>{genreList}</div>
    </div>

    return (
        <div className="movie-poster-container">
            <div
                className="movie-poster"
                onMouseEnter={handleHover}
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `linear-gradient(
                        to top,
                        rgba(20,20,20, .9) 1%, 
                        rgba(0, 0, 0, .20) 50%
                    ),
                    url(${imagePath})`,
                    backgroundPosition: 'center',
                }}
            >
                {bottomHalf}
            </div>
        </div>
    )
}
export default MovieCardNotflix
