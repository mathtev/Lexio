import { z } from "zod";

export const wordSchema = z.object({
  limit: z.number().optional(),
  start: z.number().optional(),
  level: z.string().optional(),
  search: z.string().optional(),
});

export type WordSchema = z.infer<typeof wordSchema>;
