import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: ':( you need a stronger password' })
    .max(100, { message: 'Too long server cant handle it.' })
    .trim()
    .refine(
      value =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value,
        ),
      {
        message:
          'Password must contain at least one letter, one number, and one special character',
      },
    ),
});

export const registerSchema = z.object({
  name: z.string().min(3).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email().trim(),
  password: z.string().min(8).max(100).trim(),
  confirmPassword: z.string().min(8).max(100).trim(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export type registerSchemaType = z.infer<typeof registerSchema>;
