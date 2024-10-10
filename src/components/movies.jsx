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
      img: "/betel3ela/betel3ela.jpg",
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
  {/*Movies Content*/}
  <div className="movies-content">
    {/*Movies Box 1*/}
    <div className="movie-box">
      <img src="img/movie-1.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">Jumanji: Welcome to the Jungle</h2>
        <span className="movie-type">Action</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
    {/*Movies Box 2*/}
    <div className="movie-box">
      <img src="img/betel3ela.webp" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">مسلسل بيت العيله</h2>
        <span className="movie-type">مسلسل بيت العيله</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a>    
      </div>
    </div>{/*Movies Box 3*/}
    <div className="movie-box">
      <img src="img/movie-3.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">Shang-Chi</h2>
        <span className="movie-type">Action/Sci-Fi</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
    {/*Movies Box 4*/}
    <div className="movie-box">
      <img src="img/movie-4.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">Eternals</h2>
        <span className="movie-type">Action/Sci-Fi</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
    {/*Movies Box 5*/}
    <div className="movie-box">
      <img src="img/movie-5.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">Spectre</h2>
        <span className="movie-type">Action</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
    {/*Movies Box 6*/}
    <div className="movie-box">
      <img src="img/movie-6.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">Money Heist</h2>
        <span className="movie-type">Action/Sci-Fi</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
    {/*Movies Box 7*/}
    <div className="movie-box">
      <img src="img/movie-7.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">The Wolverine</h2>
        <span className="movie-type">Action/Sci-Fi</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
    {/*Movies Box 8*/}
    <div className="movie-box">
      <img src="img/movie-8.jpg" className="movie-box-img" />
      <div className="box-text">
        <h2 className="movie-title">Johnny English</h2>
        <span className="movie-type">Action/Comedy</span>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        </a> 
      </div>
    </div>
  </div>
  <div className="next-page">
        <a href="#" className="next-btn">Next Page</a>
    </div>
</section>

  );
}

export default Movies;
