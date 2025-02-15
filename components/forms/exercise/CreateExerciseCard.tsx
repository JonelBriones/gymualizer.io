"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TemplateT, ToggleWeekDayId } from "@/app/_types/types";
import ExerciseForm from "./ExerciseForm";
import { toast } from "sonner";
import { ExerciseFormSchemaType } from "@/app/_ZodSchemas";
import editProgramAction from "@/app/_actions/exerciseActions/templateActions/editProgramAction";

interface Params {
  program: TemplateT | null;
  setProgram: React.Dispatch<React.SetStateAction<TemplateT | null>>;
  weekIdx: number;
  dayIdx: number;
  toggledDayId: ToggleWeekDayId;
  toggleDay: {
    week: number;
    day: number;
  };
  selectedExerciseDate: Date | null;
}
export function CreateExerciseCard({
  program,
  setProgram,
  weekIdx,
  dayIdx,
  toggleDay,
  toggledDayId,
  selectedExerciseDate,
}: Params) {
  const onSubmitCreateExercise = (e: ExerciseFormSchemaType) => {
    const {
      name,
      loadType,
      sets,
      reps,
      percentageLoad,
      rpeLoad,
      weightLoad,
      weightMax,
      rpeMax,
      percentageMax,
      unit,
      notes,
    } = e;
    let selectLoadType = {
      name,
      loadType,
      sets,
      reps,
      weightMax,
      unit,
      notes,
    };

    type WeightType = "percentage" | "weight" | "rpe";

    const LOADTYPE: Record<WeightType, string | undefined> = {
      rpe: rpeLoad,
      weight: weightLoad,
      percentage: percentageLoad,
    };
    const LOADTYPEMAX: Record<WeightType, string | undefined> = {
      rpe: rpeMax,
      weight: weightMax,
      percentage: percentageMax,
    };

    const updatedExercise = {
      ...selectLoadType,
      date: selectedExerciseDate,
      weight: LOADTYPE[loadType as WeightType],
      weightMax: LOADTYPEMAX[loadType as WeightType],
    };
    console.log("toggleDayId", toggledDayId);
    editProgramAction(updatedExercise, toggledDayId);

    if (!program) return;

    setProgram({
      ...program,
      weeks: program?.weeks?.map((week) =>
        week._id == toggledDayId.week
          ? {
              ...week,
              days: week.days.map((day) =>
                day._id == toggledDayId.day
                  ? {
                      ...day,
                      exercises: [...day.exercises, { ...updatedExercise }],
                    }
                  : day
              ),
            }
          : week
      ),
    });

    toast("Exercise has been added!", {
      description: `Added on week ${weekIdx + 1} day ${dayIdx + 1}`,
    });
  };

  return (
    <Card className="w-full h-fit">
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
          program={program}
        />
      </CardContent>
    </Card>
  );
}
