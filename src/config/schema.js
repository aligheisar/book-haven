import { z } from "zod";

export let loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export let registerSchema = z.object({
  fullName: z.string().min(3),
  username: z
    .string()
    .min(4)
    .regex(/^[^\s]+$/),
  email: z.string().email(),
  password: z.string().min(6),
});

export let emailSchema = z.string().email();
