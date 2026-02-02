import { z } from 'zod';

const MIN_NAME_LEN = 5;
const MAX_NAME_LEN = 50;
const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 25;
const PHONE_REGEX = /^\(\d{2}\)\s*\d{5}-\d{4}$/;
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(MIN_NAME_LEN, `Nome deve ter pelo menos ${MIN_NAME_LEN} caracteres.`)
    .max(MAX_NAME_LEN, `Nome deve ter no máximo ${MAX_NAME_LEN} caracteres.`),
  email: z
    .string({
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Email inválido.' }),
  password: z
    .string({
      required_error: `A senha deve ter pelo menos ${MIN_PASSWORD_LEN} caracteres.`,
    })
    .min(
      MIN_PASSWORD_LEN,
      `A senha deve ter pelo menos ${MIN_PASSWORD_LEN} caracteres.`
    )
    .max(
      MAX_PASSWORD_LEN,
      `A senha deve ter no máximo ${MAX_PASSWORD_LEN} caracteres.`
    ),
  confirmPassword: z.string(),
});

export const createInstitutionSchema = createAccountSchema
  .extend({
    phone: z
      .string()
      .regex(PHONE_REGEX, 'Telefone inválido (use o formato (00) 00000-0000).'),
    cnpj: z
      .string()
      .regex(CNPJ_REGEX, 'CNPJ inválido (use o formato 00.000.000/0000-00).'),
    category: z.string().min(1, 'A categoria é obrigatória.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

export type CreateAccountFormData = z.infer<typeof createInstitutionSchema>;
