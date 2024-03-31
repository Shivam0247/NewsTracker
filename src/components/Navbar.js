import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NewsTracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                    </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/Business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/General">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Technology">
                  Technology
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/FavNews">
                    Favourite
                  </Link>
                </li>
              ) : null}
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-secondary" type="button">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    style={{ marginLeft: "10px" }}
                  >
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={handlelogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
