import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🌗 Detect Dark Mode dynamically
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.body.classList.contains("bg-dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // 📚 Fetch book details + reviews + average rating
  const fetchBookDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(res.data.book);

      const rev = await axios.get(`http://localhost:5000/api/reviews/${id}`);
      setReviews(rev.data.reviews);

      const avg = await axios.get(`http://localhost:5000/api/reviews/average/${id}`);
      setAverageRating(avg.data.averageRating);
      setTotalReviews(avg.data.totalReviews);

      setLoading(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setLoading(false);
    }
  };

  // ✏️ Add or update review
  const handleAddReview = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    if (!token) return setMessage("❌ Please log in to add a review.");

    try {
      if (editingReviewId) {
        await axios.put(
          `http://localhost:5000/api/reviews/${editingReviewId}`,
          { rating, reviewText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✏️ Review updated!");
        setEditingReviewId(null);
      } else {
        await axios.post(
          `http://localhost:5000/api/reviews/${id}`,
          { rating, reviewText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Review added successfully!");
      }

      setRating(0);
      setReviewText("");
      fetchBookDetails();
    } catch (err) {
      console.error(err);
      setMessage("❌ " + (err.response?.data?.message || "Failed to submit review"));
    }
  };

  // 🧩 Edit / Delete reviews
  const handleEditClick = (review) => {
    setRating(review.rating);
    setReviewText(review.reviewText);
    setEditingReviewId(review._id);
    setMessage("📝 Editing your review...");
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) return setMessage("❌ Please log in.");

    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Review deleted successfully");
      fetchBookDetails();
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to delete review"));
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!book) return <p className="text-center mt-5">Book not found.</p>;

  let currentUserId = null;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      currentUserId = JSON.parse(atob(token.split(".")[1]))?.id;
    } catch {
      console.error("Invalid token");
    }
  }

  return (
    <div className={`bookdetails-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="bookdetails-card p-4 shadow-lg rounded-4">
        {/* 📘 Book Info */}
        <h2 className="fw-bold mb-2">{book.title}</h2>
        <p className="mb-2">
          <strong>Author:</strong>{" "}
          <span
            className="text-decoration-underline"
            style={{ cursor: "pointer", color: "var(--accent)" }}
            onClick={() =>
              navigate(`/books?author=${encodeURIComponent(book.author)}`)
            }
          >
            {book.author}
          </span>
        </p>
        <p className="text-muted mb-2">
          <strong>Genre:</strong> {book.genre} | <strong>Year:</strong> {book.year}
        </p>
        <p className="text-secondary">{book.description}</p>

        {/* ⭐ Average Rating */}
        <div className="avg-rating p-3 rounded mb-4">
          <strong>⭐ Average Rating:</strong>{" "}
          {averageRating > 0 ? (
            <>
              <div className="d-flex align-items-center gap-1">
                {[...Array(5)].map((_, index) => {
                  const filled = index < Math.round(averageRating);
                  return (
                    <FaStar
                      key={index}
                      color={filled ? "#FFD700" : "#ccc"}
                      size={20}
                    />
                  );
                })}
                <span className="ms-2">
                  ({averageRating.toFixed(1)}/5)
                </span>
              </div>
              <small>
                Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
              </small>
            </>
          ) : (
            <span>No ratings yet</span>
          )}
        </div>

        {/* 💬 Reviews Section */}
        <h4 className="mb-3">💬 Reviews</h4>
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews yet.</p>
        ) : (
          <ul className="list-group mb-4">
            {reviews.map((r) => {
              const isOwner = r.userId?._id === currentUserId;
              return (
                <li key={r._id} className="list-group-item border-0 border-bottom">
                  <strong>{r.userId?.name || "Anonymous"}:</strong> {r.reviewText}
                  <div className="text-warning">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < r.rating ? "#FFD700" : "#ccc"}
                        size={18}
                      />
                    ))}
                  </div>

                  {isOwner && (
                    <div className="mt-2">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditClick(r)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteReview(r._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* ✍️ Add/Edit Review */}
        <form onSubmit={handleAddReview}>
          <h5 className="fw-semibold mb-3">
            {editingReviewId ? "Edit Your Review" : "Add Your Review"}
          </h5>

          {/* ⭐ Interactive Star Input */}
          <div className="d-flex justify-content-center mb-3">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={ratingValue}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#FFD700" : "#ccc"
                    }
                    size={25}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer", transition: "color 0.2s" }}
                  />
                </label>
              );
            })}
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            required
            rows="3"
            className="form-control mb-3"
          ></textarea>

          <button type="submit" className="btn btn-primary w-100 py-2 rounded-3">
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </form>

        {message && <p className="mt-3 text-center text-info fw-medium">{message}</p>}
      </div>
    </div>
  );
};

export default BookDetails;
