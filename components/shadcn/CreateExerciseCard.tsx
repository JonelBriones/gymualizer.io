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
interface Params {
  template: TemplateT;
  setTemplate: (template: TemplateT) => void;
  weekIdx: number;
  dayIdx: number;
  getTotalDays: number;
}
const defaultExerciseForm: ExerciseT = {
  name: "",
  loadType: "weight",
  sets: 0,
  reps: 0,
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
  getTotalDays,
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

    // const selectDayConvertedToString = selectDay.toLocaleString();
    // console.log("get selected day string", selectDayConvertedToString);
    // console.log(
    //   "date selected day converted",
    //   new Date(1738742400000).toLocaleDateString()
    // );

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
    console.log();
    setExerciseForm(defaultExerciseForm);
  };

  return (
    <Card className="w-full  md:w-[340px] h-fit">
      <CardHeader className="">
        <CardTitle>Create Exercise</CardTitle>
        <CardDescription>
          Add exercise, sets, reps, load and notes.
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
