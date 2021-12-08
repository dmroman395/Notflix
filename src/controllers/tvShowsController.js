import axios from "axios";

export async function getPopularTV(language, page) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang ='es'
    }

    const popularList = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&page=${page}`)

    return popularList
}

export async function getShowDetails(lang,id,seasonNum) {
    let tvInfo = {}

    const details = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&append_to_response=season/${seasonNum}`)

    tvInfo = {
        contentType: 'tv',
        backdrop_path: details.data.backdrop_path,
        overview: details.data.overview,
        vote_average: details.data.vote_average,
        id: details.data.id,
        title: details.data.name,
        genre_ids: details.data.genres,
        release_date: details.data.first_air_date,
        seasons: details.data.seasons,
        [`season/${seasonNum}`] : details.data[`season/${seasonNum}`]
    }

    return tvInfo
}

export async function getSeasonTV(lang, id, seasonNum) {

    const season = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`)

    return season
}

async function getEpisodesTV(lang, id, seasonNum, epNum) {

    const episodes = axios.get(`https://api.themoviedb.org/3/tv/${id}}/season/${seasonNum}/episode/${epNum}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`)

    return episodes
}

export async function getSimilarShows(language, id) {
    let lang

    let response = []

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const similarShows = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
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

export async function getTVGenres(language) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const genreList = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return genreList
}

export async function getTVShows(language, id) {
    let lang

    let tvInfo = {}

    if (language === 'English') {
        lang = 'en'
    } else {
        lang ='es'
    }

    //Get details for show
    const details = await getShowDetails(lang, id)

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