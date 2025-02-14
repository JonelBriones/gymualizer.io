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
  });
  const weeks = Number(formData.get("weeks"));
  const getForm = {
    name: formData.get("name"),
    startDate: Number(formData.get("startDate")),
    endDate: Number(formData.get("endDate")),
  };
  const validTemplate = template.safeParse(getForm);

  console.log("validating template", validTemplate);

  console.log(getForm);
  if (!validTemplate.success) {
    console.log("failed to create program");
    return {
      errors: validTemplate.error.flatten().fieldErrors,
    };
  } else {
    console.log("creating program");

    const totalWeeks = Array.from({ length: weeks }, () => ({
      days: Array(7)
        .fill(null)
        .map(() => ({
          exercises: [],
        })),
    }));
    let completedProgram = { ...getForm, weeks: totalWeeks };
    console.log("COMPLETE PROGRAM:", JSON.stringify(completedProgram, null, 2));

    const newTemplate = await Template.create(completedProgram);

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
