import React from 'react'
import Row from './row'

function RowContainer({ rowsInfo, lang }) {
    const rows = rowsInfo.map((row) => {
        return <Row rowInfo={row} key={row.id} lang={lang} />
    })
    return <div>{rows}</div>
}

export default RowContainer
