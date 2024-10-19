import React, { useEffect, useState } from "react";
import { TbHome } from "react-icons/tb";
import { PiFireFill } from "react-icons/pi";
import { MdOutlineExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";
import { auth } from "../auth/firebase"; // Import your Firebase auth
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "../auth/firebase"; // Import your Firestore database
import { useNavigate } from "react-router-dom"; // For navigation
import { FaPlusCircle } from "react-icons/fa";

function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // State for user role
  const [categories, setCategories] = useState([]); // State for categories
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from Firestore
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCategories(categoriesList);
    };

    // Fetch user authentication state and role
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user.email.split("@")[0]); // Display part before @gmail.com

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole(null); // User does not exist in Firestore
        }
      } else {
        setUser(null);
        setRole(null); // Reset role when user is not logged in
      }
    });

    fetchCategories(); // Fetch categories when component mounts

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut(); // Logout function
    setUser(null);
    setRole(null); // Reset role on logout
  };

  const handleCategorySelect = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to category page
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

        {/* Category Dropdown */}
        <div className="category-dropdown">
          <select onChange={(e) => handleCategorySelect(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name } className="option">
                {category.name}
              </option>
            ))}
          </select>
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
          <a href="/upload" className="nav-link">
          <FaPlusCircle    className="bx bx-compass text-1 " />
          </a>
          <a href="/all-movies" className="nav-link">
            <PiTelevisionSimpleBold className="bx bx-tv" />
            <span className="nav-link-title">Movies</span>
          </a>
          <a href="/your-movies" className="nav-link">
            <FaRegUserCircle className="bx bx-tv" />
            <span className="nav-link-title">Your Movies</span>
          </a>
          {user === "hlmrak67" && ( // Corrected email comparison
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
