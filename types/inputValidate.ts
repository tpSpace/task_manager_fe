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
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(255)
    .refine(value => !value.includes(' '), 'Username cannot contain spaces'),
  email: z.string().email().trim(),
  password: z.string().min(8).max(100).trim(),
  confirmPassword: z.string().min(8).max(100).trim(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export type registerSchemaType = z.infer<typeof registerSchema>;
