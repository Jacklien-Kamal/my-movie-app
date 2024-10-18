import React, { useEffect, useState } from 'react';
import { auth, db } from '../auth/firebase'; // Ensure 'db' is the Firestore instance
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { RiPlayLargeLine } from "react-icons/ri"; // Import the play icon for consistency
import { onAuthStateChanged } from "firebase/auth"; // Import the method
import { FaPlus } from "react-icons/fa";

const YourMovies = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [user, setUser] = useState(null); // State to track the logged-in user
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user state when logged in
        await checkAdminRole(currentUser); // Check if the user is an admin
        fetchUserMovies(currentUser.uid);
      } else {
        setUser(null); // Clear user state when logged out
        setUserMovies([]);
        setIsAdmin(false); // Reset admin status
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const checkAdminRole = async (currentUser) => {
    if (currentUser.email === 'hlmrak67@gmail.com') { // Check if the email matches the admin
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid)); // Get the user document from Firestore
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true); // Set admin status if the role is 'admin'
      }
    }
  };

  const fetchUserMovies = async (userId) => {
    try {
      const moviesRef = collection(db, 'movies');
      const q = query(moviesRef, where('userId', '==', userId));
      const moviesSnapshot = await getDocs(q);
      const userMoviesData = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched movies:", userMoviesData);
      setUserMovies(userMoviesData);
    } catch (error) {
      console.error("Error fetching user movies: ", error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await deleteDoc(doc(db, 'movies', movieId)); // Delete the movie document from Firestore
      setUserMovies(userMovies.filter(movie => movie.id !== movieId)); // Update state after deletion
      console.log('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEdit = (movieId) => {
    // Navigate to the edit page for the movie (you can implement navigation logic here)
    console.log('Navigate to edit page for movie with ID:', movieId);
  };

  return (
    <section className="movies container mt-5 profile" id="uploadedMovies">
      <div className="heading">
        <h2 className="heading-title">Your Uploaded Movies</h2>
      </div>
      <div className="movies-content">
        {userMovies.length > 0 ? (
          userMovies.map((movie) => (
            <div className="movie-box" key={movie.id}>
              <img src={movie.image} alt={movie.title} className="movie-box-img" />
              <div className="box-text">
                <h2 className="movie-title">{movie.title}</h2>
                <a href={movie.url} target="_blank" rel="noopener noreferrer" className="watch-btn">
                  <RiPlayLargeLine className='bx' />
                </a>
                <div className="mt-2">
                  {isAdmin ? (
                    <>
                      <button className="btn btn-warning me-2" onClick={() => handleEdit(movie.id)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
                    </>
                  ) : (
                    <button className="btn btn-danger delete" onClick={() => handleDelete(movie.id)}>Delete</button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found. You haven't uploaded any movies yet.</p>
        )}
      </div>

      {user && ( // Only show the Upload Movie button if the user is logged in
        <div className="next-page">
          <a href="/upload" className="next-btn"><FaPlus /> Upload Movie</a>
        </div>
      )}
    </section>
  );
};

export default YourMovies;
