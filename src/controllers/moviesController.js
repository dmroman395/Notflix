import axios from 'axios'

export async function getTrending(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const trendingList = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return trendingList
}

export async function getAction(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const actionMoviesList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28%2C12&with_watch_monetization_types=flatrate`
    )
    return actionMoviesList
}

export async function getComedy(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const comedyMoviesList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`
    )
    return comedyMoviesList
}

export async function getHorror(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const horrorMoviesList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate`
    )
    return horrorMoviesList
}

export async function getTopRated(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const topRatedMoviesList = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=1`
    )
    return topRatedMoviesList
}

export async function getNowPlaying(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const nowPlayingMoviesList = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=1`
    )
    return nowPlayingMoviesList
}

export async function getPopular(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const popularList = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=1`
    )
    return popularList
}

export async function getMovieDetails(language, id) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const movieDetails = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return movieDetails
}

export async function getSimilarMovies(language, id) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const similarMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return similarMovies
}

export async function getGenres(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const popularList = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return popularList
}

export async function getRandomMovies(language, page) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const randomList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    )
    return randomList

}

export async function getUpcoming(language, page) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const upcomingList = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
    )
    return upcomingList
}

export async function getMovies(language, type, page, limit, id) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    switch(type) {
        case 'Trending Now':
            const trendingList = await axios.get(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}&total_results=${limit}`
            )
            return trendingList
        case 'Action & Adventure':
            const actionMoviesList = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=28%2C12&with_watch_monetization_types=flatrate`
            )
            return actionMoviesList
        case 'Comedy':
            const comedyMoviesList = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=35&with_watch_monetization_types=flatrate`
            )
            return comedyMoviesList
        case 'Horror':
            const horrorMoviesList = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=27&with_watch_monetization_types=flatrate`
            )
            return horrorMoviesList
        case 'Only on Notflix':
            const topRatedMoviesList = await axios.get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
            )
            return topRatedMoviesList
        case 'Top 10 in the U.S. Today':
            const nowPlayingMoviesList = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
            )
            return nowPlayingMoviesList
        case 'Popular on Notflix':
            const popularList = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
            )
            return popularList
        case 'details' :
            const movieDetails = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
            )
            return movieDetails
        case 'similar' :
            const similarMovies = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
            )
            return similarMovies
        case 'Movies':
            const randomList = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
            )
            return randomList
        case 'Coming This Week':
            const upcomingList = await axios.get(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
            )
            return upcomingList
        case 'New on Notflix':
            const newList = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}}&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}`
            )
            return newList
    }
}