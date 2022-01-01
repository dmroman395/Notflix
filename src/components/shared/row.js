import '../../css/shared/row.css'
import ContentCard from './contentCard'
import React, { Component } from "react";
import Slider from "react-slick";
import exploreArrow from '../../images/right-chevron-thick.png'
import leftArrow from '../../images/left-arrow-angle.png'
import rightArrow from '../../images/right-arrow-angle.png'

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'arrow right'}
      onClick={onClick}
    >
    <img src={rightArrow}></img>
  </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'arrow left'}
      onClick={onClick}
    >
      <img src={leftArrow}></img>
    </div>
  );
}

export default class Row extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    return [...props.arr]
    }

  render() {

    let numMovies
    let className

    switch(this.props.arr.length) {
      case 5:
        numMovies = 5
        className = 'small-list'
        break; 
      case 4:
        numMovies = 4
        className = 'small-list'
        break; 
      case 3:
        numMovies = 3
        className = 'small-list'
        break; 
      case 2:
        numMovies = 2
        className = 'small-list'
        break;
      case 1:
        numMovies = 1
        className = 'small-list'
        break;  
      default:
        numMovies = 6
        break;
    }

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: numMovies,
      slidesToScroll: numMovies,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      className,
      speed: 800,
      responsive: [
        {
          breakpoint: 1399,
          settings: {
            dots: false,
            slidesToShow: (this.props.arr.length > 5) ? 5 : numMovies,
            slidesToScroll: (this.props.arr.length > 5) ? 5 : numMovies,
            infinite: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            speed: 800
          }
        },
        {
          breakpoint: 1099,
          settings: {
            dots: false,
            slidesToShow: (this.props.arr.length > 4) ? 4 : numMovies,
            slidesToScroll: (this.props.arr.length > 4) ? 4 : numMovies,
            infinite: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            speed: 800
          }
        },
        {
          breakpoint: 799,
          settings: {
            dots: false,
            slidesToShow: (this.props.arr.length > 3) ? 3 : numMovies,
            slidesToScroll: (this.props.arr.length > 3) ? 3 : numMovies,
            infinite: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            speed: 800
          }
        },
        {
          breakpoint: 499,
          settings: {
            dots: false,
            slidesToShow: (this.props.arr.length > 2) ? 2 : numMovies,
            slidesToScroll: (this.props.arr.length > 2) ? 2 : numMovies,
            infinite: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            speed: 800
          }
        }
      ]
    };

    const row = this.props.arr.map((movie, i) => {
                return (
                    <ContentCard
                        data={movie}
                        getMovieDetails={this.props.getMovieDetails}
                        key={i}
                        selectedMovie={this.props.selectedMovie}
                        setSelectedMovie={this.props.setSelectedMovie}
                        similarMovies={this.props.similarMovies}
                        setSimilarMovies={this.props.setSimilarMovies}
                        watchlist={this.props.watchlist} 
                        setWatchlist={this.props.setWatchlist}
                        exploreMovies={this.props.exploreMovies}
                        setExploreMovies={this.props.setExploreMovies}
                    />
                )
            })
    
    const setGenre = this.props.setSelectedGenre
    const headline = this.props.headline
    const setExploreAll = this.props.setExploreMovies
    const currentMovies = this.props.arr
    const setExploreEmpty = this.props.setIsExploreEmpty
    const setIsNewPopular = this.props.setIsNewPopular

    function handleExploreAll() {
      setGenre(headline)
      setExploreAll(currentMovies)
      setExploreEmpty(false)
      setIsNewPopular(false)
      window.scroll(0,0)
    }
    
    return (
      <div className='row-container'>
        <div className='row-header' onClick={handleExploreAll}>
          <h1>{headline}</h1>
          <img src={exploreArrow}></img>
          <span>Explore All</span>
        </div>
        <Slider {...settings}>
         {row}
        </Slider>
      </div>
        
    );
  }
}
