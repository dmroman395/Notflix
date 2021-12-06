import React from "react";
import EpisodeCard from './episodeCard'
import SeasonPicker from "./seasonPicker";
import '../../css/shared/episodeCardList.css'

function EpisodeCardList({data, seasons, lang, setSeason, showId}) {
    const episodeMap = data.map(episode => {
        return <EpisodeCard data={episode}/>
    })

    return (
        <div className='episodeCardList'>
            <div className='episodeCardListHeader'>
                <h2>Episodes</h2>
                <SeasonPicker showId={showId} seasons={seasons} lang={lang} setSeason={setSeason}/>
            </div>
            {episodeMap}
        </div>
    )
}

export default EpisodeCardList