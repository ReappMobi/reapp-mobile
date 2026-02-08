import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email('Email inválido.'),
  password: z
    .string({ required_error: 'A senha é obrigatória.' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
