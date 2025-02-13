"use client";
import React, { Fragment, useEffect, useState } from "react";
import fakedata from "@/json/data.json";
import { TemplateT } from "@/app/_types/types";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SingleExercise from "../template/SingleExercise";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
const Program = () => {
  const program = fakedata[0];
  const [selectWeek, setSelectWeek] = useState(0);
  const weeks = program.weeks.length;
  if (!program) return <div>program error loaded</div>;

  const convertTimestamp = (date: number) => {
    return new Date(date);
  };

  const removeExtraDays = program.weeks[selectWeek].days.filter(
    (exercise) => exercise.exercises.length != 0
  );
  console.log(removeExtraDays);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // const today = new Date().getTime();

  const exerciseIsToday = (date: number) => {
    return (
      new Date(date).toLocaleDateString() == new Date().toLocaleDateString()
    );
  };
  return (
    <div className="w-full">
      <div className="flex justify-between place-items-center">
        <h4 className="text-2xl">Day {program.name}</h4>

        <Select
          value={selectWeek.toString()}
          onValueChange={(value) => setSelectWeek(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View week" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Weeks</SelectLabel>
              {program.weeks.map((_, idx) => (
                <Fragment key={idx}>
                  <SelectItem value={idx.toString()}>Week {idx}</SelectItem>
                </Fragment>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4 p-5 w-full">
        {removeExtraDays.map((day, dayIdx) => (
          <Drawer key={dayIdx}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className={`justify-start  gap-4 ${
                  exerciseIsToday(day.date) ? "bg-green-100" : ""
                }`}
              >
                {convertTimestamp(day?.date).toLocaleDateString(
                  "en-us",
                  options as {}
                )}
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm h-[90vh] flex flex-col justify-between">
                <DrawerHeader>
                  <DrawerTitle>
                    Week {selectWeek + 1} | Day {dayIdx + 1}
                  </DrawerTitle>
                  <DrawerDescription className="flex gap-2">
                    <span>{day.summary_notes}</span>
                  </DrawerDescription>

                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Exercise</TableHead>
                        <TableHead>Sets</TableHead>
                        <TableHead>Reps</TableHead>
                        <TableHead colSpan={2}>Weight</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {day.exercises.map(
                        (
                          {
                            name,
                            sets,
                            reps,
                            loadType,
                            percentageLoad,
                            weightLoad,
                            rpeLoad,
                            unit,
                          },
                          exerciseIdx
                        ) => (
                          <TableRow key={exerciseIdx}>
                            <TableCell className="font-medium text-left">
                              {name}
                            </TableCell>
                            <TableCell>{sets}</TableCell>
                            <TableCell>{reps}</TableCell>
                            <TableCell>
                              {loadType == "rpe"
                                ? `RPE ${rpeLoad}`
                                : loadType == "percentage"
                                ? `${percentageLoad}%`
                                : `${weightLoad}${unit}`}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </DrawerHeader>
                <DrawerFooter className="flex flex-col gap-4">
                  <div>
                    <span className="text-sm text-right">Workout notes</span>
                    <p>{day.workout_notes}</p>
                  </div>
                  <form action="" className="text-left border">
                    <textarea placeholder="add notes" className="w-full p-2" />
                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full"
                    >
                      submit
                    </Button>
                  </form>
                  <DrawerClose asChild className="flex flex-col gap-4">
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
};

export default Program;
