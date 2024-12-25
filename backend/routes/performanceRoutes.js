// import express from "express";
// const router = express.Router();
// import authMiddleware from "../middleware/authMiddleware.js";

// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Mocked data: Replace with MongoDB query
//     const data = [
//       {
//         name: "Bench Press",
//         data: [
//           { date: "2024-06-01", weight: 80, reps: 10 },
//           { date: "2024-06-02", weight: 85, reps: 8 },
//           { date: "2024-06-02", weight: 900, reps: 8 },
//           { date: "2024-06-02", weight: 800, reps: 8 },
//           { date: "2024-06-02", weight: 950, reps: 8 },
//           { date: "2024-06-02", weight: 200, reps: 8 },
//           { date: "2024-06-02", weight: 900, reps: 8 },
//           { date: "2024-06-02", weight: 900, reps: 8 },

//         ],
//       },
//       {
//         name: "Squats",
//         data: [
//           { date: "2024-06-01", weight: 100, reps: 12 },
//           { date: "2024-06-02", weight: 110, reps: 10 },
//         ],
//       },
//     ];
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching performance data" });
//   }
// });

// // module.exports = router;
// export default router;
// performanceRoute.js
// import express from "express";
// const router = express.Router();
// import authMiddleware from "../middleware/authMiddleware.js";

// let performanceData = [
//   // Example mocked data (replace with actual database data)
//   {
//     name: "Bench Press",
//     data: [
//       { date: "2024-06-01", weight: 80, reps: 10 },
//       { date: "2024-06-02", weight: 85, reps: 8 },
//     ],
//   },
//   {
//     name: "Squats",
//     data: [
//       { date: "2024-06-01", weight: 100, reps: 12 },
//       { date: "2024-06-02", weight: 110, reps: 10 },
//     ],
//   },
// ];

// // Save new set route
// router.post("/add", authMiddleware, (req, res) => {
//   try {
//     const { exerciseName, newSet } = req.body; // Expected to receive the exercise name and new set data

//     // Find the exercise and add the new set
//     const exercise = performanceData.find((ex) => ex.name === exerciseName);
//     if (exercise) {
//       exercise.data.push(newSet); // Add the new set to the exercise
//       res.status(200).json({ message: "Set added successfully", exercise });
//     } else {
//       res.status(404).json({ message: "Exercise not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error adding set", error: err.message });
//   }
// });

// // Get performance data route
// router.get("/", authMiddleware, (req, res) => {
//   try {
//     res.status(200).json(performanceData);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching performance data", error: err.message });
//   }
// });

// export default router;
import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import Performance from "../models/Performance.js";  // <-- Import the Performance model

// Mocked performance data (replace with actual MongoDB queries)
// let performanceData = [
//   {
//     name: "Bench Press",
//     data: [
//       { date: "2024-06-01", weight: 80, reps: 10 },
//       { date: "2024-06-02", weight: 85, reps: 8 },
//     ],
//   },
//   {
//     name: "Squats",
//     data: [
//       { date: "2024-06-01", weight: 100, reps: 12 },
//       { date: "2024-06-02", weight: 110, reps: 10 },
//     ],
//   },
// ];

// Ensure express.json() middleware is applied for handling request body
router.use(express.json());

// // Save new set route
// router.post("/add", authMiddleware, (req, res) => {
//   try {
//     const { exerciseName, newSet } = req.body; // Expected to receive the exercise name and new set data

//     if (!exerciseName || !newSet || !newSet.weight || !newSet.reps) {
//       return res.status(400).json({ message: "Invalid data" });
//     }

//     // Find the exercise and add the new set
//     const exercise = performanceData.find((ex) => ex.name === exerciseName);
//     if (exercise) {
//       // Add the new set to the exercise
//       exercise.data.push({
//         date: new Date().toLocaleDateString(), // Add today's date automatically
//         ...newSet,
//       });
//       res.status(200).json({ message: "Set added successfully", exercise });
//     } else {
//       res.status(404).json({ message: "Exercise not found" });
//     }
//   } catch (err) {
//     console.error("Error adding set:", err);
//     res.status(500).json({ message: "Error adding set", error: err.message });
//   }
// });
// Save new sets route
// router.post("/add", authMiddleware, (req, res) => {
//   try {
//     const { exerciseName, newSets } = req.body; // Expecting an array of sets

//     if (!exerciseName || !newSets || !Array.isArray(newSets) || newSets.length === 0) {
//       return res.status(400).json({ message: "Invalid data" });
//     }

//     // Find the exercise and add the new sets
//     const exercise = performanceData.find((ex) => ex.name === exerciseName);
//     if (exercise) {
//       newSets.forEach((set) => {
//         if (set.weight && set.reps) {
//           exercise.data.push({
//             date: new Date().toLocaleDateString(), // Add today's date automatically
//             ...set,
//           });
//         }
//       });
//       res.status(200).json({ message: "Sets added successfully", exercise });
//     } else {
//       res.status(404).json({ message: "Exercise not found" });
//     }
//   } catch (err) {
//     console.error("Error adding sets:", err);
//     res.status(500).json({ message: "Error adding sets", error: err.message });
//   }
// });
// router.post("/add", authMiddleware, (req, res) => {
//     try {
//       const { exerciseName, newSets } = req.body; // Expecting an array of sets
  
//       if (!exerciseName || !newSets || !Array.isArray(newSets) || newSets.length === 0) {
//         return res.status(400).json({ message: "Invalid data" });
//       }
  
//       // Check if the exercise already exists
//       let exercise = performanceData.find((ex) => ex.name === exerciseName);
  
//       if (exercise) {
//         // If the exercise exists, add the new sets
//         newSets.forEach((set) => {
//           if (set.weight && set.reps) {
//             exercise.data.push({
//               date: new Date().toLocaleDateString(), // Add today's date automatically
//               ...set,
//             });
//           }
//         });
//         res.status(200).json({ message: "Sets added successfully", exercise });
//       } else {
//         // If the exercise doesn't exist, create a new exercise
//         const newExercise = {
//           name: exerciseName,
//           data: newSets.map((set) => ({
//             date: new Date().toLocaleDateString(), // Add today's date automatically
//             ...set,
//           })),
//         };
//         performanceData.push(newExercise);
//         res.status(201).json({ message: "New exercise created successfully", exercise: newExercise });
//       }
//     } catch (err) {
//       console.error("Error adding sets:", err);
//       res.status(500).json({ message: "Error adding sets", error: err.message });
//     }
//   });
router.post("/add", authMiddleware, async (req, res) => {
    try {
      const { exerciseName, newSets } = req.body;
      const userId = req.user.id; // Extract user ID from authMiddleware
  
      if (!exerciseName || !newSets || !Array.isArray(newSets) || newSets.length === 0) {
        return res.status(400).json({ message: "Invalid data" });
      }
  
      const performance = await Performance.findOne({ userId });
  
      if (performance) {
        // Update existing performance data
        const exercise = performance.exercises.find((ex) => ex.name === exerciseName);
        if (exercise) {
          newSets.forEach((set) => {
            if (set.weight && set.reps) {
              exercise.data.push({ date: new Date().toLocaleDateString(), ...set });
            }
          });
        } else {
          performance.exercises.push({
            name: exerciseName,
            data: newSets.map((set) => ({
              date: new Date().toLocaleDateString(),
              ...set,
            })),
          });
        }
        await performance.save();
        res.status(200).json({ message: "Performance data updated successfully" });
      } else {
        // Create new performance data
        const newPerformance = new Performance({
          userId,
          exercises: [
            {
              name: exerciseName,
              data: newSets.map((set) => ({
                date: new Date().toLocaleDateString(),
                ...set,
              })),
            },
          ],
        });
        await newPerformance.save();
        res.status(201).json({ message: "Performance data created successfully" });
      }
    } catch (err) {
      console.error("Error saving performance data:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// Get performance data route
// router.get("/", authMiddleware, (req, res) => {
//   try {
//     res.status(200).json(performanceData);
//   } catch (err) {
//     console.error("Error fetching performance data:", err);
//     res.status(500).json({ message: "Error fetching performance data", error: err.message });
//   }
// });
// router.get("/", authMiddleware, (req, res) => {
//     try {
//       const sanitizedData = performanceData.map((exercise) => ({
//         ...exercise,
//         data: exercise.data.filter((set) => set.weight && set.reps), // Filter out invalid sets
//       }));
//       res.status(200).json(sanitizedData);
//     } catch (err) {
//       console.error("Error fetching performance data:", err);
//       res.status(500).json({ message: "Error fetching performance data", error: err.message });
//     }
//   });
router.get("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from authMiddleware
      const performance = await Performance.findOne({ userId });
  
      if (performance) {
        res.status(200).json(performance.exercises);
      } else {
        res.status(404).json({ message: "No performance data found for this user" });
      }
    } catch (err) {
      console.error("Error fetching performance data:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
