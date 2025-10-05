import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper d-flex flex-column justify-content-center align-items-center text-center">
      <div className="home-content">
        <h1 className="fw-bold mb-3">📚 ReadersHub</h1>
        <p className="lead text-muted mb-4">
          Discover, rate, and share your favorite books with readers around the world.
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Link to="/books" className="btn btn-primary px-4 py-2">
            Explore Books
          </Link>
          <Link to="/add-book" className="btn btn-outline-primary px-4 py-2">
            Add a Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
