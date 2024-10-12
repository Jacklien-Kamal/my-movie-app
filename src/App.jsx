import React from "react";
import "./App.css"; // Import your CSS
import JumanjiPage from "./pages/play";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Footer from "./components/footer";
import Header from "./components/header";
import AddMovieForm from "./components/VideoForm";
import MoviesPage from "./components/VideoList";
import SignupPage from "./pages/signUp";
import LoginPage from "./pages/login";
import UserProfile from "./pages/user";
import Login from "./pages/login";
import VideoForm from "./components/VideoForm";
import Admin from "./pages/admin";

function App() {
  return (
    <div>
      <Header />
      <Router>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/play" Component={JumanjiPage} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/profile" Component={UserProfile} />
        <Route path="/upload" Component={VideoForm} />
        <Route path="/all-movies" Component={MoviesPage} />
        <Route path="/admin" Component={Admin} />
      </Routes>
      </Router>
     

      <Footer  />
    </div>
  );
}

export default App;