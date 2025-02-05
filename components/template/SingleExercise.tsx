import { Exercise } from "@/app/_types/types";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipDemo } from "../shadcn/TooltipDemo";
const SingleExercise = ({
  name,
  sets,
  reps,
  loadType,
  load,
  unit,
  notes,
}: Exercise) => {
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
            <div className="flex gap-4 place-items-center border border-neutral-400 p-2 rounded-md cursor-pointer select-none">
              {/* <div className="border size-14">image</div> */}
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
      {/* <TooltipDemo notes={notes} /> */}
    </>
  );
};

export default SingleExercise;
