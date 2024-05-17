import { signUp1Schema } from "~/app/schemas/sign-up-schema";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users, verificationCode } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import crypto from "node:crypto";
import { sendEmailVerificationCode } from "~/lib/mail";

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
  sendVerificationCode: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const buf = crypto.randomBytes(16);
      const generatedCode = buf.toString("hex").slice(0, 16);

      try {
        await ctx.db
          .delete(verificationCode)
          .where(and(eq(verificationCode.email, input.email)));

        await ctx.db.insert(verificationCode).values({
          email: input.email,
          code: generatedCode.toString(),
        });
        const email = await sendEmailVerificationCode(
          input.email,
          generatedCode
        )
          .then((res) => res?.accepted[0])
          .catch((e) => null);
        return email;
      } catch (error) {
        console.log("error", error);
      }
    }),
  verifyAccountByCode: publicProcedure
    .input(
      z.object({
        email: z.string(),
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, code } = input;
      try {
        const res = await ctx.db
          .select()
          .from(verificationCode)
          .where(
            and(
              eq(verificationCode.email, email),
              eq(verificationCode.code, code)
            )
          );
        if (res.length > 0) {
          await ctx.db
            .update(users)
            .set({ isVerified: true })
            .where(eq(users.email, email));
        }
        return { isVerified: res.length > 0 };
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can't verify account. Please try again.",
        });
      }
    }),
});
