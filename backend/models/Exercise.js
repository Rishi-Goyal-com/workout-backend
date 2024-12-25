// import mongoose from "mongoose";

// const exerciseSchema = new mongoose.Schema({
//   muscleGroup: { type: String, required: true },
//   exercises: [{ name: String }],
// });

// export default mongoose.model("Exercise", exerciseSchema);
import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  date: { type: Date, default: Date.now },  // Automatically sets the current date when a set is added
});

const exerciseSchema = new mongoose.Schema({
  muscleGroup: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: [setSchema],  // New field to store the sets data
    },
  ],
});

export default mongoose.model("Exercise", exerciseSchema);
