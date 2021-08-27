import React, {useState} from 'react'
import MovieCardIcon from './movieCardButton'

import '../../css/main/movieCard.css'

import logo from '../../images/logo-short.jpg'
import check from '../../images/check.png'
import plus from '../../images/plus.png'
import thumbsUp from '../../images/like.png'
import thumbsDown from '../../images/dislike.png'
import thumbsUpFilled from '../../images/like-filled.png'
import thumbsDownFilled from '../../images/dislike-filled.png'
// import DownArrow from '../../images/down-chevron.svg'
// import Play from '../../images/play-button.svg'


function MovieCard({ movie, getMovieDetails, lang }) {
    const [hover, setHover] = useState(false)
    const [movieDetails, setMovieDetails] = useState({})

    const { backdrop_path, id, title, vote_average, genre_ids } = movie
    const {runtime} = movieDetails

    let play
    let remove
    let add
    let like
    let dislike
    let moreInfo
    let details
    let imagePath

    const hours = Math.floor(runtime/60)
    const minutes = runtime % 60

    const match = vote_average * 10

    if (backdrop_path === null) {
        imagePath = logo
    }
    else {
        imagePath = `https://image.tmdb.org/t/p/w400${backdrop_path}`
    }

    if (lang.lang === 'English') {
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
                <React.Fragment>
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

    function handleMoreInfoHover(e) {
        if (e.type === 'mouseenter') {
            setMoreInfoHover(true)
        } else {
            setMoreInfoHover(false)
        }
    }

    async function loadDetails() {
        if (Object.keys(movieDetails).length === 0) {
            details = await getMovieDetails(lang, id)
            setMovieDetails(details.data)
        }
        setHover(true)
    }

    function handleOut() {
        // setMovieDetails({})
        setHover(false)
    }

    const bottomHalf = 
            <div className='bottom-half'>
                <div className='icon-row'>
                    <div className='icons'>
                        <MovieCardIcon icon={plus} iconFilled={check} text={add}/>
                        <MovieCardIcon icon={thumbsUp} iconFilled={thumbsUpFilled} text={like}/>
                        <MovieCardIcon icon={thumbsDown} iconFilled={thumbsDownFilled} text={dislike}/>
                        </div>
                    <div>
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
        <div className="movie" onMouseOver={loadDetails} onMouseLeave={handleOut}>
            <div
                className="movie-card"
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
    )
}

export default MovieCard
