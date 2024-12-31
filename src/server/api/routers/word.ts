import { Level, Prisma } from "@prisma/client";
import { wordSchema } from "validators/word";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getWords: protectedProcedure
    .input(wordSchema)
    .query(async ({ ctx, input }) => {
      console.log("iiiiiiiinput", input);
      const { limit = 100, start = 0, levels, search } = input;

      const whereClause: Prisma.WordWhereInput = {
        AND: {
          ...(levels?.length ? { level: { in: levels as Level[] } } : {}),
          ...(search
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
      };

      const words = await ctx.db.word.findMany({
        take: limit,
        skip: start,
        where: whereClause,
      });

      const total = await ctx.db.word.count({
        where: whereClause,
      });

      return { words, total };
    }),
});
