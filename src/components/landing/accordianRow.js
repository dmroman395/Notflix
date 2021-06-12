import React, { useState } from 'react'
import plusIcon from '../../images/plus.png'
import '../../css/landing/accordianRow.css'

function AccordionRow({ rowInfo }) {
    const { question, answer } = rowInfo
    const [isExpanded, setIsExpanded] = useState(false)

    let status
    let rotation

    function handleClick() {
        setIsExpanded(!isExpanded)
    }

    if (isExpanded) {
        status = 'expanded'
        rotation = 'rotated'
    } else {
        status = 'closed'
        rotation = ''
    }

    return (
        <div className="accordianRow">
            <div className="question" onClick={handleClick}>
                <h1>{question}</h1>
                <img className={`icon ${rotation}`} src={plusIcon}></img>
            </div>
            <div className={`answer ${status}`}>
                <p>{answer}</p>
            </div>
        </div>
    )
}

export default AccordionRow
