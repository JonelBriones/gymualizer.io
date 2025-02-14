"use server";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import mongoose from "mongoose";

const editProgramAction = async (exercise, toggledDayId, id) => {
  await connectDB();
  const { week, day } = toggledDayId;
  let weekId = new mongoose.Types.ObjectId(week);
  let dayId = new mongoose.Types.ObjectId(day);
  console.log(weekId);
  let programId = new mongoose.Types.ObjectId(id);
  const { _id } = programId;
  // const program = await Template.findById(dayId).populate(
  //   "weeks.days.exercise"
  // );

  await Template.updateOne(
    { "weeks._id": weekId }, // Find the correct week by ID
    {
      $push: {
        "weeks.$.days.$[day].exercises": exercise,
      },
    },
    {
      arrayFilters: [
        { "weekId._id": weekId }, // Match the correct day
        { "day._id": dayId }, // Match the correct exercise
      ],
    }
  );
};

export default editProgramAction;
