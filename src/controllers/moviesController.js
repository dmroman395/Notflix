import axios from 'axios'

export async function getMovies(language, page) {
    let lang

    if (language.lang === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const movies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`
    )
    return movies
}

export async function getTrending(language) {
    let lang

    if (language.lang === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const trendingList = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return trendingList
}
