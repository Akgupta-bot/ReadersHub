
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,   
    ref: "User",                            
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
