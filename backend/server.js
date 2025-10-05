const express = require("express");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

dotenv.config();          // Load .env variables
connectDB();        

const port = 5000;
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend + MongoDB Connected ✅");
});
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
