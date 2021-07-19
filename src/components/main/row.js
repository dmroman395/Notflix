import '../../css/main/row.css'
import MovieCard from './movieCard'
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
    />
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={'arrow left'}
      onClick={onClick}
    />
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
      speed: 800
    };

    const row = this.props.arr.map((movie, i) => {
                return (
                    <MovieCard
                        lang={this.props.lang}
                        movie={movie}
                        getMovieDetails={this.props.getMovieDetails}
                        key={i}
                    />
                )
            })

    return (
        <Slider {...settings}>
         {row}
        </Slider>
    );
  }
}
