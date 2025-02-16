"use server";
import { ExerciseT, ToggleWeekDayId } from "@/app/_types/types";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import mongoose, { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

// deleting or editing exercise use
//
// $set: {
//   [`weeks.${weekIdx}.days.${dayIdx}.exercises.${exerciseIdx}.name`]: "New Name",
//   [`weeks.${weekIdx}.days.${dayIdx}.exercises.${exerciseIdx}.sets`]: "4",
// },
// use replace instead of push use set to replace entire exericse

export default editProgramAction;
