import React from "react";
import logo from '../../images/logo-short.jpg'
import '../../css/shared/episodeCard.css'

function EpisodeCard({data}) {
    const {episode_number, still_path, name, overview} = data

    return (
        <div className='episodeCard'>
            <div id='episodeNum'>
                {episode_number}
            </div>
            <div className='still'>
                <img src={still_path ? `https://image.tmdb.org/t/p/w400/${still_path}` : logo}></img>
            </div>
            <div className='episodeInfo'>
                <div>
                    <h4 id='episodeName'>{name}</h4>
                    <p id='episodeOverview'>{overview}</p>
                </div>
            </div>
        </div>
    )
}

export default EpisodeCard