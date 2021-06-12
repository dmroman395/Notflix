import React from 'react'
import '../../css/landing/row.css'

function Row({ rowInfo, lang }) {
    const {
        headline,
        desc,
        graphic,
        graphic2,
        gif,
        video,
        videoType,
        isLeft,
        hasOverlay,
    } = rowInfo

    let row
    let vidContainer
    let overlay
    let download

    if (lang === 'English') {
        download = 'Downloading...'
    } else {
        download = 'Descargando...'
    }

    if (videoType === 1) {
        vidContainer = (
            <div className="video1">
                <div className="vidOverlay">
                    <video autoplay="" loop>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </div>
        )
    } else if (videoType === 2) {
        vidContainer = (
            <div className="video2">
                <video autoplay="" loop>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        )
    }

    if (hasOverlay) {
        overlay = (
            <div className="overlayContainer">
                <div className="overlay">
                    <img src={graphic2}></img>
                    <div className="overlayText">
                        <p className="white">Stranger Things</p>
                        <p className="blue">{download}</p>
                    </div>
                    <img src={gif}></img>
                </div>
            </div>
        )
    }

    if (isLeft) {
        row = (
            <div className="row left">
                <div className="container">
                    <div>
                        {vidContainer || overlay ? null : (
                            <img src={graphic}></img>
                        )}
                        {vidContainer}
                        {overlay}
                    </div>
                    <div className="text">
                        <h1>{headline}</h1>
                        <h3>{desc}</h3>
                    </div>
                </div>
            </div>
        )
    } else {
        row = (
            <div className="row right">
                <div className="container">
                    <div className="text">
                        <h1>{headline}</h1>
                        <h3>{desc}</h3>
                    </div>
                    <div>
                        {vidContainer ? null : <img src={graphic}></img>}
                        {vidContainer}
                    </div>
                </div>
            </div>
        )
    }

    return row
}

export default Row
