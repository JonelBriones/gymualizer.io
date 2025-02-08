"use client";
import { Calendar } from "@/components/ui/calendar";

import React from "react";

import Link from "next/link";
const fake_data = {
  exercises: [
    {
      name: "Squat",
      loadType: "weight",
      sets: "4",
      reps: "8",
      load: "315",
      unit: "lbs",
      notes: "week 1 day 1",
      date: 244444400400,
    },
    {
      name: "Bench",
      loadType: "weight",
      sets: "4",
      reps: "8",
      load: "315",
      unit: "lbs",
      notes: "week 1 day 1",
      date: 1738982166547,
    },
  ],
};
const page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const today = new Date().getTime();
  const convertedDate = new Date(1738982166547).toLocaleDateString();

  return (
    <div className="flex gap-4">
      <Link
        href={`/dashboard/templates`}
        className="w-fit p-5 border border-neutral-200 shadow rounded-s"
      >
        <h4 className="text-2xl font-bold">Today's Workout:</h4>
        {fake_data.exercises.map(
          ({ name, sets, reps, date }) =>
            new Date(today).toLocaleDateString() ==
              new Date(date).toLocaleDateString() && (
              <div className="flex justify-between gap-2" key={name}>
                <span>{name}</span>
                <div>
                  <span className="">{sets}</span>
                  <span>x</span>
                  <span>{reps}</span>
                </div>
                <p>date:{new Date(today).toLocaleDateString()}</p>
              </div>
            )
        )}
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
