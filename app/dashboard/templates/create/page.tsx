"use client";
import { Exercise } from "@/app/_types/types";
import CreateTemplateForm from "@/components/forms/CreateTemplateForm";
import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import { CalendarDemo } from "@/components/shadcn/CalendarDemo";
import { CreateExerciseCard } from "@/components/shadcn/CreateExerciseCard";
import { CreateTemplateCard } from "@/components/shadcn/CreateTemplateCard";
import { DrawerDemo } from "@/components/shadcn/DrawerDemo";
import SingleExercise from "@/components/template/SingleExercise";
import TemplateContainer from "@/components/template/TemplateContainer";
import React, { Fragment, useState } from "react";

const page = () => {
  const [toggleTo, setToggleTo] = useState("view");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [numberOfWeeks, setNumberOfWeeks] = React.useState(1);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    program: [
      {
        _id: "2582058",
        days: [
          {
            _id: "2526058",
            // workout
          },
          {
            _id: "2588858",
            // workout
          },
          {
            _id: "2222058",
            // workout
          },
        ],
      },
    ],
  });

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <DrawerDemo
          text={"New Template"}
          numberOfWeeks={numberOfWeeks}
          setNumberOfWeeks={setNumberOfWeeks}
        />
        <div className="w-fit">
          <CalendarDemo />
        </div>
      </div>
      <div className="flex gap-2">
        <CreateExerciseCard exercises={exercises} setExercises={setExercises} />

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

export default page;
