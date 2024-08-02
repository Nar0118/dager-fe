import React from "react";

import "./slider.css";

const slides = [
  {
    city: "Pads",
    // country: "Brake",
    img: "/images/pads-bg.png",
  },
  {
    city: "Wiper blades",
    img: "/images/conventional-wiper.jpg",
  },
  {
    city: "Spark plugs",
    // country: "Czech Republic",
    img: "/images/Spark-Plug.jpg",
  },
  // {
  //   city: "Amsterdam",
  //   country: "Netherlands",
  //   img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg",
  // },
  // {
  //   city: "Moscow",
  //   country: "Russia",
  //   img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg",
  // },
];

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={`slider ${sliderReady && "s--ready"}`}>
        <div className="slider__slides">
          {slides.map((slide, index) => (
            <div
              className={`slider__slide ${
                activeSlide === index && "s--active"
              } ${prevSlide === index && "s--prev"}`}
              key={index}
            >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">
                  {slide.country || slide.city}
                </h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split("").map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </h2>
              </div>
              <div className="slider__slide-parts">
                {[...Array(this.IMAGE_PARTS).fill()].map((_, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div
                      className="slider__slide-part-inner"
                      style={{ backgroundImage: `url(${slide.img})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="slider__control"
          onClick={() => this.changeSlides(-1)}
        />
        <div
          className="slider__control slider__control--right"
          onClick={() => this.changeSlides(1)}
        />
      </div>
    );
  }
}

export default Slider;
