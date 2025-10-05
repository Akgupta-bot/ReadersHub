// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, access denied" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Get user info from decoded token
    req.user = await User.findById(decoded.id).select("-password");

    // 4️⃣ Continue to next middleware/route
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

module.exports = protect;
