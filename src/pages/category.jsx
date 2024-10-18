import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { RiPlayLargeLine } from "react-icons/ri";

function CategoryPage() {
  const { categoryId } = useParams(); // Get the categoryId from the URL
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch videos from Firestore based on the categoryId
    const fetchVideos = async () => {
      try {
        const db = getFirestore();
        // Query the 'movies' collection where 'categoryId' matches the one from URL params
        const q = query(collection(db, "movies"), where("category", "==", categoryId));
        const querySnapshot = await getDocs(q);

        // Map over the query results and set the videos in state
        const videoList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };

    fetchVideos();
  }, [categoryId]); // Re-fetch videos whenever categoryId changes

  return (
<section className="movies container" id="movies">
<h1>Videos for Category {categoryId}</h1>
      <div className="movies-content">
        {videos.length > 0 ? (
          videos.map((movie, index) => (
            <div className="movie-box" key={index}>
              <img src={movie.image} alt={movie.title} className="movie-box-img" />
              <div className="box-text">
                <h2 className="movie-title">{movie.title}</h2>
                <span className="movie-type">{movie.type}</span>
                <a href="#" className="watch-btn">
                  <RiPlayLargeLine className='bx' />
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-5">No videos available for this category.</p>
        )}
      </div>
    </section>
  );
}

export default CategoryPage;
