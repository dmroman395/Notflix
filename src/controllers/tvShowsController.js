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

export function getAllTVInfo(language, id) {
    let lang

    let tvInfo = {}

    if (language === 'English') {
        lang = 'en'
    } else {
        lang ='es'
    }

    //Get details for show
    const details = getDetailsTV(lang, id)

    //Insert data into tvInfo
    tvInfo = {
        backdrop: details.backdrop_path,
        tagline: details.tagline,
        rating: details.vote_average
    }

    //Get ID for each season and push to seasonIds array
    let seasons = []
    let seasonIds = []
    let episodeIds = []
    details.seasons.forEach(season => {
        seasonIds.push(season.id)
    })

    //Use seasonIds array to get each season and episodeId for each episode in current season
    for (let season of seasonIds) {
        const data = getSeasonsTV(lang, id, season)

        const seasonDetails = {
            name: data.name,
            overview: data.overview,
        }

        seasons.push(seasonDetails)
        for (let episode of data.episodes) {
            episodeIds.push(episode.id)
        }
    }
    for (let episode of episodeIds) {
        const data = getEpisodesTV()
    }
}