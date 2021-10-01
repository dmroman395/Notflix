import React, { useState } from 'react'
import { AuthProvider } from './contexts/authContext'
import LandingPage from './pages/landing'
import SignInPage from './pages/signInPage'
import Main from './pages/main'
import ExploreAll from './pages/exploreAll'
import './css/app/App.css'

const testSimilar = [
    {
        "adult": false,
        "backdrop_path": "/q0eXltiQKRqD3qMdN3OC55O06Dy.jpg",
        "genre_ids": [
            18,
            10749
        ],
        "id": 86331,
        "title": "Desire",
        "original_language": "fr",
        "original_title": "Q",
        "overview": "In a social context deteriorated by a countrywide economic crisis, the life of several people will be turned upside down after they meet Cécile, a character who symbolizes desire.",
        "popularity": 94.868,
        "poster_path": "/O71Q0BxQyqz8Ru6WHKJ6rxGoWc.jpg",
        "release_date": "2011-09-14",
        "video": false,
        "vote_average": 5.145,
        "vote_count": 304
    },
    {
        "adult": false,
        "backdrop_path": "/zGs5tZOlvc9cprdcU6kDOVNpujf.jpg",
        "genre_ids": [
            53,
            9648
        ],
        "id": 567,
        "title": "Rear Window",
        "original_language": "en",
        "original_title": "Rear Window",
        "overview": "A wheelchair-bound photographer spies on his neighbors from his apartment window and becomes convinced one of them has committed murder.",
        "popularity": 18.478,
        "poster_path": "/qitnZcLP7C9DLRuPpmvZ7GiEjJN.jpg",
        "release_date": "1954-09-01",
        "video": false,
        "vote_average": 8.358,
        "vote_count": 4687
    },
    {
        "adult": false,
        "backdrop_path": "/3mxteiwtcCPjbYKlyC0WxY1G9J3.jpg",
        "genre_ids": [
            18,
            53
        ],
        "id": 582,
        "title": "The Lives of Others",
        "original_language": "de",
        "original_title": "Das Leben der Anderen",
        "overview": "A tragic love story set in East Berlin with the backdrop of an undercover Stasi controlled culture. Stasi captain Wieler is ordered to follow author Dreyman and plunges deeper and deeper into his life until he reaches the threshold of doubting the system.",
        "popularity": 13.279,
        "poster_path": "/5BCyeLJHPcRwhu0YaRqUzw00JJ4.jpg",
        "release_date": "2006-03-15",
        "video": false,
        "vote_average": 8.076,
        "vote_count": 2633
    },
    {
        "adult": false,
        "backdrop_path": "/kXwz1ZOmOGzcTULoOjT4fBoulV.jpg",
        "genre_ids": [
            35,
            80
        ],
        "id": 10157,
        "title": "Police Academy 2: Their First Assignment",
        "original_language": "en",
        "original_title": "Police Academy 2: Their First Assignment",
        "overview": "Officer Carey Mahoney and his cohorts have finally graduated from the Police Academy and are about to hit the streets on their first assignment. Question is, are they ready to do battle with a band of graffiti-tagging terrorists? Time will tell, but don't sell short this cheerful band of doltish boys in blue.",
        "popularity": 20.926,
        "poster_path": "/cIyvBInW2aGms0zyV9Pgwp9UPJ4.jpg",
        "release_date": "1985-03-28",
        "video": false,
        "vote_average": 6.019,
        "vote_count": 1053
    },
    {
        "adult": false,
        "backdrop_path": "/vkDwP6aQRU7AuL5NdhqIGeQ2lve.jpg",
        "genre_ids": [
            35,
            10749
        ],
        "id": 12795,
        "title": "Another Gay Movie",
        "original_language": "en",
        "original_title": "Another Gay Movie",
        "overview": "In the dirtiest, funniest, most scandalous gay-teen-sex-comedy-parody ever, four young gay friends make a pact to lose their virginity by the end of the summer. The boys soon face giant sex toys, naked celebrities, masochistic teachers and an uncontrollable romance with a quiche.",
        "popularity": 16.836,
        "poster_path": "/j8U059o7q2PG5LDxO2jyTTUBxYR.jpg",
        "release_date": "2006-04-28",
        "video": false,
        "vote_average": 5.968,
        "vote_count": 125
    },
    {
        "adult": false,
        "backdrop_path": "/qNb5QLVmt4ng60iMnxnqobTuhJP.jpg",
        "genre_ids": [
            18,
            53
        ],
        "id": 10998,
        "title": "Fatal Attraction",
        "original_language": "en",
        "original_title": "Fatal Attraction",
        "overview": "A married man's one night stand comes back to haunt him when that lover begins to stalk him and his family.",
        "popularity": 12.137,
        "poster_path": "/6QWziDIbcVVpnTGuaKjcxXC9Kl4.jpg",
        "release_date": "1987-09-11",
        "video": false,
        "vote_average": 6.798,
        "vote_count": 974
    },
    {
        "adult": false,
        "backdrop_path": "/nTWRp59HVrlkz7tpqcbQd4ezPY4.jpg",
        "genre_ids": [
            53,
            18,
            10749
        ],
        "id": 10497,
        "title": "Bitter Moon",
        "original_language": "en",
        "original_title": "Bitter Moon",
        "overview": "A passenger on a cruise ship develops an irresistible infatuation with an eccentric paraplegic's wife.",
        "popularity": 15.631,
        "poster_path": "/qU9hqUSGyQfbkEdqluX21nWVcp9.jpg",
        "release_date": "1992-09-02",
        "video": false,
        "vote_average": 7.068,
        "vote_count": 458
    },
    {
        "adult": false,
        "backdrop_path": "/dFSF6cIzacFsgOBIfsztd90AIyj.jpg",
        "genre_ids": [
            18,
            53,
            9648
        ],
        "id": 345,
        "title": "Eyes Wide Shut",
        "original_language": "en",
        "original_title": "Eyes Wide Shut",
        "overview": "After Dr. Bill Harford's wife, Alice, admits to having sexual fantasies about a man she met, Bill becomes obsessed with having a sexual encounter. He discovers an underground sexual group and attends one of their meetings -- and quickly discovers that he is in over his head.",
        "popularity": 28.6,
        "poster_path": "/a0YOhU3zq0RkOYrVlPXCeE1oFkR.jpg",
        "release_date": "1999-07-16",
        "video": false,
        "vote_average": 7.453,
        "vote_count": 4331
    },
    {
        "adult": false,
        "backdrop_path": "/bWftGh0aLMzb8wetgziLq3fHpTJ.jpg",
        "genre_ids": [
            18
        ],
        "id": 9769,
        "title": "Lolita",
        "original_language": "en",
        "original_title": "Lolita",
        "overview": "Urbane professor Humbert Humbert marries a New England widow to be near her nymphet daughter.",
        "popularity": 38.532,
        "poster_path": "/v7ZRAYz0WZrMQ1MH34cSFvC8drq.jpg",
        "release_date": "1997-09-27",
        "video": false,
        "vote_average": 7.069,
        "vote_count": 1102
    },
    {
        "adult": false,
        "backdrop_path": "/vR1HT8xYzkbDW9EviVBJ67BnIz8.jpg",
        "genre_ids": [
            28,
            878,
            53
        ],
        "id": 9383,
        "title": "Hollow Man",
        "original_language": "en",
        "original_title": "Hollow Man",
        "overview": "Cocky researcher, Sebastian Caine is working on a project to make living creatures invisible and he's so confident he's found the right formula that he tests it on himself and soon begins to vanish. The only problem is – no-one can determine how to make him visible again. Caine's predicament eventually drives him mad, with terrifying results.",
        "popularity": 19.427,
        "poster_path": "/nAasMJGaytKKsMGbrXJr0g8OufK.jpg",
        "release_date": "2000-08-04",
        "video": false,
        "vote_average": 5.882,
        "vote_count": 1833
    },
    {
        "adult": false,
        "backdrop_path": "/5DvuWbW3EvFqDFsyxkn8kSPy3L4.jpg",
        "genre_ids": [
            18,
            36,
            10749
        ],
        "id": 9453,
        "title": "Caligula",
        "original_language": "en",
        "original_title": "Caligola",
        "overview": "The perversion behind imperial Rome, the epic story of Rome's mad Emporer. All the details of his cruel, bizarre reign are revealed right here: His unholy sexual passion for his sister, his marriage to Rome's most infamous prostitute, his fiendishly inventive means of disposing those who would oppose him, and more.",
        "popularity": 20.763,
        "poster_path": "/hrlfv70HG6SBjJs1ARZqwou38FI.jpg",
        "release_date": "1979-08-14",
        "video": false,
        "vote_average": 5.789,
        "vote_count": 490
    },
    {
        "adult": false,
        "backdrop_path": "/cvH1gNIMRITdLzoWv1HNAbRyH3n.jpg",
        "genre_ids": [
            35,
            10749
        ],
        "id": 2105,
        "title": "American Pie",
        "original_language": "en",
        "original_title": "American Pie",
        "overview": "At a high-school party, four friends find that losing their collective virginity isn't as easy as they had thought. But they still believe that they need to do so before college. To motivate themselves, they enter a pact to all \"score\" by their senior prom.",
        "popularity": 60.209,
        "poster_path": "/5P68by2Thn8wHAziyWGEw2O7hco.jpg",
        "release_date": "1999-07-09",
        "video": false,
        "vote_average": 6.517,
        "vote_count": 6070
    },
    {
        "adult": false,
        "backdrop_path": "/l5p77MC0EqjqPAKuAEcAmZAfgww.jpg",
        "genre_ids": [
            10749,
            53,
            18
        ],
        "id": 2124,
        "title": "Color of Night",
        "original_language": "en",
        "original_title": "Color of Night",
        "overview": "When New York psychiatrist Bill Capa visits Los Angeles to take over his murdered colleague's therapy group, he finds himself embroiled in the thick of a mystery when he bumps into Rose and begins a torrid affair.",
        "popularity": 13.373,
        "poster_path": "/w1OBPkf3BxeC7543YzFwiKIwBFJ.jpg",
        "release_date": "1994-08-19",
        "video": false,
        "vote_average": 5.785,
        "vote_count": 384
    },
    {
        "adult": false,
        "backdrop_path": "/8Yz0WeWD1EUyJEOKMLZEeuNERyp.jpg",
        "genre_ids": [
            53,
            18,
            9648
        ],
        "id": 8271,
        "title": "Disturbia",
        "original_language": "en",
        "original_title": "Disturbia",
        "overview": "Kale is a 17-year-old placed under house arrest after punching his teacher. He is confined to his house, and decides to use his free time spying on his neighbors. Things start to get weird when guests enter the Turner's house and don't come back out. Kale and his friends, Ronnie and Ashley, start to grow more and more interested in what is actually happening within the house of Robert Turner.",
        "popularity": 14.164,
        "poster_path": "/3f9KwSrieczuH9nRrwfOsoMoMNd.jpg",
        "release_date": "2007-04-12",
        "video": false,
        "vote_average": 6.667,
        "vote_count": 2737
    },
    {
        "adult": false,
        "backdrop_path": "/zW8L1kjOVGYFjv05zZ9fKl001Uf.jpg",
        "genre_ids": [
            27
        ],
        "id": 6217,
        "title": "Cat People",
        "original_language": "en",
        "original_title": "Cat People",
        "overview": "After years of separation, Irina and her minister brother, Paul, reunite in New Orleans in this erotic tale of the supernatural. When zoologists capture a wild panther, Irina is drawn to the cat -- and the zoo curator is drawn to her. Soon, Irina's brother will have to reveal the family secret: that when sexually aroused, they turn into predatory jungle cats.",
        "popularity": 12.105,
        "poster_path": "/nYcQnkbTD4LDmp11HCReQuUoMKD.jpg",
        "release_date": "1982-04-02",
        "video": false,
        "vote_average": 6.017,
        "vote_count": 316
    },
    {
        "adult": false,
        "backdrop_path": "/iHDermFVn4DiShm5cvUK0f0rW2A.jpg",
        "genre_ids": [
            18,
            10749
        ],
        "id": 28468,
        "title": "The Key",
        "original_language": "it",
        "original_title": "La chiave",
        "overview": "After twenty years of marriage, art professor Nino Rolfe attempts to break down his wife Teresa's conventional modesty. Noticing her affection for their daughter's fiancé, Nino instigates her sexual interest in him as well. This sets off a chain of unexpected events and emotional complications, as Nino and his unpredictable fascist daughter find that they both enjoy being jealous.",
        "popularity": 23.922,
        "poster_path": "/e6g2geNLgFzMbriH6EvSJZD78nx.jpg",
        "release_date": "1983-10-19",
        "video": false,
        "vote_average": 5.9,
        "vote_count": 275
    },
    {
        "adult": false,
        "backdrop_path": "/47y1ZZGpQOSF9ITg7YTlTMecce3.jpg",
        "genre_ids": [
            27,
            53,
            10752
        ],
        "id": 28746,
        "title": "Ilsa, the Tigress of Siberia",
        "original_language": "en",
        "original_title": "Ilsa, the Tigress of Siberia",
        "overview": "Siberia 1953: Ilsa is now working in a Gulag prison camp. Her mission is to \"retrain the minds\" of those who don't agree with the communists.",
        "popularity": 14.533,
        "poster_path": "/1c3qoPfDScgU3c62v9DZhzfnsfs.jpg",
        "release_date": "1977-09-29",
        "video": false,
        "vote_average": 4.6,
        "vote_count": 33
    },
    {
        "adult": false,
        "backdrop_path": "/wqXHW3BdrqNCBXhfHtqiLtrNCjY.jpg",
        "genre_ids": [
            18,
            10749,
            53
        ],
        "id": 18220,
        "title": "Poison Ivy 2: Lily",
        "original_language": "en",
        "original_title": "Poison Ivy 2: Lily",
        "overview": "A young and naive college art student becomes obsessed with assuming the identity and personality of a departed coed who used to live in her room, and in so doing causes complications that result in two men, a student and her art professor, lusting after her.",
        "popularity": 13.19,
        "poster_path": "/jXLuQYRwWNuwW8dkx3zo5bWon2r.jpg",
        "release_date": "1996-01-16",
        "video": false,
        "vote_average": 4.759,
        "vote_count": 83
    },
    {
        "adult": false,
        "backdrop_path": "/aUeJCT6sZNLo3QoMtF7cnWvbebe.jpg",
        "genre_ids": [
            53,
            10749,
            18
        ],
        "id": 18222,
        "title": "Poison Ivy: The New Seduction",
        "original_language": "en",
        "original_title": "Poison Ivy: The New Seduction",
        "overview": "A sinister seductress vows to destroy a suburban family.",
        "popularity": 12.743,
        "poster_path": "/hyQNEGGU2FSKehEbcJdIG0k1JdQ.jpg",
        "release_date": "1997-10-20",
        "video": false,
        "vote_average": 4.77,
        "vote_count": 61
    },
    {
        "adult": false,
        "backdrop_path": "/vLS1asZSNAULDpzQEHGOrXwqibE.jpg",
        "genre_ids": [
            18,
            10749
        ],
        "id": 24402,
        "title": "Emmanuelle",
        "original_language": "fr",
        "original_title": "Emmanuelle",
        "overview": "Emmanuelle, a svelte, naive young woman, is en route to Bangkok where she'll join her new husband. He works for the French Embassy and has a lovely home, several dedicated servants, and an expensive car at his disposal. Once Emmanuelle arrives, her husband and a few friends introduce her to a realm of sexual ecstasy she'd never imagined.",
        "popularity": 18.564,
        "poster_path": "/cEXZik5xYIiEWYwswbjYVpJT5w9.jpg",
        "release_date": "1974-06-25",
        "video": false,
        "vote_average": 5.911,
        "vote_count": 450
    }
]

export function App() {
    const [lang, setLang] = useState('English')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    const [exploreMovies, setExploreMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState([])


    return (
        <AuthProvider>
            {exploreMovies.length === 0 ?
                <Main lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies}
                setExploreMovies={setExploreMovies} setSelectedGenre={setSelectedGenre}/>
                :
                <ExploreAll movies={exploreMovies} setExploreMovies={setExploreMovies} lang={lang} setLang={setLang} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} similarMovies={similarMovies} setSimilarMovies={setSimilarMovies} selectedGenre={selectedGenre}/>
            }
        </AuthProvider>
    )
}