"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TemplateT } from "@/app/_types/types";
import ExerciseForm from "./ExerciseForm";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { ExerciseFormSchemaType } from "@/app/_ZodSchemas";
import editProgramAction from "@/app/_actions/exerciseActions/templateActions/editProgramAction";

interface Params {
  program: TemplateT;
  setEditProgram: React.Dispatch<React.SetStateAction<TemplateT>>;
  weekIdx: number;
  dayIdx: number;
  getTotalDays: number;
  toggledDayId: {
    week: number;
    day: number;
  };
  toggleDay: {
    week: number;
    day: number;
  };
}
export function CreateExerciseCard({
  program,
  setEditProgram,
  weekIdx,
  dayIdx,
  toggleDay,
  toggledDayId,
}: Params) {
  const daysToAdd = () => {
    switch (weekIdx) {
      case 0:
        return dayIdx;
      default:
        return weekIdx * 7 + dayIdx;
    }
  };

  const onSubmitCreateExercise = (e: ExerciseFormSchemaType) => {
    const selectDay = addDays(new Date(program.startDate), daysToAdd());

    const updatedProgram = {
      ...program,
      weeks: program?.weeks?.map((week, currentWeek: number) =>
        currentWeek == weekIdx
          ? {
              ...week,
              days: week.days.map((day, currentDay: number) =>
                currentDay == dayIdx
                  ? {
                      ...day,
                      exercises: [...day.exercises, { ...e, date: selectDay }],
                    }
                  : day
              ),
            }
          : week
      ),
    };

    editProgramAction(e, toggledDayId, program._id);
    setEditProgram({
      ...program,
      weeks: program?.weeks?.map((week, currentWeek: number) =>
        currentWeek == weekIdx
          ? {
              ...week,
              days: week.days.map((day, currentDay: number) =>
                currentDay == dayIdx
                  ? {
                      ...day,
                      exercises: [...day.exercises, { ...e, date: selectDay }],
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
        <ExerciseForm onSubmitCreateExercise={onSubmitCreateExercise} />
      </CardContent>
    </Card>
  );
}
