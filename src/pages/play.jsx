import React, { useState, useRef, useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiPlayLargeLine } from 'react-icons/ri';

function JumanjiPage() {
  const [videoVisible, setVideoVisible] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const videoRef = useRef(null); // Reference to the video element

  // Dynamically generate episodes
  useEffect(() => {
    const episodeList = [];
    for (let i = 1; i <= 30; i++) {
      episodeList.push(`Episode ${i}`);
    }
    setEpisodes(episodeList);
  }, []);

  // Function to play the trailer
  const handlePlayTrailer = () => {
    setVideoVisible(true);
    if (videoRef.current) {
      videoRef.current.play(); // Play the video
    }
  };

  // Function to close the video player
  const handleCloseVideo = () => {
    setVideoVisible(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
    }
  };

  return (
    <div className='container'>
    

      {/* Play Movie Container */}
      <div className="play-container ">
        <img src="play-page/play-background.jpg" alt className="play-img" />
        <div className="play-text">
        <h2>Jumanji: Welcome to the Jungle</h2>
            <a href="#" class="watch-btn" id="watch-trailer">
                <span>Watch the trailer</span>
            </a>
          <a href="#" className="watch-btn">
            <RiPlayLargeLine className='bx' />
          </a>
        </div>
        <RiPlayLargeLine className="bx bx-right-arrow play-movie p-2" id="play-movie-btn" onClick={handlePlayTrailer} />
        
        {/* Video Container */}
        <div className={`video-container ${videoVisible ? 'show-video' : ''}`}>
          <div className="video-box">
            <video id="myvideo" ref={videoRef} src="play-page/Jumanji.mp4" controls />
            <button className="close-video" onClick={handleCloseVideo}>
              <IoMdCloseCircleOutline />
            </button>
          </div>
        </div>
      </div>

      {/* About Movie Section */}
      <div className="about-movie ">
      <h2>Jumanji: Welcome to the Jungle</h2>
        <p>When four students play with a magical video game, they are 
            drawn to the jungle world of Jumanji, where they are trapped 
            as their avatars. To return to the real world, they must finish 
            the game.</p>
            <h2 class="cast-heading">Movie Cast</h2>
        <div className="cast" id="episode-container">
          {/* Map over episodes and display them */}
          {episodes.map((episode, index) => (
            <div className="episode-box" key={index}>
              <a href={`episode${index + 1}.html`} className="episode-title text-black">{episode}</a>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="download">
        <h2 className="download-title">Download Movie</h2>
        <div className="download-links">
          <a href="play-page/Jumanji.mp4" download>480p</a>
          <a href="play-page/Jumanji.mp4" download>720p</a>
          <a href="play-page/Jumanji.mp4" download>1080p</a>
        </div>
      </div>

   
    </div>
  );
}

export default JumanjiPage; 