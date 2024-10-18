import React, { useState, useEffect } from "react";
import { RiPlayLargeLine } from "react-icons/ri";
import { db } from "../auth/firebase"; // Firebase configuration
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom"; // For navigation
import MovieCard from "../components/movieCard";

function MoviesByCategory() {
  const [categories, setCategories] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // Define admin state here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndMovies = async () => {
      try {
        // Fetch all categories
        const categoriesCollection = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

        console.log("Fetched Categories: ", categoriesList); // Debugging categories
        setCategories(categoriesList);

        // For each category, fetch its movies
        const movies = {};
        for (let category of categoriesList) {
          const q = query(
            collection(db, "movies"),
            where("category", "==", category.name) // Query for movies in this category
          );
          const querySnapshot = await getDocs(q);

          // Store movies under their respective category ID
          movies[category.id] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log(`Movies for ${category.name}:`, movies[category.id]); // Debugging movies per category
        }

        setMoviesByCategory(movies); // Set state with movies categorized by their category id
      } catch (error) {
        console.error("Error fetching categories and movies:", error);
      }
    };

    fetchCategoriesAndMovies();
  }, []);

  console.log(moviesByCategory);

  return (
    <section className="categories-container container">
      {categories.map((category) => (
        <div key={category.id} className="category-section">
          {/* Display the category name */}
          <div className="heading d-flex justify-content-between align-items-center">
            <h2 className="heading-title">{category.name}</h2>
            <a href="#" onClick={() => navigate(`/category/${category.name}`)} className="icon-link icon-link-hover link-warning text-decoration-underline">See All</a>
          </div>

          <div className="carousel-container">
            <div className="carousel-inner">
              {(moviesByCategory[category.id] || []).slice(0, 4).map((movie) => (
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
        </div>
      ))}
    </section>
  );
}

export default MoviesByCategory;
