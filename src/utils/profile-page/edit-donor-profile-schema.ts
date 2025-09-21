import { z } from 'zod';

import {
  INVALID_EMAIL_MESSAGE,
  MAX_LENGTH_MESSAGE,
  MAX_NAME_LEN,
  MAX_NOTE_LEN,
  MAX_NOTE_LENGTH_MESSAGE,
  MAX_PASSWORD_LEN,
  MAX_PASSWORD_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MIN_PASSWORD_LEN,
  MIN_PASSWORD_MESSAGE,
  MIN_STRING_LEN,
  UNMATCHED_PASSWORD_MESSAGE,
} from './constants';

export const editDonorProfileSchema = z
  .object({
    name: z
      .string()
      .min(MIN_STRING_LEN, { message: MIN_LENGTH_MESSAGE })
      .max(MAX_NAME_LEN, { message: MAX_LENGTH_MESSAGE })
      .optional()
      .or(z.literal('')),
    note: z
      .string()
      .min(MIN_STRING_LEN, { message: MIN_LENGTH_MESSAGE })
      .max(MAX_NOTE_LEN, { message: MAX_NOTE_LENGTH_MESSAGE })
      .optional()
      .or(z.literal('')),
    email: z.string().email({ message: INVALID_EMAIL_MESSAGE }).optional(),
    password: z
      .optional(
        z
          .string()
          .min(MIN_PASSWORD_LEN, { message: MIN_PASSWORD_MESSAGE })
          .max(MAX_PASSWORD_LEN, { message: MAX_PASSWORD_MESSAGE })
      )
      .or(z.literal('')),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: UNMATCHED_PASSWORD_MESSAGE,
    path: ['confirmPassword'],
  });

export type EditDonorProfileData = z.infer<typeof editDonorProfileSchema>;
