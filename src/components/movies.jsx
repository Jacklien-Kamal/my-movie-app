import React from "react";
import { RiPlayLargeLine } from "react-icons/ri";
// import './Movies.css';

function Movies() {
  const movies = [
    {
      title: "Jumanji: Welcome to the Jungle",
      type: "Action",
      img: "/img/movie-1.jpg",
    },
    {
      title: "مسلسل بيت العيله",
      type: "مسلسل بيت العيله",
      img: "/img/betel3ela.webp",
    },
    { title: "Shang-Chi", type: "Action/Sci-Fi", img: "/img/movie-3.jpg" },
    { title: "Eternals", type: "Action/Sci-Fi", img: "/img/movie-4.jpg" },
    { title: "Spectre", type: "Action", img: "/img/movie-5.jpg" },
    { title: "Money Heist", type: "Action/Sci-Fi", img: "/img/movie-6.jpg" },
    { title: "The Wolverine", type: "Action/Sci-Fi", img: "/img/movie-7.jpg" },
    { title: "Johnny English", type: "Action/Comedy", img: "/img/movie-8.jpg" },
  ];

  return (
<section className="movies container" id="movies">
  <div className="heading">
    <h2 className="heading-title">Movies And Shows</h2>
  </div>
  <div className="movies-content">
    {movies.map((movie, index) => (
      <div className="movie-box" key={index}>
        <img src={movie.img} alt={movie.title} className="movie-box-img" />
        <div className="box-text">
          <h2 className="movie-title">{movie.title}</h2>
          <span className="movie-type">{movie.type}</span>
          <a href="#" className="watch-btn">
            <RiPlayLargeLine className='bx' />
          </a>
        </div>
      </div>
    ))}
  </div>
  <div className="next-page">
    <a href="#" className="next-btn">Next Page</a>
  </div>
</section>

  );
}

export default Movies;
