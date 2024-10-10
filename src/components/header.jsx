import React from 'react';
// import './Header.css'; // Make sure to style accordingly
import { TbHome } from "react-icons/tb";
import { PiFireFill } from "react-icons/pi";
import { MdOutlineExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgSearch } from "react-icons/cg";

function Header() {
  return (
    <header>
      <div className="nav container ">
        <a href="/" className="logo">TO<span>D</span></a>
        <div className="search-box">
          <input type="search" name="" id="search-input" placeholder="Search movie" />
          <CgSearch className='bx bx-search'/>

        </div>
        <a href="#" className="user">
                <img src="img/user.jpg" alt="" className="user-img"/>
            </a>
        <div className="navbar">
          <a href="#home" className="nav-link nav-active">
            <TbHome className='bx bx-home'/>

            <span className="nav-link-title">Home</span>
          </a>
          <a href="#popular" className="nav-link">
            <PiFireFill className='bx bxs-hot'/>

            <span className="nav-link-title">Trending</span>
          </a>
          <a href="#movies" className="nav-link">
            <MdOutlineExplore className='bx bx-compass'/>

            <span className="nav-link-title">Explore</span>
          </a>
          <a href="/play" className="nav-link">
            <PiTelevisionSimpleBold className='bx bx-tv'/>

            <span className="nav-link-title">Movies</span>
          </a>
          <a href="/admin.php" className="nav-link">
            <IoSettingsOutline className='bx bx-cog'/>

            <span className="nav-link-title">Admin Panel</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
