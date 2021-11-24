import React from 'react'
import { useAuth } from '../../contexts/authContext'
import logo from '../../images/Logo.png'
import searchIcon from '../../images/search.png'
import '../../css/shared/header.css'

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

function Header({setExploreMovies, lang, setSelectedGenre, watchlist, setIsExploreEmpty, isNewPopular, setIsNewPopular}) {

    const { userSignOut } = useAuth()
    const { getMovies } = require ('../../controllers/moviesController')

    function signOut() {
        userSignOut()
    }

    async function handleMovies() {
        const data = await getMovies(lang,'Movies', 1)
        const movies = data.data.results
        setIsExploreEmpty(false)
        setIsNewPopular(false)
        setSelectedGenre('Movies')
        setExploreMovies(movies)
        window.scroll(0,0)
    }

    function handleMyMovies() {
        if (watchlist === undefined) {
            setIsExploreEmpty(false)
            setSelectedGenre('My List')
            setIsNewPopular(false)
        } else {
            setIsExploreEmpty(false)
            setExploreMovies(watchlist)
            setSelectedGenre('My List')
            setIsNewPopular(false)
            window.scroll(0,0)
        }
        
    }

    function clearExploreMovies() {
        const reset = []
        setIsExploreEmpty(true)
        setIsNewPopular(false)
        setExploreMovies(reset)
        window.scroll(0,0)
    }

    function handleNewPopular() {
        setIsNewPopular(true)
        setIsExploreEmpty(false)
        window.scroll(0,0)
    }

    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} id="logo"></img>
                <ul>
                    <li onClick={clearExploreMovies}>
                        <p>Home</p>
                    </li>
                    <li>
                        <p>TV Shows</p>
                    </li>
                    <li onClick={handleMovies}>
                        <p>Movies</p>
                    </li>
                    <li onClick={handleNewPopular}>
                        <p>New & Popular</p>
                    </li>
                    <li onClick={handleMyMovies}>
                        <p>My List</p>
                    </li>
                </ul>
            </div>
            <div className="header-right">
                <img src={searchIcon} id="search"></img>
                <a href="">DVD</a>
                <p>BELL ICON HERE</p>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Header
