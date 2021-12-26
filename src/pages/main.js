import React, { useEffect, useState} from 'react'
import { useAuth } from '../contexts/authContext'
import '../css/main/main.css'
import footerDataEn from '../data/en/footerSignIn.json'
import footerDataEs from '../data/es/footerSignIn.json'

import Featured from '../components/main/featured'
import Row from '../components/shared/row'
import RowNotflix from '../components/main/rowNotflix'
import RowTopTen from '../components/shared/rowTopTen'
import Footer from '../components/shared/footer'
import MoreInfo from '../components/shared/moreInfo'

const {getUserWatchList} = require('../controllers/userListController')

function Main({ selectedMovie, setSelectedMovie, similarMovies, setSimilarMovies, setExploreMovies, setSelectedGenre, watchlist, setWatchlist, getTrending, getAction, getComedy, getHorror, getNowPlaying, getTopRated, getPopular, getMovieDetails, getSimilarMovies, getMovieGenres, getTVGenres, setIsExploreEmpty, setIsNewPopular, nowPlayingMovies, setNowPlayingMovies }) {

    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [featuredMovie, setFeaturedMovie] = useState({})
    const [trendingMovies, setTrendingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const { currentUser } = useAuth()

    async function loadTrending() {
        const trending = []

        await getTrending(1).then((movies) => {
            movies.forEach((movie) => {
                trending.push(movie)
            })
        })
        setTrendingMovies(trending)
        const randIndex = Math.round(Math.random() * trending.length)
        const randMovie = trending[randIndex]
        setFeaturedMovie(randMovie)
    }

    async function loadPopular() {
        const popular = []

        await getPopular(1).then((movies) => {
            movies.forEach((movie) => {
                popular.push(movie)
            })
            setPopularMovies(popular)
        })
    }

    async function loadAction() {
        const action = []

        await getAction(1).then((movies) => {
            movies.forEach((movie) => {
                action.push(movie)
            })
            setActionMovies(action)
        })
    } 

    async function loadComedy() {
        const comedy = []

        await getComedy(1).then((movies) => {
            movies.forEach((movie) => {
                comedy.push(movie)
            })
            setComedyMovies(comedy)
        })
    }

    async function loadHorror() {
        const horror = []

        await getHorror(1).then((movies) => {
            movies.forEach((movie) => {
                horror.push(movie)
            })
            setHorrorMovies(horror)
        })
    }

    async function loadNowPlaying() {
        const nowPlaying = []

        await getNowPlaying(1).then((movies) => {
            movies.forEach((movie) => {
                nowPlaying.push(movie)
            })
            setNowPlayingMovies(nowPlaying)
        })
    }

    async function loadTopRated() {
        const topRated = []

        await getTopRated(1).then((movies) => {
            movies.forEach((movie) => {
                topRated.push(movie)
            })
            setTopRatedMovies(topRated)
        })
    }

    async function loadGenres() {
        if (window.localStorage.length === 0) {
            await getMovieGenres().then(data => {
                data.data.genres.forEach(genre => {
                    window.localStorage.setItem(genre.id, genre.name)
                })
            })
            await getTVGenres().then(data => {
                data.data.genres.forEach(genre => {
                    window.localStorage.setItem(genre.id, genre.name)
                })
            })
        }
    }

    async function loadWatchlist() {
        const data = await getUserWatchList(currentUser.uid)

        setWatchlist(data)
    }

    async function loadMovies() {
        await loadWatchlist()
        // await loadTrending()
        await loadPopular()
        // await loadAction()
        // await loadComedy()
        // await loadHorror()
        // await loadNowPlaying()
        // await loadTopRated()
        // await loadGenres()
    }

    useEffect(() => {
        // loadMovies()
    }, [])

    const testList = [
        {
            "adult": false,
            "backdrop_path": "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",
            "genre_ids": [
                28,
                12,
                878
            ],
            "id": 634649,
            "original_language": "en",
            "original_title": "Spider-Man: No Way Home",
            "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
            "popularity": 13578.252,
            "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            "release_date": "2021-12-15",
            "title": "Spider-Man: No Way Home",
            "video": false,
            "vote_average": 8.5,
            "vote_count": 2390,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg",
            "genre_ids": [
                878,
                28,
                12,
                10749,
                35
            ],
            "id": 580489,
            "original_language": "en",
            "original_title": "Venom: Let There Be Carnage",
            "overview": "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
            "popularity": 7383.274,
            "poster_path": "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
            "release_date": "2021-09-30",
            "title": "Venom: Let There Be Carnage",
            "video": false,
            "vote_average": 7.2,
            "vote_count": 5061,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
            "genre_ids": [
                16,
                35,
                10751,
                14
            ],
            "id": 568124,
            "original_language": "en",
            "original_title": "Encanto",
            "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
            "popularity": 4420.039,
            "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
            "release_date": "2021-11-24",
            "title": "Encanto",
            "video": false,
            "vote_average": 7.7,
            "vote_count": 733,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg",
            "genre_ids": [
                28,
                878
            ],
            "id": 624860,
            "original_language": "en",
            "original_title": "The Matrix Resurrections",
            "overview": "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
            "popularity": 4069.454,
            "poster_path": "/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
            "release_date": "2021-12-16",
            "title": "The Matrix Resurrections",
            "video": false,
            "vote_average": 7.6,
            "vote_count": 757,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/dK12GIdhGP6NPGFssK2Fh265jyr.jpg",
            "genre_ids": [
                28,
                35,
                80,
                53
            ],
            "id": 512195,
            "original_language": "en",
            "original_title": "Red Notice",
            "overview": "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
            "popularity": 3517.416,
            "poster_path": "/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
            "release_date": "2021-11-04",
            "title": "Red Notice",
            "video": false,
            "vote_average": 6.8,
            "vote_count": 2229,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/cinER0ESG0eJ49kXlExM0MEWGxW.jpg",
            "genre_ids": [
                28,
                12,
                14
            ],
            "id": 566525,
            "original_language": "en",
            "original_title": "Shang-Chi and the Legend of the Ten Rings",
            "overview": "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.",
            "popularity": 2774.065,
            "poster_path": "/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
            "release_date": "2021-09-01",
            "title": "Shang-Chi and the Legend of the Ten Rings",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 4533,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/gg2w8QYf6o5elN95RHtikQaVIsc.jpg",
            "genre_ids": [
                28,
                18,
                80
            ],
            "id": 592508,
            "original_language": "hi",
            "original_title": "Sooryavanshi",
            "overview": "A fearless, faithful albeit slightly forgetful Mumbai cop, Veer Sooryavanshi, the chief of the Anti-Terrorism Squad in India pulls out all the stops and stunts to thwart a major conspiracy to attack his city.",
            "popularity": 2665.146,
            "poster_path": "/1vuix8r1CJ2M6IldR27Z95hWm7e.jpg",
            "release_date": "2021-11-05",
            "title": "Sooryavanshi",
            "video": false,
            "vote_average": 5.6,
            "vote_count": 40,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/o76ZDm8PS9791XiuieNB93UZcRV.jpg",
            "genre_ids": [
                27,
                28,
                878
            ],
            "id": 460458,
            "original_language": "en",
            "original_title": "Resident Evil: Welcome to Raccoon City",
            "overview": "Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company’s exodus left the city a wasteland…with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever…changed…and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night.",
            "popularity": 2537.637,
            "poster_path": "/3eVpNCMoi3C8lA0F0n2retnwvCK.jpg",
            "release_date": "2021-11-24",
            "title": "Resident Evil: Welcome to Raccoon City",
            "video": false,
            "vote_average": 6.3,
            "vote_count": 381,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/sLWUtbrpiLp23a0XDSiUiltdFPJ.jpg",
            "genre_ids": [
                28,
                12,
                14
            ],
            "id": 1930,
            "original_language": "en",
            "original_title": "The Amazing Spider-Man",
            "overview": "Peter Parker is an outcast high schooler abandoned by his parents as a boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most teenagers, Peter is trying to figure out who he is and how he got to be the person he is today. As Peter discovers a mysterious briefcase that belonged to his father, he begins a quest to understand his parents' disappearance – leading him directly to Oscorp and the lab of Dr. Curt Connors, his father's former partner. As Spider-Man is set on a collision course with Connors' alter ego, The Lizard, Peter will make life-altering choices to use his powers and shape his destiny to become a hero.",
            "popularity": 2145.162,
            "poster_path": "/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg",
            "release_date": "2012-06-23",
            "title": "The Amazing Spider-Man",
            "video": false,
            "vote_average": 6.6,
            "vote_count": 13950,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/1Wlwnhn5sXUIwlxpJgWszT622PS.jpg",
            "genre_ids": [
                16,
                35,
                10751
            ],
            "id": 585245,
            "original_language": "en",
            "original_title": "Clifford the Big Red Dog",
            "overview": "As Emily struggles to fit in at home and at school, she discovers a small red puppy who is destined to become her best friend. When Clifford magically undergoes one heck of a growth spurt, becomes a gigantic dog and attracts the attention of a genetics company, Emily and her Uncle Casey have to fight the forces of greed as they go on the run across New York City. Along the way, Clifford affects the lives of everyone around him and teaches Emily and her uncle the true meaning of acceptance and unconditional love.",
            "popularity": 2099.791,
            "poster_path": "/30ULVKdjBcQTsj2aOSThXXZNSxF.jpg",
            "release_date": "2021-11-10",
            "title": "Clifford the Big Red Dog",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 676,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/tTlAA0REGPXSZPBfWyTW9ipIv1I.jpg",
            "genre_ids": [
                28,
                12,
                878,
                18
            ],
            "id": 315635,
            "original_language": "en",
            "original_title": "Spider-Man: Homecoming",
            "overview": "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
            "popularity": 2063.295,
            "poster_path": "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
            "release_date": "2017-07-05",
            "title": "Spider-Man: Homecoming",
            "video": false,
            "vote_average": 7.4,
            "vote_count": 17525,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/zlj0zHo67xXoj7hvwGtaKRkSdBV.jpg",
            "genre_ids": [
                878,
                53,
                12
            ],
            "id": 728526,
            "original_language": "en",
            "original_title": "Encounter",
            "overview": "A decorated Marine goes on a rescue mission to save his two young sons from an unhuman threat. As their journey takes them in increasingly dangerous directions, the boys will need to leave their childhoods behind.",
            "popularity": 1998.983,
            "poster_path": "/tUkY0WxffPZ9PoyC62PIyyUMGnt.jpg",
            "release_date": "2021-12-03",
            "title": "Encounter",
            "video": false,
            "vote_average": 6.3,
            "vote_count": 124,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/lyvszvJJqqI8aqBJ70XzdCNoK0y.jpg",
            "genre_ids": [
                28,
                12,
                14,
                878
            ],
            "id": 524434,
            "original_language": "en",
            "original_title": "Eternals",
            "overview": "The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.",
            "popularity": 1684.922,
            "poster_path": "/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg",
            "release_date": "2021-11-03",
            "title": "Eternals",
            "video": false,
            "vote_average": 7.1,
            "vote_count": 1508,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/sWvxBXNtCOaGdtpKNLiOqmwb10N.jpg",
            "genre_ids": [
                14,
                28
            ],
            "id": 557,
            "original_language": "en",
            "original_title": "Spider-Man",
            "overview": "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
            "popularity": 1679.64,
            "poster_path": "/gSZyYEK5AfZuOFFjnVPUCLvdOD6.jpg",
            "release_date": "2002-05-01",
            "title": "Spider-Man",
            "video": false,
            "vote_average": 7.2,
            "vote_count": 14767,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/5B22eed7ErxFiYAG4Ksb4eLwKNF.jpg",
            "genre_ids": [
                16,
                12,
                35,
                10751
            ],
            "id": 770254,
            "original_language": "en",
            "original_title": "Back to the Outback",
            "overview": "Tired of being locked in a reptile house where humans gawk at them like they are monsters, a ragtag group of Australia’s deadliest creatures plot an escape from their zoo to the Outback, a place where they’ll fit in without being judged.",
            "popularity": 1562.32,
            "poster_path": "/zNXNRLH5wJprUG6B1olaBTNZOjy.jpg",
            "release_date": "2021-12-03",
            "title": "Back to the Outback",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 135,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/xGrTm3J0FTafmuQ85vF7ZCw94x6.jpg",
            "genre_ids": [
                18,
                36,
                12
            ],
            "id": 589761,
            "original_language": "ru",
            "original_title": "Чернобыль",
            "overview": "The aftermath of a shocking explosion at the Chernobyl nuclear power station made hundreds of people sacrifice their lives to clean up the site of the catastrophe and to successfully prevent an even bigger disaster that could have turned a large part of the European continent into an uninhabitable exclusion zone. This is their story.",
            "popularity": 1555.665,
            "poster_path": "/lqu0E3zCBdT90U9HqsrOWx1Ycn3.jpg",
            "release_date": "2021-04-15",
            "title": "Chernobyl: Abyss",
            "video": false,
            "vote_average": 6.2,
            "vote_count": 243,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/ng6SSB3JhbcpKTwbPDsRwUYK8Cq.jpg",
            "genre_ids": [
                28,
                12,
                878
            ],
            "id": 429617,
            "original_language": "en",
            "original_title": "Spider-Man: Far From Home",
            "overview": "Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.",
            "popularity": 1552.068,
            "poster_path": "/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
            "release_date": "2019-06-28",
            "title": "Spider-Man: Far From Home",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 11424,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/u7SeO6Y42P7VCTWLhpnL96cyOqd.jpg",
            "genre_ids": [
                28,
                12,
                14
            ],
            "id": 102382,
            "original_language": "en",
            "original_title": "The Amazing Spider-Man 2",
            "overview": "For Peter Parker, life is busy. Between taking out the bad guys as Spider-Man and spending time with the person he loves, Gwen Stacy, high school graduation cannot come quickly enough. Peter has not forgotten about the promise he made to Gwen’s father to protect her by staying away, but that is a promise he cannot keep. Things will change for Peter when a new villain, Electro, emerges, an old friend, Harry Osborn, returns, and Peter uncovers new clues about his past.",
            "popularity": 1531.894,
            "poster_path": "/c3e9e18SSlvFd1cQaGmUj5tqL5P.jpg",
            "release_date": "2014-04-16",
            "title": "The Amazing Spider-Man 2",
            "video": false,
            "vote_average": 6.4,
            "vote_count": 10209,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/mFbS5TwN95BcSEfiztdchLgTQ0v.jpg",
            "genre_ids": [
                28,
                18,
                36
            ],
            "id": 617653,
            "original_language": "en",
            "original_title": "The Last Duel",
            "overview": "King Charles VI declares that Knight Jean de Carrouges settle his dispute with his squire, Jacques Le Gris, by challenging him to a duel.",
            "popularity": 1495.953,
            "poster_path": "/zjrJE0fpzPvX8saJXj8VNfcjBoU.jpg",
            "release_date": "2021-10-13",
            "title": "The Last Duel",
            "video": false,
            "vote_average": 7.6,
            "vote_count": 1105,
            "contentType": "movie"
        },
        {
            "adult": false,
            "backdrop_path": "/srFi3oLy8tBcpq07xusnAE5XhwE.jpg",
            "genre_ids": [
                16,
                35,
                10751,
                10402
            ],
            "id": 438695,
            "original_language": "en",
            "original_title": "Sing 2",
            "overview": "Buster and his new cast now have their sights set on debuting a new show at the Crystal Tower Theater in glamorous Redshore City. But with no connections, he and his singers must sneak into the Crystal Entertainment offices, run by the ruthless wolf mogul Jimmy Crystal, where the gang pitches the ridiculous idea of casting the lion rock legend Clay Calloway in their show. Buster must embark on a quest to find the now-isolated Clay and persuade him to return to the stage.",
            "popularity": 1444.857,
            "poster_path": "/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg",
            "release_date": "2021-12-01",
            "title": "Sing 2",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 52,
            "contentType": "movie"
        }
    ]

    return (
        <div className='main'>
            {Object.keys(selectedMovie).length === 0  ? 
                null
                : 
                <MoreInfo data={selectedMovie} similarMovies={similarMovies}  setSelectedMovie={setSelectedMovie} watchlist={watchlist} setWatchlist={setWatchlist}/>
            }
            <Featured  movie={featuredMovie} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} watchlist={watchlist} setWatchlist={setWatchlist} nowPlayingMovies={nowPlayingMovies}/>
            <div className='rows-container'>
                {/* {
                   (watchlist && watchlist.length != 0) ?
                    <Row
                    arr={watchlist}
                    getMovieDetails={getMovieDetails}                    
                    headline={'My List'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                /> :
                null
                } */}
                <Row
                    arr={testList}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Popular on Notflix'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                {/* <Row
                    arr={trendingMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Trending Now'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                
                <Row
                    arr={actionMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Action & Adventure'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <RowNotflix
                    arr={topRatedMovies}
                    getMovieDetails={getMovieDetails}
                    getSimilarMovies={getSimilarMovies}
                    setSimilarMovies={setSimilarMovies}                    
                    headline={'Only on Notflix'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <RowTopTen
                    arr={nowPlayingMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Top 10 in the U.S. Today'}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={comedyMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Comedy'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                />
                <Row
                    arr={horrorMovies}
                    getMovieDetails={getMovieDetails}                    
                    headline={'Horror'}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    setExploreMovies={setExploreMovies}
                    setSelectedGenre={setSelectedGenre}
                    watchlist={watchlist} 
                    setWatchlist={setWatchlist}
                    setIsExploreEmpty={setIsExploreEmpty}
                    setIsNewPopular={setIsNewPopular}
                /> */}
            </div>
                <Footer                        
                    data={footerDataEn}
                    style={'footer3'}
                />
        </div>
    )
}

export default Main
