"use client";
import React, { Fragment, useReducer, useState } from "react";
import { FullWorkoutTemplate } from "../shadcn/FullWorkoutTemplate";
import { ToggleGroupItem, ToggleGroup } from "../ui/toggle-group";
import { CreateExerciseCard } from "../shadcn/CreateExerciseCard";
import { Exercise } from "@/app/_types/types";
import SingleExercise from "./SingleExercise";
import { CreateTemplateCard } from "../shadcn/CreateTemplateCard";
import { DrawerDemo } from "../shadcn/DrawerDemo";

const Template = () => {
  const [toggleTo, setToggleTo] = useState("view");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [numberOfWeeks, setNumberOfWeeks] = React.useState(1);
  const [templateForm, setTemplateForm] = useState([]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center md:justify-end gap-2">
        <ToggleGroup
          type="single"
          defaultValue={"view"}
          onValueChange={(value) => setToggleTo(value)}
        >
          {/* <ToggleGroupItem value="new">New Template</ToggleGroupItem> */}
          <DrawerDemo
            text={"New Template"}
            numberOfWeeks={numberOfWeeks}
            setNumberOfWeeks={setNumberOfWeeks}
          />
          <ToggleGroupItem value="view">View Templates</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex gap-2">
        {toggleTo == "view" ? (
          <FullWorkoutTemplate />
        ) : (
          <CreateExerciseCard
            exercises={exercises}
            setExercises={setExercises}
          />
        )}
        <CreateTemplateCard />
        <div className="p-5 border border-neutral-200 rounded-md w-[300px] shadow-sm">
          <h4 className="font-medium text-xl">Exercises</h4>
          <div className="flex flex-col gap-2">
            {exercises.map((props: Exercise, idx) => (
              <Fragment key={idx}>
                <SingleExercise {...props} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
