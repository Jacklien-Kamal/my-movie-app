import React, { useState, useEffect } from "react";
import { db } from "../auth/firebase"; // Firebase configuration
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import { useNavigate, useParams } from "react-router-dom"; // For navigation
import MovieCard from "../components/movieCard";

function Categories() {
  const [movies, setMovies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Define admin state here
  const { categoryId } = useParams(); // Get categoryId from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      if (!categoryId) {
        console.error("categoryId is undefined");
        return; // Exit early if categoryId is not defined
      }

      try {
        // Fetch movies for the specified categoryId
        const q = query(
          collection(db, "movies"),
          where("category", "==", categoryId) // Adjust this to match your Firestore field name
        );
        const querySnapshot = await getDocs(q);

        // Map movies to array
        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(`Movies for category ${categoryId}:`, moviesList); // Debugging movies for category
        setMovies(moviesList); // Set state with movies for the category
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesByCategory();
  }, [categoryId]); // Add categoryId as a dependency

  return (
    <section className="categories-container container">
      <h2 className="heading-title">Movies in Category: {categoryId}</h2>
      <div className="carousel-container">
        <div className="carousel-inner">
          {movies.slice(0, 4).map((movie) => (
            <div className="col-3 col-md-4 col-lg-3 ps-0 pe-2 mb-5" key={movie.id}>
              <MovieCard 
                movie={movie} 
                isAdmin={isAdmin} 
                handleEditClick={(movie) => console.log("Edit", movie)} // Replace with your edit function
                handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
