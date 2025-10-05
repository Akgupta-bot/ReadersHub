
const express = require("express");
const Book = require("../models/Book");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", protect, async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({ message: "Title, Author, and Year are required" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id, 
    });

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Book.countDocuments();
    const books = await Book.find()
      .populate("addedBy", "name email") 
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy", "name email");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.put("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.delete("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this book" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
