import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import performanceRoute from "./routes/performanceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/performance", performanceRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
