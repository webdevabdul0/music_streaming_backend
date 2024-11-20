const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

// Ensure JWT_SECRET is defined
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const authenticationToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  // Verify token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
