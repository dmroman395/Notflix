import React from 'react'
import '../../css/main/featured.css'

function Featured({ lang, movie }) {
    const { backdrop_path, title, id, overview } = movie
    return (
        <div
            className="featured"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `linear-gradient(
                    to top,
                    rgba(20,20,20, 1) 1%, 
                    rgba(0, 0, 0, 0) 50%
                ),
                url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="content">
                <h1>{title}</h1>
                <h3>{overview}</h3>
            </div>
        </div>
    )
}

export default Featured
