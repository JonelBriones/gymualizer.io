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
import { addCompletedSetWeightAction } from "@/app/_actions/exerciseActions/templateActions/addCompletedSetWeightAction";
import mongoose, { Types } from "mongoose";
import { createProgramAction } from "@/app/_actions/exerciseActions/templateActions/createProgramAction";
const Program = ({ programData }: { programData: TemplateT }) => {
  const [selectWeek, setSelectWeek] = useState(0);
  // const [localProgram, setLocalProgram] = useState<TemplateT | null>(null);

  const [program, setProgram] = useState<TemplateT | null>(programData);

  // useEffect(() => {
  //   if (program?._id) {
  //     const localProgram = localStorage.getItem(program?._id.toString());
  //     if (localProgram) {
  //       console.log("found local storage program, setting it as program");
  //       console.log(JSON.parse(localProgram));
  //       setLocalProgram(JSON.parse(localProgram));
  //     }
  //   }
  // }, []);

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
  // const [state, addNote] = useActionState(updateWorkoutNotesAction, null);

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

  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const localNote = localStorage.getItem("note");
    if (localNote) {
      setNote(localNote);
    }
  }, []);

  // const [state, addCompletedSets] = useActionState(
  //   addCompletedSetWeightAction,
  //   null
  // );

  const onChangeDayExerciseFields = (e, dayIdx, exerciseIdx, setIdx) => {
    const week = program.weeks[selectWeek];
    // console.log(week);
    console.log("DAY: ", week.days[dayIdx]);
    console.log(e.target.value);
    setProgram({
      ...program,
      weeks: program.weeks.map((week, weekIdx) =>
        weekIdx == selectWeek
          ? {
              ...week,
              days: week.days.map((day, dIdx) =>
                dIdx == dayIdx
                  ? {
                      ...day,
                      exercises: day.exercises.map((exercise, eIdx) =>
                        eIdx == exerciseIdx
                          ? {
                              ...exercise,
                              setWeight: exercise.setWeight.map((set, sIdx) =>
                                sIdx == setIdx ? Number(e.target.value) : set
                              ),
                            }
                          : exercise
                      ),
                    }
                  : day
              ),
            }
          : week
      ),
    });
    console.log("updating", program);
    localStorage.setItem(
      `week${selectWeek}|set${setIdx}|exercise${exerciseIdx}`,
      e.target.value
    );
  };

  const onSubmitSaveExerciseDay = (e, dayIdx, dayId) => {
    e.preventDefault();

    const week = program.weeks[selectWeek];
    const weekId = program.weeks[selectWeek]._id;
    const exercisesArr = week.days[dayIdx].exercises;
    addCompletedSetWeightAction(
      weekId,
      dayId,
      JSON.parse(JSON.stringify(exercisesArr))
    );
  };

  const setWeightLocalStorage = (setIdx: number, exerciseIdx: number) => {
    const weight = localStorage.getItem(
      `week${selectWeek}|set${setIdx}|exercise${exerciseIdx}`
    );
    if (weight) {
      return weight.toString();
    }
    return undefined;
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

      <div className="flex flex-col gap-5 p-5">
        {/* DESKTOP USE POPUP / MOBILE USE DRAWER */}
        {programWeeks.length == 0 ? (
          <div className="text-center">
            <p className="text-neutral-500">No workouts planned this week</p>
          </div>
        ) : (
          programWeeks.map((day, dayIdx) => (
            <Fragment key={day._id.toString()}>
              <h4
                className={` text-xl p-4  gap-4 ${
                  matchDateToToggleDay(
                    selectWeek,
                    dayIdx
                  ).toLocaleDateString() == today
                    ? "bg-green-100"
                    : "bg-neutral-100"
                }`}
              >
                {matchDateToToggleDay(selectWeek, dayIdx).toLocaleDateString(
                  "en-us",
                  options as {}
                )}
              </h4>
              <div className="border-t p-4 ">
                <h4 className="text-lg">
                  Workout notes: <span> {day.workout_notes}</span>
                </h4>
              </div>
              <form
                onSubmit={(e) => onSubmitSaveExerciseDay(e, dayIdx, day._id)}
                className="flex flex-col gap-2"
              >
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Exercise</TableHead>
                      <TableHead>Reps</TableHead>
                      <TableHead>Min</TableHead>
                      <TableHead>Max</TableHead>
                      {Array(6)
                        .fill(null)
                        .map((_, idx) => (
                          <TableHead key={idx}>Set {idx + 1}</TableHead>
                        ))}
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
                          _id,
                          setWeight,
                        },
                        exerciseIdx
                      ) => (
                        <TableRow key={exerciseIdx}>
                          <TableCell className="font-medium text-left">
                            {name}
                          </TableCell>
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
                          {Array(6)
                            .fill(null)
                            .map((_, setIdx) => (
                              <TableCell key={setIdx}>
                                <Fragment>
                                  <input
                                    type="number"
                                    defaultValue={
                                      setWeight[setIdx]
                                        ? setWeight[setIdx].toString()
                                        : setWeightLocalStorage(
                                            setIdx,
                                            exerciseIdx
                                          )
                                    }
                                    placeholder={
                                      setIdx >= Number(sets) ? "" : "load"
                                    }
                                    className={`border w-[80px] p-2 ${
                                      setIdx >= Number(sets)
                                        ? "bg-neutral-300"
                                        : ""
                                    }`}
                                    name={`set${setIdx + 1}`}
                                    disabled={setIdx >= Number(sets)}
                                    onChange={(e) =>
                                      onChangeDayExerciseFields(
                                        e,
                                        dayIdx,
                                        exerciseIdx,
                                        setIdx
                                      )
                                    }
                                  />
                                  {setIdx == 0 && (
                                    <>
                                      <input
                                        type="text"
                                        hidden
                                        name={`exerciseId`}
                                        value={_id?.toString()}
                                        readOnly
                                      />
                                      <input
                                        type="text"
                                        hidden
                                        name={`weekId`}
                                        value={program.weeks[
                                          selectWeek
                                        ]._id.toString()}
                                        readOnly
                                      />
                                      <input
                                        type="text"
                                        hidden
                                        name={`dayId`}
                                        value={programWeeks[
                                          dayIdx
                                        ]._id.toString()}
                                        readOnly
                                      />
                                    </>
                                  )}
                                </Fragment>
                              </TableCell>
                            ))}
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>

                <div>
                  <Drawer>
                    <DrawerTrigger
                      asChild
                      onClick={() =>
                        setToggleWeekDay({
                          week: program.weeks[selectWeek]._id,
                          day: day._id,
                        })
                      }
                    >
                      <Button variant="outline">Add comment</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto md:max-w-2xl h-[90vh] flex flex-col justify-between w-full p-4">
                        <DrawerHeader>
                          <DrawerTitle className="text-center">
                            Week {selectWeek + 1} | Day {dayIdx + 1}
                          </DrawerTitle>
                          <DrawerDescription aria-disabled></DrawerDescription>
                        </DrawerHeader>

                        <textarea
                          placeholder="add notes"
                          className="w-full p-5 min-h-[300px] text-2xl border rounded-md"
                          defaultValue={note ? note : day?.workout_notes}
                          name="workoutNote"
                          onChange={(e) => {
                            setNote(e.target.value);
                            localStorage.setItem("note", e.target.value);
                          }}
                        />

                        <DrawerFooter className="flex flex-col gap-4">
                          <DrawerClose asChild className="flex flex-col gap-4">
                            <Button
                              variant="outline"
                              onClick={() =>
                                updateWorkoutNotesAction(note, toggleWeekDay)
                              }
                            >
                              Save
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                  <button type="submit">save</button>
                </div>
              </form>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Program;
