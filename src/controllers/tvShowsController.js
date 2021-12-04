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

async function getDetailsTV(lang,id) {

    const details = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`)

    return details
}

async function getSeasonsTV(lang, id, seasonNum) {

    const seasons = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`)

    return seasons
}

async function getEpisodesTV(lang, id, seasonNum, epNum) {

    const episodes = axios.get(`https://api.themoviedb.org/3/tv/${id}}/season/${seasonNum}/episode/${epNum}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`)

    return episodes
}

export async function getSimilarShows(language, id) {
    let lang

    if (language === 'English') {
        lang = 'en'
    } else {
        lang = 'es'
    }

    const similarMovies = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    return similarMovies
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
    const details = await getDetailsTV(lang, id)

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

    //Get ID for each season and push to seasonIds array
    let seasons = []
    let seasonNums = []

    details.data.seasons.forEach(season => {
        seasonNums.push(season.season_number)
    })

    //Use seasonIds array to get each season and episodeId for each episode in current season
    for (let season of seasonNums) {
        const data = await getSeasonsTV(lang, id, season)

        const seasonDetails = {
            name: data.data.name,
            overview: data.data.overview,
            id: data.data.id
        }

        seasons.push(seasonDetails)
    }

    tvInfo = {
        ...tvInfo,
        seasons
    }

    return tvInfo
}