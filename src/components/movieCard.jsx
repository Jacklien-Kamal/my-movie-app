import React from "react";
import { RiPlayLargeLine } from "react-icons/ri";

export default function MovieCard({
  movie,
  isAdmin,
  handleEditClick,
  handleDelete,
}) {
  return (
    <div className="movie-box">
      <img src={movie.image} alt={movie.title} className="movie-box-img" />{" "}
    
      <div className="box-text">
        <h2 className="movie-title">{movie.title}</h2>
        <span className="movie-type">{movie.type}</span>
        <a href={movie.url} className="watch-btn">
          {" "}
          {/* Ensure 'url' matches your Firestore field name */}
          <RiPlayLargeLine className="bx" />
        </a>
        <div className="mt-2">
          {isAdmin ? ( // Only show buttons if the user is admin
            <>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEditClick(movie)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger delete"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <p className="text-muted"></p> // Message for non-admin users
          )}
        </div>
      </div>
    </div>
  );
}
