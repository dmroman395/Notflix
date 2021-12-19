import React, {useState, useEffect} from "react";
import Row from "../shared/row";
import RowTopTen from "../shared/rowTopTen";
import MoreInfo from "../shared/moreInfo";

function NewPopular({nowPlayingMovies, getMovieDetails, setExploreMovies, setSelectedGenre, watchlist, setWatchlist, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, setIsExploreEmpty, isExploreEmpty, setIsNewPopular}) {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [newMovies, setNewMovies] = useState([])

    const {getMovies} = require('../../controllers/moviesController')

    async function loadUpcoming() {
        const data = await getMovies('Coming This Week', 1)
        setUpcomingMovies(data)
    }

    async function loadNewPopular() {
        const data = await getMovies('New on Notflix', 1)
        setNewMovies(data)
    }

    useEffect(() => {
        loadUpcoming()
        loadNewPopular()
    },[])

    return (
        <div>
            <div className='rows-container'>
                <RowTopTen
                    arr={nowPlayingMovies}
                    getMovieDetails={getMovieDetails}
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