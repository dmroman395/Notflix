import React from 'react'
import AccordianRow from './accordianRow'
import '../../css/landing/accordian.css'

function Accordian({ data }) {
    const rows = data.map((obj) => {
        return <AccordianRow rowInfo={obj} key={obj.id} />
    })

    return <div className="accordian">{rows}</div>
}

export default Accordian
