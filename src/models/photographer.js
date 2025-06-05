// models/Photographer.js
import mongoose from "mongoose";

const PhotographerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    business: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Photographer ||
  mongoose.model("Photographer", PhotographerSchema);
