import React from 'react'
import logo from '../../images/Logo.png'
import searchIcon from '../../images/search.png'
import '../../css/main/header.css'

// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
  
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) { 
        cancelAnimationFrame(frame);
      }
  
      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        
        // Call our function and pass any params we received
        fn(...params);
      });
  
    } 
  };
  
  
  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
  }
  
  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener('scroll', debounce(storeScroll), { passive: true });
  
  // Update scroll position for first time
  storeScroll();

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
