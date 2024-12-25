import jwt from 'jsonwebtoken';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Allow cross-origin requests

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token is present
  if (!token) return res.status(401).json({ message: "Access Denied" });

  // Check if the token is in the Bearer format
  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token format" });
  }

  // Extract the token from the Bearer prefix
  const actualToken = token.split(" ")[1];

  try {
    // Verify the token using JWT_SECRET
    const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = verified; // Attach the verified user data to the request object
    next(); // Continue with the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
