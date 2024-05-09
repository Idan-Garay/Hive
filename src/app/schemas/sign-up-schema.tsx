import { z } from "zod";

export const signUp1Schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  // YYYY - MM - DD;
  dateOfBirth: z.string().date(),
});
