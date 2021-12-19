import axios from 'axios'
import { getFunctions, httpsCallable } from "firebase/functions";

let key

const functions = getFunctions();
const getApiKey = httpsCallable(functions, 'getTmdbKey');

getApiKey().then(res => key = res.data.tmdb.key)


export async function getTrending(page) {
    
    let response = []

    const trendingList = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en&page=${page}`
    )
    
    for(let movie of trendingList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getAction(page) {
    

    let response = []

    

    const actionMoviesList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=28%2C12&with_watch_monetization_types=flatrate`
    )
    
    for(let movie of actionMoviesList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getComedy(page) {
    

    let response = []

    

    const comedyMoviesList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=35&with_watch_monetization_types=flatrate`
    )
    
    for(let movie of comedyMoviesList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getHorror(page) {
    

    let response = []

    

    const horrorMoviesList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=27&with_watch_monetization_types=flatrate`
    )
    
    for(let movie of horrorMoviesList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getTopRated(page) {
    

    let response = []

    

    const topRatedMoviesList = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en&page=${page}`
    )
    
    for(let movie of topRatedMoviesList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getNowPlaying(page) {
    

    let response = []

    

    const nowPlayingMoviesList = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en&page=${page}`
    )
    
    for(let movie of nowPlayingMoviesList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getPopular(page) {
    

    let response = []

    

    const popularList = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en&page=${page}`
    )

    for(let movie of popularList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getMovieDetails(id) {
    
    let genres = []

    

    const movieDetails = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en`
    )

    for (let genre of movieDetails.data.genres) {
        genres.push(genre.id)
    }

    const modObj = {
        ...movieDetails.data,
        genre_ids: genres,
        contentType: 'movie'
    }

    return modObj
}

export async function getSimilarMovies(id) {
    

    let response = []

    

    const similarMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en`
    )

    for(let movie of similarMovies.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }
        response.push(modObj)
    }

    return response
}

export async function getMovieGenres() {
    

    const genreList = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en`
    )
    return genreList
}

export async function getRandomMovies(page) {
    

    let response = []

    

    const randomList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    )

    for(let movie of randomList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }

        response.push(modObj)
    }

    return response

}

export async function getUpcoming(page) {
    

    let response = []

    

    const upcomingList = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en&page=${page}`
    )

    for(let movie of upcomingList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }

        response.push(modObj)
    }

    return response
}

export async function getDiscover(page) {
    

    let response = []

    

    const discoverList = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en}&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}`
    )

    for(let movie of discoverList.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }

        response.push(modObj)
    }

    return response
}

export async function search(query, page) {
    
    let response = []

    const finalQuery = query.replace(' ','%20')
    
    const searchResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en&query=${finalQuery}&page=${page}&include_adult=false`)

    for(let movie of searchResults.data.results) {
        const modObj = {
            ...movie,
            contentType: 'movie'
        }

        response.push(modObj)
    }

    return response
}

export async function getMovies(type, page, id, query) {
    

    let data

    

    switch(type) {
        case 'Trending Now':
            data = await getTrending(page)
            return data
        case 'Action & Adventure':
            data = await getAction(page)
            return data
        case 'Comedy':
            data = await getComedy(page)
            return data
        case 'Horror':
           data = await getHorror(page)
           return data
        case 'Only on Notflix':
            data = await getTopRated(page)
            return data
        case 'Top 10 in the U.S. Today':
            data = await getNowPlaying(page)
            return data
        case 'Popular on Notflix':
            data = await getPopular(page)
            return data
        case 'details' :
            data = await getMovieDetails(id)
            return data
        case 'similar' :
            data = await getSimilarMovies(id)
            return data
        case 'Movies':
            data = await getRandomMovies(page)
            return data
        case 'Coming This Week':
            data = await getUpcoming(page)
            return data
        case 'New on Notflix':
            data = await getDiscover(page)
            return data
        case 'Search results':
            data = await search(query, page)
            return data
    }
}