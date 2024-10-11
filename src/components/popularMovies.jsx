import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrPrevious } from 'react-icons/gr';
import { RiPlayLargeLine } from 'react-icons/ri';
import { GrNext } from "react-icons/gr";

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    type: "Action",
    imgSrc: "img/popular-movie-1.jpg",
  },
  {
    id: 2,
    title: "Jungle Cruise",
    type: "Action/Adventure",
    imgSrc: "img/popular-movie-2.jpg",
  },
  {
    id: 3,
    title: "Loki",
    type: "Action",
    imgSrc: "img/popular-movie-3.jpg",
  },
  {
    id: 4,
    title: "Squid Game",
    type: "Action/Drama",
    imgSrc: "img/popular-movie-4.jpg",
  },
  {
    id: 5,
    title: "The Falcon and the Winter Soldier",
    type: "Action",
    imgSrc: "img/popular-movie-5.jpg",
  },
  {
    id: 6,
    title: "Black Widow",
    type: "Action",
    imgSrc: "img/popular-movie-6.jpg",
  },
  {
    id: 7,
    title: "Shang-Chi",
    type: "Action/Fantasy",
    imgSrc: "img/popular-movie-7.jpg",
  },
  {
    id: 8,
    title: "Free Guy",
    type: "Action/Comedy",
    imgSrc: "img/popular-movie-8.jpg",
  },
];

function PopularMovies() {
  const [moviesPerPage, setMoviesPerPage] = useState(4);

  useEffect(() => {
    const updateMoviesPerPage = () => {
      if (window.innerWidth < 768) {
        setMoviesPerPage(4);
      } else {
        setMoviesPerPage(4);
      }
    };

    updateMoviesPerPage();
    window.addEventListener('resize', updateMoviesPerPage);

    return () => {
      window.removeEventListener('resize', updateMoviesPerPage);
    };
  }, []);

  const chunkedMovies = [];
  for (let i = 0; i < movies.length; i += moviesPerPage) {
    chunkedMovies.push(movies.slice(i, i + moviesPerPage));
  }

  return (
    <section className="popular container" id="popular">
      <div className="heading d-flex justify-content-between align-items-center">
        <h2 className="heading-title">Popular Movies</h2>
        <div className="swiper-btn d-flex">
          <button
            className="swiper-button-prev m carousel-control-prev"
            data-bs-target="#movieCarousel"
            data-bs-slide="prev"
             // Style for button size
          >
            <GrPrevious   /> {/* Increase the size here */}
          </button>
          <button
          
            className="swiper-button-next carousel-control-next m-0"
            data-bs-target="#movieCarousel"
            data-bs-slide="next"
           // Style for button size
          >
            <GrNext /> {/* Increase the size here */}
          </button>
        </div>
      </div>
      <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {chunkedMovies.map((movieChunk, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="row">
                {movieChunk.map((movie) => (
                  <div className="col-3 col-md-4 col-lg-3 ps-0 pe-2" key={movie.id}>
                    <div className="movie-box">
                      <img
                        src={movie.imgSrc}
                        className="movie-box-img d-block w-100"
                        alt={movie.title}
                      />
                      <div className="box-text">
                        <h2 className="movie-title">{movie.title}</h2>
                        <span className="movie-type">{movie.type}</span>
                        <a href="#" className="watch-btn">
                          <RiPlayLargeLine className="bx" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularMovies;
