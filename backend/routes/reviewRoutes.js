const express = require("express");
const Review = require("../models/Review");
const Book = require("../models/Book");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ---------- ADD REVIEW ----------
router.post("/:bookId", protect, async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const bookId = req.params.bookId;

    // 1️⃣ Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // 2️⃣ Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 3️⃣ Check if user already reviewed this book
    const existingReview = await Review.findOne({ bookId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this book" });
    }

    // 4️⃣ Create review
    const review = await Review.create({
      bookId,
      userId: req.user._id,
      rating,
      reviewText
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ---------- GET ALL REVIEWS FOR A BOOK + AVG RATING ----------
router.get("/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const reviews = await Review.find({ bookId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating = reviews.length
      ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.status(200).json({
      totalReviews: reviews.length,
      averageRating: avgRating,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ---------- UPDATE REVIEW (only the review’s author) ----------
router.put("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }

    review.rating = req.body.rating || review.rating;
    review.reviewText = req.body.reviewText || review.reviewText;
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ---------- DELETE REVIEW ----------
router.delete("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// 📊 Get average rating for a specific book
router.get("/average/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const result = await Review.aggregate([
      { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
      {
        $group: {
          _id: "$bookId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({ averageRating: 0, totalReviews: 0 });
    }

    res.status(200).json({
      averageRating: result[0].averageRating.toFixed(1),
      totalReviews: result[0].totalReviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating average rating", error: error.message });
  }
});


module.exports = router;
