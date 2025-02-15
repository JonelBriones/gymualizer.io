"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import { TableCell } from "@/components/ui/table";
import { Button } from "./ui/button";
import { Types } from "mongoose";
import { deleteExerciseAction } from "@/app/_actions/exerciseActions/templateActions/deleteExerciseAction";
interface ExerciseProps {
  exercise: ExerciseT;
  setProgram: Dispatch<SetStateAction<TemplateT | null>>;
  program: TemplateT;
  exerciseId?: Types.ObjectId;
  weekId: Types.ObjectId;
  dayId: Types.ObjectId;
}
const SingleExercise = ({
  exercise,
  setProgram,
  program,
  exerciseId,
  weekId,
  dayId,
}: ExerciseProps) => {
  const { name, sets, reps, loadType, weight, unit, weightMax } = exercise;
  const deleteExercise = () => {
    console.log("week", weekId);
    console.log("day", dayId);
    console.log("exercise", exerciseId);
    deleteExerciseAction(weekId, dayId, exerciseId);
    setProgram({
      ...program,
      weeks: program.weeks?.map((week) =>
        week._id == weekId
          ? {
              ...week,
              days: week.days.map((day, dIdx) =>
                day._id == dayId
                  ? {
                      ...day,
                      exercises: day.exercises.filter(
                        (exercise) => exercise._id !== exerciseId
                      ),
                    }
                  : day
              ),
            }
          : week
      ),
    });
  };
  type NameType = "rpe" | "weight" | "percentage";

  return (
    <>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{sets}</TableCell>
      <TableCell>{reps}</TableCell>
      <TableCell>
        {weight}
        {loadType == "rpe" ? " RPE" : loadType == "percentage" ? "%" : unit}
      </TableCell>
      <TableCell>
        {weightMax !== "0" && weightMax !== undefined ? (
          <>
            {weightMax}
            {loadType == "rpe" ? " RPE" : loadType == "percentage" ? "%" : unit}
          </>
        ) : (
          <span className="text-xs text-neutral-400">N/A</span>
        )}
      </TableCell>
      <TableCell className=" flex justify-end gap-2 ">
        <Button variant={"destructive"} onClick={() => deleteExercise()}>
          Delete
        </Button>
      </TableCell>
    </>
  );
};

export default SingleExercise;
