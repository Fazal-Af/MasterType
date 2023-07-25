import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
const Nav = () => {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-links">
          <NavLink to={"/"}>
            {" "}
            <span>Home</span>{" "}
          </NavLink>
          <NavLink to={"/typingSpeed"}>
            {" "}
            <span>TypingSpeed</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Nav;
