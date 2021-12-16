import React, {useState, useEffect} from "react";
import Row from "../shared/row";
import RowTopTen from "../shared/rowTopTen";
import MoreInfo from "../shared/moreInfo";

function NewPopular({lang, nowPlayingMovies, getMovieDetails, setExploreMovies, setSelectedGenre, watchlist, setWatchlist, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, setIsExploreEmpty, isExploreEmpty, setIsNewPopular}) {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [newMovies, setNewMovies] = useState([])

    const {getMovies} = require('../../controllers/moviesController')

    async function loadUpcoming() {
        const data = await getMovies(lang, 'Coming This Week', 1)
        setUpcomingMovies(data)
    }

    async function loadNewPopular() {
        const data = await getMovies(lang, 'New on Notflix', 1)
        setNewMovies(data)
    }

    useEffect(() => {
        loadUpcoming()
        loadNewPopular()
    },[])

    return (
        <div>
            {Object.keys(selectedMovie).length === 0  ? 
                null
                : 
                <MoreInfo movie={selectedMovie} similarMovies={similarMovies} lang={lang} setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist}/>
            }
            <div className='rows-container'>
                <RowTopTen
                    arr={nowPlayingMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Top 10 in the U.S. Today'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={newMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'New on Notflix'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={upcomingMovies}
                    getMovieDetails={getMovieDetails}
                    lang={lang}
                    headline={'Coming This Week'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
            </div>
        </div>
    )
}

export default NewPopular;