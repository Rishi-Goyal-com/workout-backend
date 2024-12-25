import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router();

// Get exercises by muscle group
router.get("/:muscleGroup", async (req, res) => {
  const { muscleGroup } = req.params;
  try {
    const exercise = await Exercise.findOne({ muscleGroup });
    if (!exercise) return res.status(404).json({ message: "Muscle group not found" });
    res.json(exercise.exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new exercise to a muscle group
router.post("/", async (req, res) => {
  const { muscleGroup, name } = req.body;
  try {
    let exercise = await Exercise.findOne({ muscleGroup });
    if (!exercise) {
      exercise = new Exercise({ muscleGroup, exercises: [{ name }] });
    } else {
      exercise.exercises.push({ name });
    }

    await exercise.save();
    res.status(200).json({ message: "Exercise added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
