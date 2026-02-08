import { z } from 'zod';

export const memberSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(25, 'O nome deve ter no máximo 25 caracteres.'),
  memberType: z.enum(['COLLABORATOR', 'VOLUNTEER', 'PARTNER']),
  file: z.any().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
