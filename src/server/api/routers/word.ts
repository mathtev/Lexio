import { type Level } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getWords: protectedProcedure
    .input(z.object({ level: z.string() }))
    .query(async ({ ctx, input }) => {
      const words = await ctx.db.word.findMany({
        where: { level: input.level as Level },
      });

      return words ?? [];
    }),
});
