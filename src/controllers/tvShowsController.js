import axios from "axios";

export async function getPopularTV(page) {
    
    let response = []

    const popularList = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en&page=${page}`)

    for(let show of popularList.data.results) {
        const modObj = {
            ...show,
            contentType: 'tv',
            title: show.name
        }
        response.push(modObj)
    }

    return response
}

export async function getShowDetails(id, seasonNum) {
    let tvInfo = {}

    let genres = []

    const details = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en&append_to_response=season/${seasonNum}`)

    for (let genre of details.data.genres) genres.push(genre.id)

    tvInfo = {
        contentType: 'tv',
        backdrop_path: details.data.backdrop_path,
        overview: details.data.overview,
        vote_average: details.data.vote_average,
        id: details.data.id,
        title: details.data.name,
        genre_ids: genres,
        first_air_date: details.data.first_air_date,
        seasons: details.data.seasons,
        [`season/${seasonNum}`] : details.data[`season/${seasonNum}`]
    }

    return tvInfo
}

export async function getSeasonTV(id, seasonNum) {

    const season = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en`)

    return season
}

export async function getSimilarShows(id) {
    
    let response = []

    const similarShows = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en`
    )
    for(let show of similarShows.data.results) {
        const modObj = {
            ...show,
            contentType: 'tv'
        }
        response.push(modObj)
    }

    return response
}

export async function getTVToday(page) {

    let response = []

    const todayShows = await axios.get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
    )
    for(let show of todayShows.data.results) {
        const modObj = {
            ...show,
            contentType: 'tv',
            title: show.name
        }
        response.push(modObj)
    }

    return response
}

export async function getTVGenres() {
    
   

    const genreList = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en`
    )
    return genreList
}

export async function getTVShows(id) {
    
    let tvInfo = {}

    //Get details for show
    const details = await getShowDetails(id)

    //Insert data into tvInfo
    tvInfo = {
        backdrop_path: details.data.backdrop_path,
        overview: details.data.overview,
        vote_average: details.data.vote_average,
        id: details.data.id,
        title: details.data.name,
        genre_ids: details.data.genres,
        release_date: details.data.first_air_date
    }

    return tvInfo
}