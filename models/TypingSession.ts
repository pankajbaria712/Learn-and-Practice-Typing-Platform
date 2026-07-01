import mongoose, { Schema, Document } from "mongoose";
import type { TypingSession } from "@/types";

interface ITypingSession extends TypingSession, Document {}

const typingSessionSchema = new Schema<ITypingSession>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    wordsTyped: {
      type: Number,
      required: true,
      min: 0,
    },
    charactersTyped: {
      type: Number,
      required: true,
      min: 0,
    },
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    wpm: {
      type: Number,
      required: true,
      min: 0,
    },
    mistakes: {
      type: Number,
      required: true,
      min: 0,
    },
    mode: {
      type: String,
      enum: ["practice", "race", "lesson"],
      default: "practice",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    lesson: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
typingSessionSchema.index({ userId: 1, date: -1 });
typingSessionSchema.index({ userId: 1, mode: 1 });

export const TypingSessionModel =
  mongoose.models.TypingSession ||
  mongoose.model<ITypingSession>("TypingSession", typingSessionSchema);
