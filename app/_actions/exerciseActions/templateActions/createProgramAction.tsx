"use server";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createProgramAction = async (
  prevState: any,
  formData: FormData
) => {
  await connectDB();

  const template = z.object({
    name: z
      .string()
      .min(2, { message: " Name must be at least 2 characters long." }),
    startDate: z.number(),
    endDate: z.number(),
    weeks: z.number(),
  });

  const getForm = {
    name: formData.get("name"),
    startDate: Number(formData.get("startDate")),
    endDate: Number(formData.get("endDate")),
    weeks: Number(formData.get("weeks")),
  };
  const validTemplate = template.safeParse(getForm);

  console.log("validating template", validTemplate);
  const totalWeeks = getForm.weeks;
  console.log(getForm);
  if (!validTemplate.success) {
    return {
      errors: validTemplate.error.flatten().fieldErrors,
    };
  } else {
    const newTemplate = await Template.create({
      ...getForm,
      weeks: Array.from({ length: totalWeeks }, () => ({
        days: Array(7)
          .fill(null)
          .map(() => ({
            exercises: [],
          })),
      })),
    });
    try {
      await newTemplate.save();
      revalidatePath("/", "layout");
    } catch (error) {
      revalidatePath("/", "layout");
      return {
        errors: "error",
      };
    }
  }
};
