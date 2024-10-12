import React, { useEffect, useState } from "react";
import { RiPlayLargeLine } from "react-icons/ri";
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import { db, storage, auth } from '../auth/firebase'; // Adjust the import path for Firebase config

function MoviesPage() {
  const [movies, setMovies] = useState([]); // State to hold fetched movies
  const [editMode, setEditMode] = useState(null); // State to track edit mode for a specific movie
  const [editedMovie, setEditedMovie] = useState({ title: "", url: "", imageFile: null }); // State for edited movie data
  const [isUploading, setIsUploading] = useState(false); // State for managing upload progress
  const [user, setUser] = useState(null); // State for managing user authentication
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, 'movies'); // Reference to the Firestore collection
        const moviesSnapshot = await getDocs(moviesCollection); // Fetch documents from the collection
        const moviesData = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Format the fetched data
        setMovies(moviesData); // Update state with fetched movies
      } catch (error) {
        console.error("Error fetching movies: ", error); // Log any errors
      }
    };

    // Fetch movies only once on component mount
    fetchMovies();

    // Set up an authentication state listener
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user); // Set the user state based on authentication status

      if (user) {
        const userRef = doc(db, 'users', user.uid); // Reference to the user document in Firestore
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Check if the user has the email and the admin role
          if (user.email === 'hlmrak67@gmail.com' && userData.role === 'admin') {
            setIsAdmin(true); // Set isAdmin to true if the conditions are met
          }
        }
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []); // Run this effect once on component mount

  // Handle movie deletion
  const handleDelete = async (movieId) => {
    try {
      await deleteDoc(doc(db, "movies", movieId)); // Delete the movie from Firestore
      setMovies(movies.filter(movie => movie.id !== movieId)); // Update the state by removing the deleted movie
      console.log("Movie deleted successfully");
    } catch (error) {
      console.error("Error deleting movie: ", error);
    }
  };

  // Handle edit button click, setting the movie into edit mode
  const handleEditClick = (movie) => {
    setEditMode(movie.id); // Enable edit mode for the selected movie
    setEditedMovie({ title: movie.title, url: movie.url, imageFile: null }); // Populate form with current movie details, imageFile is null by default
  };

  // Handle form input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  // Handle image file change during editing
  const handleImageFileChange = (e) => {
    setEditedMovie({ ...editedMovie, imageFile: e.target.files[0] }); // Store the selected image file
  };

  // Handle movie update submission
  const handleUpdate = async (movieId) => {
    try {
      setIsUploading(true); // Set uploading state to true
      let imageUrl = null;

      // If a new image file was selected, upload it to Firebase Storage
      if (editedMovie.imageFile) {
        const storageRef = ref(storage, `images/${editedMovie.imageFile.name}`); // Reference to the new image in Firebase Storage
        await uploadBytes(storageRef, editedMovie.imageFile); // Upload image
        imageUrl = await getDownloadURL(storageRef); // Get the URL of the uploaded image
      }

      // Prepare updated movie data
      const updatedMovieData = {
        title: editedMovie.title,
        url: editedMovie.url,
        ...(imageUrl && { image: imageUrl }) // Update the image URL only if a new image was uploaded
      };

      const movieRef = doc(db, "movies", movieId);
      await updateDoc(movieRef, updatedMovieData); // Update the movie details in Firestore
      setMovies(movies.map(movie => (movie.id === movieId ? { ...movie, ...updatedMovieData } : movie))); // Update state with edited movie
      setEditMode(null); // Exit edit mode
      setIsUploading(false); // Set uploading state to false
      console.log("Movie updated successfully");
    } catch (error) {
      console.error("Error updating movie: ", error);
      setIsUploading(false); // Set uploading state to false on error
    }
  };

  return (
    <section className="movies container" id="movies">
      <div className="heading">
        <h2 className="heading-title">Movies And Shows</h2>
      </div>
      <div className="movies-content all-vid">
        {movies.length > 0 ? ( // Check if there are movies to display
          movies.map((movie) => (
            <div className="movie-box" key={movie.id}>
              {editMode === movie.id ? ( // Edit mode UI
                <div className="edit-form">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedMovie.title}
                    onChange={handleInputChange}
                    placeholder="Edit movie title"
                    className="form-control my-2"
                  />
                  <label>Video URL</label>
                  <input
                    type="text"
                    name="url"
                    value={editedMovie.url}
                    onChange={handleInputChange}
                    placeholder="Edit movie URL"
                    className="form-control my-2"
                  />
                  <label>Video Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange} // Handle image file change
                    className="form-control my-2"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(movie.id)}
                    disabled={isUploading} // Disable button while uploading
                  >
                    {isUploading ? "Uploading..." : "Save"}
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <img src={movie.image} alt={movie.title} className="movie-box-img" /> {/* Ensure 'image' matches your Firestore field name */}
                  <div className="box-text">
                    <h2 className="movie-title">{movie.title}</h2>
                    <span className="movie-type">{movie.type}</span>
                    <a href={movie.url} className="watch-btn"> {/* Ensure 'url' matches your Firestore field name */}
                      <RiPlayLargeLine className='bx' />
                    </a>
                    <div className="mt-2">
                      {isAdmin ? ( // Only show buttons if the user is admin
                        <>
                          <button className="btn btn-warning me-2" onClick={() => handleEditClick(movie)}>Edit</button>
                          <button className="btn btn-danger delete" onClick={() => handleDelete(movie.id)}>Delete</button>
                        </>
                      ) : (
                        <p></p> // Message for non-admin users
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>You must log in.</p> // Message when no movies are available
        )}
      </div>
      {isAdmin && ( // Only show the Upload Movie button if the user is an admin
        <div className="next-page">
          <a href="/upload" className="next-btn">Upload Movie</a>
        </div>
      )}
    </section>
  );
}

export default MoviesPage;
