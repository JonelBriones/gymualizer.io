"use client";
import React, { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExerciseT } from "@/app/_types/types";
import ExerciseForm from "../forms/exercise/ExerciseForm";
const defaultForm = {
  name: "",
  loadType: "weight",
  sets: "",
  reps: "",
  load: "",
  unit: "lbs",
  notes: "",
};

export function CreateExerciseCard({ exercises, setExercises }: any) {
  const [exerciseForm, setExerciseForm] = useState<ExerciseT>(defaultForm);
  const onSubmitCreateExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExercises([...exercises, exerciseForm]);
    setExerciseForm(defaultForm);
  };
  useEffect(() => {
    console.log(exercises);
  }, [exercises]);
  return (
    <Card className="md:w-[350px]">
      <CardHeader>
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
