import { z } from "zod";
// const exercise = z.object({
//   name: z.string(),
//   loadType: z.string(),
//   sets: z.string(),
//   reps: z.string(),
//   percentageLoad: z.string().optional(),
//   weightLoad: z.string().optional(),
//   rpeLoad: z.string().optional(),
//   unit: z.string(),
// });
// const day = z.object({
//   exercises: z.object({
//     name: z.string(),
//     loadType: z.string(),
//     sets: z.string(),
//     reps: z.string(),
//     percentageLoad: z.string().optional(),
//     weightLoad: z.string().optional(),
//     rpeLoad: z.string().optional(),
//     unit: z.string(),
//   }),
// });
// const week = z.object({
//   days: z.array(day),
// });
export const templateFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: " Name must be at least 2 characters long." }),
  startDate: z.number({ required_error: "Start date is required" }),
  endDate: z.number({ required_error: "End date is required" }),
  weeks: z.number(),
});
export type TemplateFormSchemaType = z.infer<typeof templateFormSchema>;

export const ExerciseFormSchema = z.object({
  name: z
    .string({
      required_error: "Name type is required.",
    })
    .min(5)
    .max(25),
  loadType: z.string({
    required_error: "Load type is required.",
  }),
  sets: z.string({
    required_error: "Sets is required.",
  }),
  reps: z.string({
    required_error: "Reps is required.",
  }),
  weightLoad: z.string().optional(),
  weightMax: z.string().optional(),
  rpeLoad: z.string().optional(),
  rpeMax: z.string().optional(),
  percentageLoad: z.string().optional(),
  percentageMax: z.string().optional(),
  unit: z.string({
    required_error: "unit is required.",
  }),
  notes: z.string(),
});
export type ExerciseFormSchemaType = z.infer<typeof ExerciseFormSchema>;
