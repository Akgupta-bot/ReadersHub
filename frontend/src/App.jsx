import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";

// Styles
import "./App.css";

function App() {
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const navigate = useNavigate();


  useEffect(() => {
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); 
  };

  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <>
    
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        } shadow-sm fixed-top`}
        style={{ transition: "background-color 0.3s ease" }}
      >
        <div className="container py-2">
          <Link to="/" className="navbar-brand fw-bold fs-4 text-primary">
            📚 ReadersHub
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Link to="/books" className="nav-link fw-medium">
              Books
            </Link>
            <Link to="/add-book" className="nav-link fw-medium">
              Add Book
            </Link>

            
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`btn ${
                  darkMode ? "btn-outline-light" : "btn-outline-primary"
                } btn-sm`}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`btn ${
                    darkMode ? "btn-outline-light" : "btn-primary"
                  } btn-sm`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`btn ${
                    darkMode ? "btn-light" : "btn-outline-primary"
                  } btn-sm`}
                >
                  Signup
                </Link>
              </>
            )}

            
            <div className="form-check form-switch ms-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="themeSwitch"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <label
                className={`form-check-label ${
                  darkMode ? "text-light" : "text-dark"
                }`}
                htmlFor="themeSwitch"
              >
                {darkMode ? "🌙" : "☀️"}
              </label>
            </div>
          </div>
        </div>
      </nav>

      
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "90px",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer
        className={`text-center py-3 mt-auto ${
          darkMode ? "bg-dark text-light" : "bg-white text-dark border-top"
        }`}
      >
        <p className="mb-0 small">
          © {new Date().getFullYear()} <strong>ReadersHub</strong> — Built with ❤️
        </p>
      </footer>
    </>
  );
}


export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
