"use client";
import { ExerciseT } from "@/app/_types/types";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Params } from "next/dist/server/request/params";

const SingleExercise = ({
  name,
  sets,
  reps,
  loadType,
  load,
  unit,
  notes,
  date,
}: ExerciseT) => {
  let description = `${sets} x ${reps} at ${
    loadType == "percentage"
      ? `${load}%`
      : loadType == "rpe"
      ? `rpe ${load}`
      : `${load}${unit}`
  } `;
  console.log("DATE", date);
  console.log(new Date(date));
  const convertedDate = new Date(date);
  return (
    <div className="flex flex-col gap-4 p-2 rounded-md border">
      <div className="flex gap-2">
        <h4 className="text-[16px] font-medium">{name}</h4>
        <p>{description}</p>
        <p>{notes}</p>
        <p>Date:{convertedDate.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default SingleExercise;
