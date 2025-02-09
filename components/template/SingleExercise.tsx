"use client";
import { ExerciseT } from "@/app/_types/types";
import React from "react";

import { TableCell } from "@/components/ui/table";
const SingleExercise = ({
  name,
  sets,
  reps,
  loadType,
  load,
  unit,
  notes,
}: ExerciseT) => {
  return (
    <>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{sets}</TableCell>
      <TableCell>{reps}</TableCell>
      <TableCell>
        {load}
        {loadType == "rpe" ? " RPE" : loadType == "percentage" ? "%" : ""}
      </TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>
        <p className="text-left max-h-[40px] overflow-auto">{notes}</p>
      </TableCell>
    </>
  );
};

export default SingleExercise;
