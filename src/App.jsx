import React from "react";
import "./App.css"; // Import your CSS
import JumanjiPage from "./pages/play";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  return (
    <div>
      <Header />
      <Router>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/play" Component={JumanjiPage} />
      </Routes>
      </Router>

      <Footer  />
    </div>
  );
}

export default App;
