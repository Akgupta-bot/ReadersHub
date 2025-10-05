import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BooksList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorFilter, setAuthorFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");


  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data.books);
      setFilteredBooks(res.data.books);
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  
  useEffect(() => {
    let filtered = [...books];

    if (authorFilter)
      filtered = filtered.filter((book) =>
        book.author.toLowerCase().includes(authorFilter.toLowerCase())
      );

    if (yearFilter)
      filtered = filtered.filter((book) =>
        book.year?.toString().includes(yearFilter)
      );

    if (ratingFilter)
      filtered = filtered.filter(
        (book) => Math.round(book.averageRating || 0) === Number(ratingFilter)
      );

    setFilteredBooks(filtered);
  }, [authorFilter, yearFilter, ratingFilter, books]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary fw-bold">📚 Explore Books</h2>

      {/* 🔍 Filter Bar */}
      <div className="filter-bar card p-3 shadow-sm mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by author..."
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Filter by year..."
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">Filter by rating</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center mt-4 text-muted">No books match your filters.</p>
      ) : (
        <div className="row">
          {filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book._id}>
              <div className="card book-card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-semibold text-primary mb-2">
                    <Link
                      to={`/books/${book._id}`}
                      className="text-decoration-none"
                    >
                      {book.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-1">
                    <i className="bi bi-person"></i> {book.author}
                  </p>
                  <p className="text-muted mb-1">
                    <i className="bi bi-calendar"></i> {book.year || "—"}
                  </p>
                  <p className="text-warning small">
                    {"⭐".repeat(Math.round(book.averageRating || 0)) ||
                      "No rating yet"}
                  </p>
                  <p className="text-secondary small">
                    {book.description?.slice(0, 100)}...
                  </p>
                  <Link
                    to={`/books/${book._id}`}
                    className="btn btn-outline-primary btn-sm w-100 rounded-pill mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;
