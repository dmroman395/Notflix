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

    if (this.props.arr.length < 6 ) {
      numMovies = this.props.arr.length
    } else {
      numMovies = 6
    }

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: numMovies,
      slidesToScroll: numMovies,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 800
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
                        type={this.props.type ? this.props.type : ''}
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
