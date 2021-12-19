import React, {useEffect} from "react";
import logo from '../../images/logo-short.jpg'
import '../../css/shared/episodeCard.css'

function EpisodeCard({data}) {
    const {episode_number, still_path, name, overview} = data

    let modOverview

    if (overview.length > 250) {
        modOverview = overview.substring(0, 250) + '...'
    } else {
        modOverview = overview
    }

    useEffect(() => {
        const episodes = document.querySelectorAll('.episodeCard')
        
        for( let episode of episodes) {
            episode.style.opacity = '1'
        }
    },[])

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
                    <p id='episodeOverview'>{overview ? modOverview : 'There is no information on this episode yet...'}</p>
                </div>
            </div>
        </div>
    )
}

export default EpisodeCard