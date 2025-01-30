import { z } from 'zod';

const MAX_NAME_LEN = 75;
const MAX_SUBTITLE_LEN = 150;
const MAX_DESCRIPTION_LEN = 320;
const MAX_CATEGORY_LEN = 50;
const MIN_STRING_LEN = 5;

const get_max_length_message = (max: number) =>
  `Este campo deve ter no máximo ${max} caracteres.`;

const get_min_length_message = (min: number) =>
  `Este campo deve ter pelo menos ${min} caracteres.`;

export const createProjectSchema = z.object({
  name: z
    .string({ required_error: 'O nome do projeto é obrigatório.' })
    .min(MIN_STRING_LEN, { message: get_min_length_message(MIN_STRING_LEN) })
    .max(MAX_NAME_LEN, { message: get_max_length_message(MAX_NAME_LEN) }),

  subtitle: z
    .string({ required_error: 'O subtítulo do projeto é obrigatório.' })
    .min(MIN_STRING_LEN, { message: get_min_length_message(MIN_STRING_LEN) })
    .max(MAX_SUBTITLE_LEN, {
      message: get_max_length_message(MAX_SUBTITLE_LEN),
    }),

  description: z
    .string({ required_error: 'A descrição do projeto é obrigatória.' })
    .max(MAX_DESCRIPTION_LEN, {
      message: get_max_length_message(MAX_DESCRIPTION_LEN),
    })
    .min(MIN_STRING_LEN, { message: get_min_length_message(MIN_STRING_LEN) }),

  category: z
    .string({ required_error: 'A categoria do projeto é obrigatória.' })
    .max(MAX_CATEGORY_LEN, {
      message: get_max_length_message(MAX_CATEGORY_LEN),
    })
    .min(MIN_STRING_LEN, { message: get_min_length_message(MIN_STRING_LEN) }),

  media: z.string({ required_error: 'A mídia do projeto é obrigatória.' }),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
