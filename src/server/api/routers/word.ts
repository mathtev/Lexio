import { type Level } from "@prisma/client";
import { wordSchema } from "validators/word";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getWords: protectedProcedure
    .input(wordSchema)
    .query(async ({ ctx, input }) => {
      const words = await ctx.db.word.findMany({
        take: input.limit ?? 100,
        skip: input.start ?? 0,
        where: {
          AND: {
            ...(input.level ? { level: input.level as Level } : {}),
            ...(input.search
              ? {
                  OR: [
                    { name: { contains: input.search, mode: "insensitive" } },
                    {
                      translation: {
                        contains: input.search,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : {}),
          },
        },
      });

      const total = await ctx.db.word.count();

      return { words, total };
    }),
});
