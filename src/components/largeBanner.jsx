import React from 'react';
import { RiPlayLargeLine } from 'react-icons/ri';
// import './Home.css';

function LargeBanner() {
  return (
    <section className="home container " id="home">
      <img src="/img/home-background.png" className="home-img" alt="HomeBackground" />
      <div className="home-text ">
        <h1 className="home-title"><br /></h1>
        <a href="#" className="watch-btn">
        <RiPlayLargeLine  className='bx '/>
        <span>Watch</span>
        </a>
      </div>
    </section>
  );
}

export default LargeBanner;
