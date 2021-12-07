import React, {useState} from "react"
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'
import Header from '../components/shared/header'
import Footer from '../components/shared/footer'
import ContentCard from "../components/shared/contentCard"
import MoreInfo from '../components/shared/moreInfo'
import NewPopular from "../components/exploreAll/newPopular"
import '../css/exploreAll/exploreAll.css'

function ExploreAll({data, lang, setLang, selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, selectedGenre, watchlist, setWatchlist, setExploreMovies, exploreMovies, getMovies, setSelectedGenre, setIsExploreEmpty, isExploreEmpty, setIsNewPopular, isNewPopular, nowPlayingMovies, isSearch, contentType}) {
    const [pageCount, setPageCount] = useState(2)

    const {
        getMovieDetails
    } = require('../controllers/moviesController')

    const { getPopularTV, getShowDetails, } = require('../controllers/tvShowsController')

    const contentMap = data.map((content, i) => {
        return (
                <ContentCard
                    lang={lang}
                    data={content}
                    getMovieDetails={getMovieDetails}
                    key={i}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                    setExploreMovies={setExploreMovies}
                    exploreMovies={data}
                    type={'2'}
                    contentType={contentType}
                />
                
        )
    })

    async function loadMore () {
        const search = document.querySelector('#search')

        let contentList = []

        switch(contentType) {
            case 'movie':
                if (search.value) {
                    contentList = await getMovies(lang, selectedGenre, pageCount, 1, 1, search.value)
                } else {
                   const test = await getMovies(lang, selectedGenre, pageCount, 1)
                    console.log(test)
                }
                break;
            case 'tv':
                const popularTv = await getPopularTV(lang, pageCount)

                for (let show of popularTv.data.results) {
                    const data = await getShowDetails(lang, show.id, 1)
        
                    const obj = {
                        ...data,
                        genre_ids: show.genre_ids
                    }
        
                    contentList.push(obj)
                }
                break;
            default:
                break;
        }

        const newCount = pageCount + 1
        setPageCount(newCount)
        let newList = [...data]
        for (let movie of (contentType === 'tv' ? contentList : contentList.results)) {
            newList.push(movie)
        }
        setExploreMovies(newList)        
    }

    window.onscroll = () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        if (scrollTop + clientHeight >= scrollHeight - 75) {
            loadMore()
        }
    }

    let content
    let message

    if (isSearch) {
        const searchVal = document.querySelector('#search')
        message = `Your search for "${searchVal.value}" did not have any matches`
    } else {
        message = "Looks like you don't have any content in your watchlist"
    }

    if (isNewPopular) {
        content =
            <div className='exploreContent2'>
                <NewPopular lang={lang} nowPlayingMovies={nowPlayingMovies} getMovieDetails={getMovieDetails} setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre} watchlist={watchlist} setWatchlist={setWatchlist} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} setIsExploreEmpty={setIsExploreEmpty} isExploreEmpty={isExploreEmpty} setIsNewPopular={setIsNewPopular} exploreMovies={exploreMovies}/>
            </div>
    } else {
        content = 
            <div className='exploreContent'>
                <h1 className='genre'>{selectedGenre}</h1>
                <div className='movies-grid'>
                    {data.length > 0 ? contentMap : <h1 className='empty-list'>{message}</h1>}
                </div>
            </div>
    }

    return (
        <div className='exploreAll'>
                {Object.keys(selectedMovie).length === 0  ? 
                    null
                    : 
                    <MoreInfo data={selectedMovie} similarMovies={similarMovies} lang={lang} setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist} setExploreMovies={setExploreMovies} exploreMovies={exploreMovies} contentType={contentType}/>
                }
            {content}
            {lang.lang === 'English' ? 
                    <Footer
                        lang={lang}
                        setLang={setLang}
                        data={footerDataEn}
                        style={'footer3'}
                    />
                 : 
                    <Footer
                        lang={lang}
                        setLang={setLang}
                        data={footerDataEs}
                        style={'footer3'}
                    />
            }
        </div>
    )
}

export default ExploreAll