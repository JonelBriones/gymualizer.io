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

interface Params {
  template: TemplateT;
  setTemplate: React.Dispatch<React.SetStateAction<TemplateT>>;
  weekIdx: number;
  dayIdx: number;
  getTotalDays: number;
  toggleDay: {
    week: number;
    day: number;
  };
}
export function CreateExerciseCard({
  template,
  setTemplate,
  weekIdx,
  dayIdx,
  toggleDay,
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
    const selectDay = addDays(new Date(template.startDate), daysToAdd());

    setTemplate({
      ...template,
      weeks: template?.weeks?.map((week, currentWeek: number) =>
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
