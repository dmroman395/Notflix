import React from 'react'
import { useAuth } from '../../contexts/authContext'
import logo from '../../images/Logo.png'
import searchIcon from '../../images/search.png'
import cancel from '../../images/cancel.png'
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

function Header({setExploreMovies, lang, setSelectedGenre, watchlist, setIsExploreEmpty, setIsNewPopular, isSearch, setIsSearch, setContentType}) {

    const { userSignOut } = useAuth()
    const { getMovies } = require ('../../controllers/moviesController')
    const { search } = require('../../controllers/moviesController')
    const { getPopularTV, getShowDetails, getTVShows } = require('../../controllers/tvShowsController')

    function signOut() {
        userSignOut()
    }

    async function handleMovies() {
        setContentType('movies')
        const data = await getMovies(lang,'Movies', 1)
        const movies = data.data.results
        setIsExploreEmpty(false)
        setIsNewPopular(false)
        setSelectedGenre('Movies')
        setExploreMovies(movies)
        window.scroll(0,0)
    }

    function handleMyMovies() {
        setContentType('movie')
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
        setContentType('movie')
        const reset = []
        setIsExploreEmpty(true)
        setIsNewPopular(false)
        setExploreMovies(reset)
        window.scroll(0,0)
    }

    function handleNewPopular() {
        setContentType('movie')
        setIsNewPopular(true)
        setIsExploreEmpty(false)
        window.scroll(0,0)
    }

    function handleCancel(e) {
        setContentType('movie')
        e.preventDefault()
        const search = document.querySelector('#search')
        const cancel = document.querySelector('.cancel > img')
        
        search.value = '';
        cancel.style.opacity = '0'

        const reset = []
        setExploreMovies(reset)
        setIsExploreEmpty(true)
    }

    async function handleSearch(e) {
        setContentType('movie')
        e.stopPropagation()
        const val = e.target.value
        const cancel = document.querySelector('.cancel > img')

        if (val.length) {
            cancel.style.opacity = '1'
            const data = await search(lang, val, 1)

            setIsNewPopular(false)
            setExploreMovies(data.data.results)
            setIsExploreEmpty(false)
            setIsSearch(true)
            setSelectedGenre(`Search results`)
        } else {
            cancel.style.opacity = '0'
            const reset = []
            setExploreMovies(reset)
            setIsExploreEmpty(true)
            setIsSearch(false)
        }        
    }

    async function handleTV() {
        setContentType('tv')
        let results = []
        const popularTv = await getPopularTV(lang, 1)

        for (let show of popularTv.data.results) {
            const data = await getShowDetails(lang, show.id ,1)

            const obj = {
                ...data,
                genre_ids: show.genre_ids
            }

            results.push(obj)
        }
        setExploreMovies(results)
        setSelectedGenre('Popular TV Shows')
        setIsNewPopular(false)
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
                    <li onClick={handleTV}>
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
                <form className='search-bar'>
                    <button type='button'><img src={searchIcon} ></img></button>
                    <input type='text' placeholder='Search...' onChange={e => handleSearch(e)} id='search'></input>
                    <button className='cancel' onClick={e => handleCancel(e)} ><img src={cancel} ></img></button>
                </form>
                <a href="">DVD</a>
                <p>BELL ICON HERE</p>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Header
