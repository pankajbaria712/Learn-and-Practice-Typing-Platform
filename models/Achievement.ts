import mongoose, { Schema, Document } from "mongoose";
import type { Achievement } from "@/types";

interface IAchievement extends Achievement, Document {}

const achievementSchema = new Schema<IAchievement>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

achievementSchema.index({ userId: 1, name: 1 }, { unique: true });

export const AchievementModel =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", achievementSchema);
