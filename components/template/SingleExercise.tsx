import { ExerciseT } from "@/app/_types/types";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Params } from "next/dist/server/request/params";
interface Param {
  name: any;
  sets: any;
  reps: any;
  loadType: any;
  load: any;
  unit: any;
  notes: any;
  addToweek: any;
  addToWeekdayIdx: any;
  weekIdx: any;
  setTemplate: any;
}
const SingleExercise = ({
  name,
  sets,
  reps,
  loadType,
  load,
  unit,
  notes,
  addToWeek,
  weekIdx,
  dayIdx,
}: Params) => {
  let description = `${sets} x ${reps} at ${
    loadType == "percentage"
      ? `${load}%`
      : loadType == "rpe"
      ? `rpe ${load}`
      : `${load}${unit}`
  } `;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex gap-4 place-items-center p-2 rounded-md cursor-pointer select-none">
              <div className="flex gap-2">
                <h4 className="text-[16px] font-medium">{name}</h4>
                <span className="text-neutral-600">{description}</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{notes}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SingleExercise;
