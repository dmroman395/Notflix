import '../../css/main/row.css'
import MovieCardTopTen from './movieCardTopTen'
import React, { Component } from "react";
import Slider from "react-slick";
import exploreArrow from '../../images/right-chevron-thick.png'
import leftArrow from '../../images/left-arrow-angle.png'
import rightArrow from '../../images/right-arrow-angle.png'

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'arrow-ten right'}
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
      className={'arrow-ten left'}
      onClick={onClick}
    >
      <img src={leftArrow}></img>
    </div>
  );
}

export default class RowTopTen extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 6,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 800,
      easing: 'ease-out'
    };

    const row = this.props.arr.slice(0,10).map((movie, i) => {
                return (
                    <MovieCardTopTen
                        lang={this.props.lang}
                        movie={movie}
                        getMovieDetails={this.props.getMovieDetails}
                        key={i}
                        index={i}
                        selectedMovie={this.props.selectedMovie}
                        setSelectedMovie={this.props.setSelectedMovie}
                        similarMovies={this.props.similarMovies}
                        setSimilarMovies={this.props.setSimilarMovies}
                        watchlist={this.props.watchlist} 
                        setWatchlist={this.props.setWatchlist}
                    />
                )
            })

    const setGenre = this.props.setSelectedGenre
    const headline = this.props.headline
    const setExploreAll = this.props.setExploreMovies
    const currentMovies = this.props.arr
    const setExploreEmpty = this.props.setIsExploreEmpty

    function handleExploreAll() {
      setGenre(headline)
      setExploreAll(currentMovies)
      setExploreEmpty(false)
      window.scroll(0,0)
    }

    return (
      <div className='row-container'>
        <div className='row-header'  onClick={handleExploreAll}>
          <h1>{this.props.headline}</h1>
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
