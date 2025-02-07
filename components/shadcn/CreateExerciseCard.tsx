"use client";
import React, { FormEvent, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ExerciseT, TemplateT } from "@/app/_types/types";
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
}: any) {
  const onSubmitCreateExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exerciseForm.week == "" || exerciseForm.day == "") return;
    console.log("form", exerciseForm);
    setExercises([...exercises, exerciseForm]);
    setExerciseForm(defaultExerciseForm);
    console.log(exercises);
  };

  return (
    <Card className="w-fit md:max-w-md">
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
