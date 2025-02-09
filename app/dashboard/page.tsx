"use client";
import { Calendar } from "@/components/ui/calendar";

import React from "react";

import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
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
    <div className="flex flex-col md:flex-row gap-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Today's Workout</Button>
        </DrawerTrigger>
        <DrawerContent className="h-[500px] ">
          <div className="mx-auto w-full max-w-sm flex-grow flex flex-col place-content-between ">
            <DrawerHeader>
              <DialogTitle>Today's Workout</DialogTitle>

              {fake_data.exercises.map(
                ({ name, sets, reps, date }, idx) =>
                  new Date(today).toLocaleDateString() ==
                    new Date(date).toLocaleDateString() && (
                    <DrawerDescription key={idx} className="flex text-left p-4">
                      <span>{name}</span>
                      <span>
                        <span className="">{sets}</span>
                        <span>x</span>
                        <span>{reps}</span>
                      </span>
                    </DrawerDescription>
                  )
              )}
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

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
