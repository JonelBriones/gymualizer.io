"use server";
import { ExerciseT, ToggleWeekDayId } from "@/app/_types/types";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import { revalidatePath } from "next/cache";

const editProgramAction = async (
  exercise: ExerciseT,
  toggledDayId: ToggleWeekDayId
) => {
  await connectDB();
  const { week, day } = toggledDayId;

  await Template.updateOne(
    { "weeks._id": week }, // Find the correct week by ID
    {
      $push: {
        "weeks.$.days.$[day].exercises": exercise,
      },
    },
    {
      arrayFilters: [
        { "week._id": week }, // Match the correct day
        { "day._id": day }, // Match the correct exercise
      ],
    }
  );
  revalidatePath("/dashboard/templates/create", "layout");
};

export default editProgramAction;
