import { z } from 'zod';

const MAX_LENGTH_MESSAGE = 'O campo deve ter no máximo 255 caracteres';
const MAX_NAME_LEN = 255;
const MAX_NOTE_LEN = 500;
const MAX_NOTE_LENGTH_MESSAGE = 'O campo deve ter no máximo 500 caracteres';
const MAX_PASSWORD_LEN = 255;
const MAX_PASSWORD_MESSAGE = 'A senha deve ter no máximo 255 caracteres';
const MIN_LENGTH_MESSAGE = 'O campo deve ter no mínimo 3 caracteres';
const MIN_PASSWORD_LEN = 6;
const MIN_PASSWORD_MESSAGE = 'A senha deve ter no mínimo 6 caracteres';
const MIN_STRING_LEN = 3;
const UNMATCHED_PASSWORD_MESSAGE = 'As senhas não coincidem';

export const editProfileSchema = z
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

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
