import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true },
  exercises: [
    {
      name: String,
      reps: Number,
      weight: Number,
    },
  ],
});

export default mongoose.model("Schedule", scheduleSchema);
