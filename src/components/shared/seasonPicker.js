import React from "react";
import '../../css/shared/seasonPicker.css'

function SeasonPicker({seasons, setSeason, lang, showId}) {

    const { getSeasonTV } = require('../../controllers/tvShowsController')

    async function handleClick(e) {
        const val = e.target.value
        const data = await getSeasonTV(lang, showId, val)
        setSeason(data.data.episodes)
    }

    const optionMap = seasons.map(season => {
        if (season.season_number == 1) {
            return <option value={`${season.season_number}`} selected >{`Season ${season.season_number}`}</option>
        } else {
            return <option value={`${season.season_number}`}>{`Season ${season.season_number}`}</option>
        }
    })

    return (
        <select className='season' onChange={e => handleClick(e)}>
            {optionMap}
        </select>
    )
}

export default SeasonPicker