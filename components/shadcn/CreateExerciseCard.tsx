"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ExerciseT, TemplateT, Week } from "@/app/_types/types";
import ExerciseForm from "../forms/exercise/ExerciseForm";
import { addDays } from "date-fns";
import { toast } from "sonner";
interface Params {
  template: TemplateT;
  setTemplate: (template: TemplateT) => void;
  weekIdx: number;
  dayIdx: number;
  getTotalDays: number;
  toggleDay: any;
}
const defaultExerciseForm: ExerciseT = {
  name: "",
  loadType: "weight",
  sets: undefined,
  reps: undefined,
  load: "0",
  unit: "lbs",
  notes: "",
  date: 0,
};

export function CreateExerciseCard({
  template,
  setTemplate,
  weekIdx,
  dayIdx,
  toggleDay,
}: Params) {
  const [exerciseForm, setExerciseForm] =
    useState<ExerciseT>(defaultExerciseForm);

  const daysToAdd = () => {
    switch (weekIdx) {
      case 0:
        console.log("running weeks 1");

        console.log("day: ", dayIdx);
        return dayIdx;
      default:
        console.log("running weeks 2 >");
        console.log("week * 7:", weekIdx, " day: ", dayIdx);
        return weekIdx * 7 + dayIdx;
    }
  };

  const onSubmitCreateExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`adding new exercise to Week ${weekIdx} day ${dayIdx}`);

    const selectDay = addDays(new Date(template.startDate), daysToAdd());
    console.log("add week", selectDay.toLocaleDateString());

    const updatedForm = {
      ...exerciseForm,
      date: selectDay.getTime(),
    };
    console.log(updatedForm);
    console.log(template);

    setTemplate({
      ...template,
      weeks: template?.weeks?.map((week: Week, currentWeek: number) =>
        currentWeek == weekIdx
          ? {
              ...week,
              days: week.days.map((day, currentDay: number) =>
                currentDay == dayIdx
                  ? {
                      ...day,
                      exercises: [...day.exercises, updatedForm],
                    }
                  : day
              ),
            }
          : week
      ),
    });
    toast("Exercise has been added!", {
      description: `Added on week ${weekIdx + 1} day ${dayIdx + 1}`,
      // action: {
      //   label: "Undo",
      //   onClick: () => console.log("Undo"),
      // },
    });
    setExerciseForm(defaultExerciseForm);
  };

  return (
    <Card className="w-full  md:w-[340px] h-fit">
      <CardHeader>
        <CardTitle>Create exercise</CardTitle>
        <CardDescription className="flex flex-col">
          <span>Add exercise, sets, reps, load and notes.</span>
          <span>
            Week: {toggleDay?.week + 1} | Day: {toggleDay?.day + 1}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExerciseForm
          onSubmitCreateExercise={onSubmitCreateExercise}
          setExerciseForm={setExerciseForm}
          exerciseForm={exerciseForm}
          defaultExerciseForm={defaultExerciseForm}
        />
      </CardContent>
    </Card>
  );
}
