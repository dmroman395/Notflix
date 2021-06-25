import React from 'react'
import logo from '../../images/Logo.png'
import searchIcon from '../../images/search.png'
import '../../css/main/header.css'

function Header() {
    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} id="logo"></img>
                <ul>
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">TV Shows</a>
                    </li>
                    <li>
                        <a href="">Movies</a>
                    </li>
                    <li>
                        <a href="">New & Popular</a>
                    </li>
                    <li>
                        <a href="">My List</a>
                    </li>
                </ul>
            </div>
            <div className="header-right">
                <img src={searchIcon} id="search"></img>
                <a href="">DVD</a>
                <p>BELL ICON HERE</p>
                <p>Sign Out</p>
            </div>
        </div>
    )
}

export default Header
