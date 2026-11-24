import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slides = [
    {
      image: "/images/banner1.jpg",
      tag: "NEW SEASON COLLECTION",
      title: "ELEVATE YOUR STYLE",
      offer: "UP TO 50% OFF",
      description: "Discover timeless fashion and redefine your everyday look."
    },
    {
      image: "/images/banner1.jpg",
      tag: "FRESH FASHION ARRIVALS",
      title: "DRESS YOUR BEST",
      offer: "SPECIAL OFFERS",
      description: "Find your favourites and make every outfit memorable."
    },
    {
      image: "/images/banner1.jpg",
      tag: "EXCLUSIVE COLLECTION",
      title: "YOUR STYLE, YOUR STORY",
      offer: "SHOP THE LATEST",
      description: "Explore new styles made for every occasion."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide === slides.length - 1) {
        setIsTransitioning(false);
        setCurrentSlide(0);

        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      } else {
        setCurrentSlide(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="banner" id="home">
      <div className="banner-slider">

        <div
          className="slides"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isTransitioning
              ? "transform 0.7s ease-in-out"
              : "none"
          }}
        >
          {slides.map((slide, index) => (
            <div className="slide" key={index}>

              <div className="banner-content">
                <span className="banner-tag">
                  {slide.tag}
                </span>

                <h1>{slide.title}</h1>

                <h2 className="banner-offer">
                  {slide.offer}
                </h2>

                <p>{slide.description}</p>

                <Link className="banner-cta" to="/products">
                  SHOP NOW <span>→</span>
                </Link>
              </div>

              <div className="banner-image">
                <img
                  src={slide.image}
                  alt="StyleHub Fashion Collection"
                />
              </div>

            </div>
          ))}
        </div>

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={
                currentSlide === index ? "dot active" : "dot"
              }
              onClick={() => {
                setIsTransitioning(true);
                setCurrentSlide(index);
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Banner;