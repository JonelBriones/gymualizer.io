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
  toggleDay: any;
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

    setExerciseForm(defaultExerciseForm);
  };
  const [date, setDate] = useState({});

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

//  const matchDateToToggleDay = (weekIdx: number, dayIdx: number) => {
//     const selectDay = addDays(
//       new Date(template.startDate),
//       daysToAdd(weekIdx, dayIdx)
//     );
//     console.log(selectDay.getTime());
//     return selectDay;
//     {
//       matchDateToToggleDay(weekIdx, dayIdx).toLocaleDateString(
//         "en-us",
//         options as {}
//       );
//     }
// return selectDay.toLocaleDateString("en-us", options as {});\

// const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setReadyToSave(true);
//     setShowQuestion(0);
//     setDate(defaultDate);
//     const start = date?.from ? new Date(date?.from) : new Date();
//     const end = date?.to ? new Date(date?.to) : new Date();
//     console.log("TODAY IS:", currentDay, daysoftheweek[start.getDay()]);

//     const startDay = daysoftheweek[start.getDay()];

//     console.log("Start Day: ", startDay);

//     const totalDays = Math.ceil(
//       Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
//     );
//     const completeWeeks = Math.floor(totalDays / 7);
//     const remainingDays = Math.floor(totalDays % 7);
//     const totalWeeks = remainingDays > 0 ? completeWeeks + 1 : completeWeeks;
//     console.log("DURATION OF TEMPALTE", totalDays);
//     const setWeeks = Array.from({ length: totalWeeks }, () => ({
//       days: Array(7)
//         .fill(null)
//         .map(() => ({
//           exercises: [],
//         })),
//     }));
//     console.log("completed Weeks: ", completeWeeks);
//     console.log("remaining Days: ", remainingDays);
//     console.log("total weeks: ", totalWeeks);
//     // const setWeeks = Array.from(
//     //   { length: caluclateWeeksAndRemainingDays },
//     //   () => ({
//     //     days: Array(7)
//     //       .fill(null)
//     //       .map(() => ({
//     //         exercises: [],
//     //       })),
//     //   })
//     // );
//     setTemplate({
//       ...template,
//       startDate: date?.from,
//       endDate: date?.to,
//       weeks: setWeeks,
//     });
//   };

// const daysToAdd = (weekIdx: number, dayIdx: number) => {
//   switch (weekIdx) {
//     case 0:
//       // console.log("running weeks 1");
//       return dayIdx;
//     default:
//       // console.log("running weeks 2 >");
//       // console.log("week * 7:", weekIdx, " day: ", dayIdx);
//       return weekIdx * 7 + dayIdx;
//   }
// };
// const [selectedDay, setSelectedDay] = useState();
