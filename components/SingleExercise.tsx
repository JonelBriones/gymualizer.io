"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import { TableCell } from "@/components/ui/table";
import { Button } from "./ui/button";
interface ExerciseProps {
  exercise: ExerciseT;
  setProgram: Dispatch<SetStateAction<TemplateT | null>>;
  template: TemplateT;
  dayIdx: number;
  weekIdx: number;
  exerciseIdx: number;
}
const SingleExercise = ({
  exercise,
  setProgram,
  template,
  dayIdx,
  exerciseIdx,
  weekIdx,
}: ExerciseProps) => {
  const { name, sets, reps, loadType, weight, unit, weightMax } = exercise;
  const deleteExercise = (
    weekIdx: number,
    dayIdx: number,
    exerciseIdx: number
  ) => {
    setProgram({
      ...template,
      weeks: template.weeks?.map((week, wIdx) =>
        wIdx == weekIdx
          ? {
              ...week,
              days: week.days.map((day, dIdx) =>
                dIdx == dayIdx
                  ? {
                      ...day,
                      exercises: day.exercises.filter(
                        (_, eIdx) => eIdx !== exerciseIdx
                      ),
                    }
                  : day
              ),
            }
          : week
      ),
    });
  };
  useEffect(() => {}, [template]);
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
        <Button
          variant={"destructive"}
          onClick={() => deleteExercise(weekIdx, dayIdx, exerciseIdx)}
        >
          Delete
        </Button>
      </TableCell>
    </>
  );
};

export default SingleExercise;
