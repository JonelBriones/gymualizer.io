"use server";

import connectDB from "@/config/database";
import Template from "@/models/Templates";
import { Types } from "mongoose";

export const deleteExerciseAction = async (
  weekId: Types.ObjectId,
  dayId: Types.ObjectId,
  exerciseId?: Types.ObjectId
) => {
  await connectDB();
  console.log("weekID", weekId);
  console.log("dayID", dayId);
  console.log("exerciseID", exerciseId);
  await Template.updateOne(
    { "weeks._id": weekId },
    {
      $pull: {
        "weeks.$.days.$[day].exercises": { _id: exerciseId },
      },
    },
    {
      arrayFilters: [{ "day._id": dayId }],
    }
  );
};
