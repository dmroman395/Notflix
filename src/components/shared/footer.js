import React from 'react'
import '../../css/shared/footer.css'

function Footer({ data, style }) {
    const questions = 'Questions? Call '

    const list = data.map((link, i) => {
        return (
            <li key={i}>
                <a href={`${link.link}`}>{link.display}</a>
            </li>
        )
    })

    return (
        <div className={style}>
            <h5>
                {questions}
                <a href="tel:1-844-505-2993">1-844-505-2993</a>
            </h5>
            <div>
                <ul className="footer-list">{list}</ul>
            </div>
        </div>
    )
}

export default Footer
