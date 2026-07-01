import { z } from "zod";

// Session validation
export const createSessionSchema = z.object({
  duration: z.number().min(1).max(3600),
  wordsTyped: z.number().min(0),
  charactersTyped: z.number().min(0),
  accuracy: z.number().min(0).max(100),
  wpm: z.number().min(0),
  mistakes: z.number().min(0),
  mode: z.enum(["practice", "race", "lesson"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  lesson: z.string().optional(),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

// User profile validation
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// Pagination validation
export const paginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).default("1"),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).default("10"),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
