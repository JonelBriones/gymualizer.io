"use server";

import { Day, ExerciseT, ToggleWeekDayId } from "@/app/_types/types";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
export const addCompletedSetWeightAction = async (
  weekId: Types.ObjectId,
  dayId: Types.ObjectId,
  exercises: ExerciseT[]
) => {
  await connectDB();

  console.log("WEEK ID", weekId);
  console.log("DAY ID", dayId);
  const id = new Types.ObjectId("67b28264b394121def8900c7");
  console.log(typeof id, id);
  console.log(exercises);
  await Template.updateOne(
    { "weeks._id": weekId },
    {
      $set: {
        "weeks.$.days.$[day].exercises": exercises,
      },
    },
    {
      arrayFilters: [
        { "day._id": dayId }, // Match the correct exercise
      ],
    }
  );
  // await Template.updateOne(
  //   { "weeks.days.exercises._id": exerciseId },
  //   {
  //     $set: {
  //       "weeks.$[].days.$[].exercises.$[exercise].setWeight": validateGetForm(),
  //     },
  //   },
  //   {
  //     arrayFilters: [{ "exercise._id": exerciseId }],
  //     new: true,
  //     runValidators: true,
  //   }
  // );

  revalidatePath("/", "layout");
  return;
};
