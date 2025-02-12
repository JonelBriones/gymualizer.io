import { z } from "zod";

export const TemplateFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: " Name must be at least 2 characters long." }),
});
export type TemplateFormSchemaType = z.infer<typeof TemplateFormSchema>;

export const ExerciseFormSchema = z.object({
  name: z
    .string({
      required_error: "Name type is required.",
    })
    .min(5),
  loadType: z.string({
    required_error: "Load type is required.",
  }),
  sets: z.string({
    required_error: "Sets is required.",
  }),
  reps: z.string({
    required_error: "Reps is required.",
  }),
  percentageLoad: z
    .string({
      required_error: "Load is required.",
    })
    .optional(),
  weightLoad: z
    .string({
      required_error: "Load is required.",
    })
    .optional(),
  rpeLoad: z
    .string({
      required_error: "Load is required.",
    })
    .optional(),
  unit: z.string({
    required_error: "unit is required.",
  }),
  notes: z.string(),
});
export type ExerciseFormSchemaType = z.infer<typeof ExerciseFormSchema>;
