// App.js
import React from "react";
import "./App.css"; // Import your CSS
import JumanjiPage from "./pages/play";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/footer";
import Header from "./components/header";
import AddMovieForm from "./components/uploadVideo";
import MoviesPage from "./components/VideoList";
import SignupPage from "./pages/signUp";
import Login from "./pages/login";
import Admin from "./pages/admin";
import CategoryPage from "./pages/category";
import YourMovies from "./pages/yourMovies";
import UploadVideo from "./components/uploadVideo";
import ResetPassword from "./pages/resetPassword";
import { AuthProvider } from "./auth/authContext";
import ProtectedRoute from "./auth/protected/protectRoutes";
import Categories from "./pages/category";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/play" Component={JumanjiPage} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignupPage} />
          <Route path="/your-movies" Component={YourMovies} />
          <Route path="/upload" Component={UploadVideo} />
          <Route path="/all-movies" Component={MoviesPage} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryId" element={<Categories />} />{" "}
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
