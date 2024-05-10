import { signUp1Schema } from "~/app/schemas/sign-up-schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(signUp1Schema)
    .mutation(async ({ ctx, input }) => {
      const isUserExist = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (isUserExist.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email has already been taken.",
        });
      }
      const res = await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        dateOfBirth: input.dateOfBirth,
      });
      return res;
    }),
  getAccountEmail: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const res = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input));
      return res.length !== 0;
    }),
});
