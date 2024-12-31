import { z } from "zod";

export const wordSchema = z.object({
  limit: z.number().optional(),
  start: z.number().optional(),
  search: z.string().optional(),
  levels: z.array(z.string()).optional(),
});

export type WordSchema = z.infer<typeof wordSchema>;
