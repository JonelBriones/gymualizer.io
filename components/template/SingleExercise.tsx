"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import { TableCell } from "@/components/ui/table";
import { Button } from "../ui/button";
interface ExerciseProps {
  exercise: ExerciseT;
  setTemplate: Dispatch<SetStateAction<TemplateT>>;
  template: TemplateT;
  dayIdx: number;
  weekIdx: number;
  exerciseIdx: number;
}
const SingleExercise = ({
  exercise,
  setTemplate,
  template,
  dayIdx,
  exerciseIdx,
  weekIdx,
}: ExerciseProps) => {
  const {
    name,
    sets,
    reps,
    loadType,
    percentageLoad,
    weightLoad,
    rpeLoad,
    unit,
  } = exercise;
  const deleteExercise = (
    weekIdx: number,
    dayIdx: number,
    exerciseIdx: number
  ) => {
    setTemplate({
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

  const LOADTYPE: Record<NameType, string | undefined> = {
    rpe: rpeLoad,
    weight: weightLoad,
    percentage: percentageLoad,
  };

  return (
    <>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{sets}</TableCell>
      <TableCell>{reps}</TableCell>
      <TableCell>
        {LOADTYPE[loadType as NameType]}
        {loadType == "rpe" ? " RPE" : loadType == "percentage" ? "%" : ""}
      </TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell className="text-right flex justify-end gap-2 ">
        <Button variant="outline">Edit</Button>
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
