import express from "express";
import Schedule from "../models/Schedule.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get schedule for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.user.id });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add or update schedule
router.post("/", authMiddleware, async (req, res) => {
  const { day, exercises } = req.body;
  try {
    let schedule = await Schedule.findOne({ userId: req.user.id, day });

    if (schedule) {
      schedule.exercises = exercises;
    } else {
      schedule = new Schedule({ userId: req.user.id, day, exercises });
    }

    await schedule.save();
    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
