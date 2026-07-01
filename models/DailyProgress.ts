import mongoose, { Schema, Document } from "mongoose";
import type { DailyProgress } from "@/types";

interface IDailyProgress extends DailyProgress, Document {}

const dailyProgressSchema = new Schema<IDailyProgress>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    sessionsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPracticeTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageWPM: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageAccuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

dailyProgressSchema.index({ userId: 1, date: -1 });

export const DailyProgressModel =
  mongoose.models.DailyProgress ||
  mongoose.model<IDailyProgress>("DailyProgress", dailyProgressSchema);
