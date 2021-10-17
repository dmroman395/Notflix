import '../../css/main/row.css'
import MovieCard from './movieCard'
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
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 6,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 800,
    };

    const row = this.props.arr.map((movie, i) => {
                return (
                    <MovieCard
                        lang={this.props.lang}
                        movie={movie}
                        getMovieDetails={this.props.getMovieDetails}
                        key={i}
                        selectedMovie={this.props.selectedMovie}
                        setSelectedMovie={this.props.setSelectedMovie}
                        similarMovies={this.props.similarMovies}
                        setSimilarMovies={this.props.setSimilarMovies}
                        watchList={this.props.watchList} 
                        setWatchlist={this.props.setWatchlist}
                    />
                )
            })
            
    const setGenre = this.props.setSelectedGenre
    const headline = this.props.headline
    const setExploreAll = this.props.setExploreMovies
    const currentMovies = this.props.arr

    function handleExploreAll() {
      setGenre(headline)
      setExploreAll(currentMovies)
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
