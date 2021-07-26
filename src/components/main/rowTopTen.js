import '../../css/main/row.css'
import MovieCardTopTen from './movieCardTopTen'
import React, { Component } from "react";
import Slider from "react-slick";
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
                    />
                )
            })

    return (
      <div className='row-container'>
        <h1>{this.props.headline}</h1>
        <Slider {...settings}>
         {row}
        </Slider>
      </div>
        
    );
  }
}
