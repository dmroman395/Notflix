import React from "react";

function SeasonPicker({seasons, setSeason, lang, showId}) {

    const { getSeasonTV } = require('../../controllers/tvShowsController')

    async function handleClick(e) {
        const val = e.target.value
        const data = await getSeasonTV(lang, showId, val)
        setSeason(data.data.episodes)
    }

    const optionMap = seasons.map(season => {
        return(
            <option value={`${season.season_number}`}>{`Season ${season.season_number}`}</option>
        )
    } )
    return (
        <select name='season' onChange={e => handleClick(e)}>
            {optionMap}
        </select>
    )
}

export default SeasonPicker