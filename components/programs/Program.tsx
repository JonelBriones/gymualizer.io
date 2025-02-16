"use client";
import React, { Fragment, useActionState, useEffect, useState } from "react";
import fakedata from "@/json/data.json";
import { TemplateT, ToggleWeekDayId } from "@/app/_types/types";
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
import SingleExercise from "../SingleExercise";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { addDays } from "date-fns";
import { updateWorkoutNotesAction } from "@/app/_actions/exerciseActions/templateActions/updateWorkoutNotesAction";
const Program = ({ program }: { program: TemplateT }) => {
  const [selectWeek, setSelectWeek] = useState(0);
  if (!program) return <div>program error loaded</div>;

  const programWeeks = program.weeks[selectWeek].days.filter(
    (exercise) => exercise.exercises.length != 0
  );

  // const today = new Date().getTime();

  const today = new Date().toLocaleDateString();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const [state, addNote] = useActionState(updateWorkoutNotesAction, null);

  const matchDateToToggleDay = (weekIdx: number, dayIdx: number) => {
    const selectDay = addDays(
      new Date(Number(program?.startDate)),
      weekIdx == 0 ? dayIdx : weekIdx * 7 + dayIdx
    );

    return selectDay;
  };
  const [toggleWeekDay, setToggleWeekDay] = useState<ToggleWeekDayId>({
    week: null,
    day: null,
  });

  const [note, setNote] = useState("");

  const addNoteAction = (e: any) => {
    e.preventDefault();

    console.log(note);
    console.log(program.weeks[selectWeek]._id);
    updateWorkoutNotesAction(note, toggleWeekDay);
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
              {program.weeks.map((_, weekIdx) => (
                <Fragment key={weekIdx}>
                  <SelectItem value={weekIdx.toString()}>
                    Week {weekIdx + 1}
                  </SelectItem>
                </Fragment>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4 p-5 w-full">
        {/* DESKTOP USE POPUP / MOBILE USE DRAWER */}
        {programWeeks.map((day, dayIdx) => (
          <Drawer key={day._id.toString()}>
            <DrawerTrigger
              asChild
              onClick={() =>
                setToggleWeekDay({
                  week: program.weeks[selectWeek]._id,
                  day: day._id,
                })
              }
            >
              <Button
                variant="outline"
                className={`justify-start  gap-4 ${
                  matchDateToToggleDay(
                    selectWeek,
                    dayIdx
                  ).toLocaleDateString() == today
                    ? "bg-green-100"
                    : ""
                }`}
              >
                {matchDateToToggleDay(selectWeek, dayIdx).toLocaleDateString(
                  "en-us",
                  options as {}
                )}
              </Button>
            </DrawerTrigger>

            <DrawerContent className="">
              <div className="mx-auto w-full md:max-w-2xl h-[90vh] flex flex-col justify-between">
                <DrawerHeader>
                  <DrawerTitle>
                    Week {selectWeek + 1} | Day {dayIdx + 1}
                  </DrawerTitle>
                  <DrawerDescription className="flex gap-2">
                    <span>{day?.notes}</span>
                  </DrawerDescription>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Exercise</TableHead>
                        <TableHead>Sets</TableHead>
                        <TableHead>Reps</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Range</TableHead>
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
                            weight,
                            unit,
                            weightMax,
                            notes,
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
                              {weight}
                              {loadType == "rpe"
                                ? " RPE"
                                : loadType == "percentage"
                                ? "%"
                                : unit}
                            </TableCell>
                            <TableCell>
                              {weightMax !== "0" && weightMax !== undefined ? (
                                <>
                                  {weightMax}
                                  {loadType == "rpe"
                                    ? " RPE"
                                    : loadType == "percentage"
                                    ? "%"
                                    : unit}
                                </>
                              ) : (
                                <span className="text-xs text-neutral-400">
                                  N/A
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                    <TableFooter></TableFooter>
                  </Table>
                </DrawerHeader>
                <DrawerFooter className="flex flex-col gap-4">
                  <span className="text-sm">Workout notes</span>
                  <form
                    onSubmit={addNoteAction}
                    className="text-left border rounded-md"
                  >
                    <textarea
                      placeholder="add notes"
                      className="w-full p-2"
                      defaultValue={day?.workout_notes}
                      name="workoutNote"
                      onChange={(e) => setNote(e.target.value)}
                    />
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
