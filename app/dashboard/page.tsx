"use client";
import { Calendar } from "@/components/ui/calendar";

import React from "react";

import Link from "next/link";
const page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const fake_data = {
    id: "01031",
    day: 1,
    exercises: [
      {
        name: "Bench",
        sets: 4,
        reps: 8,
      },
      {
        name: "Bicep-curls",
        sets: 4,
        reps: 8,
      },
      {
        name: "Tricep-extension",
        sets: 4,
        reps: 12,
      },
    ],
  };
  return (
    <div className="flex gap-4">
      <Link
        href={`/dashboard/workout/${fake_data.id}`}
        className="w-fit p-5 border border-neutral-200 shadow rounded-s"
      >
        <h4 className="text-2xl font-bold">Today's Workout:</h4>
        {fake_data.exercises.map(({ name, sets, reps }) => (
          <div className="flex justify-between gap-2" key={name}>
            <span>{name}</span>
            <div>
              <span className="">{sets}</span>
              <span>x</span>
              <span>{reps}</span>
            </div>
          </div>
        ))}
      </Link>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
    </div>
  );
};

export default page;
