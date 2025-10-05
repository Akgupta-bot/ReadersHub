import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) return setMessage("❌ You must be logged in to add a book.");

    try {
      const res = await axios.post("http://localhost:5000/api/books", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMessage("✅ " + res.data.message);
      setFormData({
        title: "",
        author: "",
        description: "",
        genre: "",
        year: "",
      });

      // Optional: redirect back to books list
      setTimeout(() => {
        window.location.href = "/books";
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + (err.response?.data?.message || "Failed to add book"));
    }
  };

  return (
    <div className="addbook-wrapper d-flex justify-content-center align-items-center">
      <div className="addbook-card p-4 shadow">
        <h2 className="text-center fw-bold text-primary mb-3">📖 Add a New Book</h2>
        <p className="text-center text-muted mb-4">
          Share your favorite books with the community!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="title">Book Title</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="author">Author</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              className="form-control"
            />
            <label htmlFor="genre">Genre</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              name="year"
              id="year"
              placeholder="Published Year"
              value={formData.year}
              onChange={handleChange}
              className="form-control"
            />
            <label htmlFor="year">Published Year</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              name="description"
              id="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              style={{ height: "120px" }}
            ></textarea>
            <label htmlFor="description">Short Description</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            ➕ Add Book
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3 py-2" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBook;
