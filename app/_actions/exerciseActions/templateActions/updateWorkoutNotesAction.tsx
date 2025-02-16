"use server";

import { ToggleWeekDayId } from "@/app/_types/types";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import { revalidatePath } from "next/cache";

export const updateWorkoutNotesAction = async (
  workoutNote: string,
  toggledWeekDay: ToggleWeekDayId
) => {
  await connectDB();
  const { week, day } = toggledWeekDay;

  await Template.updateOne(
    { "weeks._id": week }, // Find the correct week by ID
    {
      $set: {
        "weeks.$.days.$[day].workout_notes": workoutNote,
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
