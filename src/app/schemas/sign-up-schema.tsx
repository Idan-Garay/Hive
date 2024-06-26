import { z } from "zod";

export const signUp1Schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  // YYYY - MM - DD;
  dateOfBirth: z.string().date(),
});

export const verificationCodeSchema = z.object({ code: z.string().length(16) });
export const passwordSchema = z.object({
  password: z.string().min(8).max(24),
});

export const loginFormSchema = z.object({ email: z.string().email() });
