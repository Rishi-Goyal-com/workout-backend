import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exercises: [
    {
      name: { type: String, required: true },
      data: [
        {
          date: { type: String, required: true },
          weight: { type: Number, required: true },
          reps: { type: Number, required: true },
        },
      ],
    },
  ],
});

export default mongoose.model("Performance", performanceSchema);
