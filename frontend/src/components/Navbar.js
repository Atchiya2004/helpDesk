import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <nav className="navbar">

      <h2 className="logo">HelpDesk</h2>

      <div className="nav-links">

        <Link to="/login">Login</Link>
<Link to="/register">Register</Link>


        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;