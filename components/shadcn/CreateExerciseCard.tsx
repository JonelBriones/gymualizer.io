"use client";
import React, { FormEvent, useEffect } from "react";
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
  exerciseForm: any;
  setExerciseForm: any;
  defaultExerciseForm: ExerciseT;
  weekIdx: any;
  dayIdx: any;
  template: TemplateT;
  setTemplate: any;
  exercises: any;
  setExercises: any;
}
export function CreateExerciseCard({
  exerciseForm,
  setExerciseForm,
  defaultExerciseForm,
  template,
  setTemplate,
  exercises,
  setExercises,
  weekIdx,
  dayIdx,
}: any) {
  const onSubmitCreateExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`adding new exercise to Week ${weekIdx} day ${dayIdx}`);

    setExerciseForm(defaultExerciseForm);

    setTemplate({
      ...template,
      weeks: template.weeks.map((week: Week, currentWeek: number) =>
        currentWeek == weekIdx
          ? {
              ...week,
              days: week.days.map((day, currentDay: number) =>
                currentDay == dayIdx
                  ? {
                      ...day,
                      exercises: [...day.exercises, exerciseForm],
                    }
                  : day
              ),
            }
          : week
      ),
    });
  };

  return (
    <Card className="w-fit md:max-w-md h-fit">
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
        />
      </CardContent>
    </Card>
  );
}
