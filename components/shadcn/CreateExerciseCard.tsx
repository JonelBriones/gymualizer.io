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

  const onSubmitCreateExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`adding new exercise to Week ${weekIdx} day ${dayIdx}`);
    let timestampStart = new Date(template.startDate);
    console.log("timestampStart", timestampStart);
    setExerciseForm(defaultExerciseForm);
    const selectDay = timestampStart.setDate(
      timestampStart.getDate() + weekIdx * 7
    );
    console.log("get selected day", selectDay);
    console.log(
      "date selected day converted",
      new Date(1738742400000).toLocaleDateString()
    );
    const updatedForm = {
      ...exerciseForm,
      date: timestampStart.getTime(),
    };
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
    console.log("FORM", exerciseForm);
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
