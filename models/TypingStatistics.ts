import mongoose, { Schema, Document } from "mongoose";
import type { TypingStatistics } from "@/types";

interface ITypingStatistics extends TypingStatistics, Document {}

const typingStatisticsSchema = new Schema<ITypingStatistics>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    totalSessions: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPracticeTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    highestWPM: {
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
    totalWordsTyped: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalMistakes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dailyStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const TypingStatisticsModel =
  mongoose.models.TypingStatistics ||
  mongoose.model<ITypingStatistics>("TypingStatistics", typingStatisticsSchema);
