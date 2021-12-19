import React from 'react'
import Row from './row'

function RowContainer({ rowsInfo }) {
    const rows = rowsInfo.map((row) => {
        return <Row rowInfo={row} key={row.id} />
    })
    return <div>{rows}</div>
}

export default RowContainer
