import React from 'react'
import '../../css/landing/row.css'
import tv from '../../images/tv.png'
import tvVideo from '../../videos/video-tv-0819.mp4'
import mobile from '../../images/mobile-0819.jpg'
import boxshot from '../../images/boxshot.png'
import downloadGif from '../../images/download-icon.gif'
import devicePile from '../../images/device-pile.png'
import videoDevices from '../../videos/video-devices.mp4'
import kids from '../../images/kids.png'

function Row({ rowInfo}) {
    const {
        headline,
        desc,
        videoType,
        isLeft,
        hasOverlay,
        id
    } = rowInfo

    let row
    let vidContainer
    let overlay
    let graphic
    let graphic2
    let gif
    let video
    const download = 'Downloading...'

    switch(id) {
        case 1:
            graphic = tv
            video = tvVideo
            break;
        case 2:
            graphic = mobile
            graphic2 = boxshot
            gif = downloadGif
            break;
        case 3:
            graphic = devicePile
            video = videoDevices
            break;
        case 4:
            graphic = kids
            break;
        default:
            break;
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
