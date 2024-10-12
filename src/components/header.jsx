import React, { useEffect, useState } from "react";
import { TbHome } from "react-icons/tb";
import { PiFireFill } from "react-icons/pi";
import { MdOutlineExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";
import { auth } from "../auth/firebase"; // Import your Firebase auth
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../auth/firebase"; // Import your Firestore database

function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // State for user role

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user.email.split("@")[0]); // Display part before @gmail.com

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Use user.uid to get the document
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Assuming the role is stored under the 'role' field
        } else {
          setRole(null); // User does not exist in Firestore
        }
      } else {
        setUser(null);
        setRole(null); // Reset role when user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut(); // Logout function
    setUser(null);
    setRole(null); // Reset role on logout
  };

  return (
    <header>
      <div className="nav container">
        <a href="/" className="logo">
          TO<span>D</span>
        </a>
        <div className="search-box">
          <input
            type="search"
            name=""
            id="search-input"
            placeholder="Search movie"
          />
          <CgSearch className="bx bx-search" />
        </div>
        <div className="user">
          {user ? (
            <>
              <span>Hi, {user}</span>
              <a
                href="#"
                className="login-button text-warning ms-2"
                onClick={handleLogout}
              >
                Logout
              </a>
            </>
          ) : (
            <a href="/login" className="login-button text-warning">
              Login
            </a>
          )}
        </div>
        <div className="navbar">
          <a href="/" className="nav-link nav-active">
            <TbHome className="bx bx-home" />
            <span className="nav-link-title">Home</span>
          </a>
          <a href="/play" className="nav-link">
            <PiFireFill className="bx bxs-hot" />
            <span className="nav-link-title">Trending</span>
          </a>
          <a href="/" className="nav-link">
            <MdOutlineExplore className="bx bx-compass" />
            <span className="nav-link-title">Explore</span>
          </a>
          <a href="/all-movies" className="nav-link">
            <PiTelevisionSimpleBold className="bx bx-tv" />
            <span className="nav-link-title">Movies</span>
          </a>
          <a href="/profile" className="nav-link">
            <FaRegUserCircle className="bx bx-tv" />
            <span className="nav-link-title">Your Videos</span>
          </a>
          {user === "hlmrak67"  && ( // Corrected email comparison
              <a href="/admin" className="nav-link">
                <IoSettingsOutline className="bx bx-cog" />
                <span className="nav-link-title">Admin Panel</span>
              </a>
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;
