"use client";
import { TemplateT, ToggleWeekDayId } from "@/app/_types/types";

import SingleExercise from "@/components/SingleExercise";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addDays } from "date-fns";
import React, { Fragment, useEffect, useState } from "react";

import { CreateExerciseCard } from "@/components/forms/exercise/CreateExerciseCard";
import { Button } from "@/components/ui/button";
import { TemplateForm } from "@/components/forms/template/TemplateForm";
import { Types } from "mongoose";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TemplatePage = ({
  templatesData,
}: {
  templatesData: TemplateT[] | null;
}) => {
  const [program, setProgram] = useState<TemplateT | null>(null);
  const [selectedExerciseDate, setSelectedExerciseDate] = useState<Date | null>(
    null
  );

  const [toggledDayId, setToggleDayId] = useState<ToggleWeekDayId>({
    week: null,
    day: null,
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const matchDateToToggleDay = (weekIdx: number, dayIdx: number) => {
    const selectDay = addDays(
      new Date(Number(program?.startDate)),
      weekIdx == 0 ? dayIdx : weekIdx * 7 + dayIdx
    );

    return selectDay;
  };

  const [toggledDay, setToggleDay] = useState({
    week: 0,
    day: 0,
  });
  useEffect(() => {
    console.log("was updated...", templatesData);
  }, [templatesData]);
  return (
    <div className="flex flex-col place-content-center md:flex-row w-full m-auto gap-4 ">
      <div className="flex flex-1 flex-col place-items-center gap-4 md:max-w-sm ">
        <TemplateForm program={program} />
        {/* make template form into a popover-desktop drawer-mobile */}
        <CreateExerciseCard
          toggleDay={toggledDay}
          program={program}
          weekIdx={toggledDay.week}
          dayIdx={toggledDay.day}
          toggledDayId={toggledDayId}
          setProgram={setProgram}
          selectedExerciseDate={selectedExerciseDate}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-auto border p-4 rounded-md">
        <Select
          name="select"
          onValueChange={(e) => {
            const id = new Types.ObjectId(e);
            const exist = templatesData?.find(
              (template: TemplateT) => template?._id == id
            );

            setProgram(exist ? exist : null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Program" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Programs</SelectLabel>
              {templatesData?.map(({ name, _id }: TemplateT) => (
                <SelectItem value={_id.toString()} key={_id.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {program && (
          <Fragment>
            <div className="flex flex-col gap-2">
              <span className="text-4xl">{program.name}</span>
              <span className="text-xl">
                {new Date(Number(program.startDate)).toLocaleDateString()} -{" "}
                {new Date(Number(program.endDate)).toLocaleDateString()}
              </span>
            </div>
            <div className="h-[900px] w-full overflow-auto">
              <Accordion type="single" collapsible className="w-full">
                {program.weeks.map((week, weekIdx) => (
                  <AccordionItem value={`item-${weekIdx}`} key={weekIdx}>
                    <AccordionTrigger
                      className="hover:bg-neutral-100 md:p-5"
                      onClick={() =>
                        setToggleDay({
                          ...toggledDay,
                          week: weekIdx,
                        })
                      }
                    >
                      Week {weekIdx + 1}
                    </AccordionTrigger>
                    <AccordionContent className="md:ml-4">
                      <Accordion type="multiple" className="w-full">
                        {week.days.map(
                          (day, dayIdx) =>
                            matchDateToToggleDay(weekIdx, dayIdx).getTime() <
                              addDays(
                                new Date(Number(program.endDate)),
                                1
                              ).getTime() && (
                              <AccordionItem
                                value={`item-${dayIdx}`}
                                key={dayIdx}
                              >
                                <AccordionTrigger
                                  className="hover:bg-neutral-100 p-5"
                                  onClick={() => {
                                    setToggleDay({
                                      ...toggledDay,
                                      day: dayIdx,
                                    });
                                    setToggleDayId({
                                      week: week._id,
                                      day: day._id,
                                    });

                                    setSelectedExerciseDate(
                                      matchDateToToggleDay(weekIdx, dayIdx)
                                    );
                                  }}
                                >
                                  {matchDateToToggleDay(
                                    weekIdx,
                                    dayIdx
                                  ).toLocaleDateString("en-us", options as {})}
                                </AccordionTrigger>
                                {
                                  <AccordionContent className="flex gap-2">
                                    <Table className="w-full">
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="w-[150px]">
                                            Exercise
                                          </TableHead>
                                          <TableHead>Sets</TableHead>
                                          <TableHead>Reps</TableHead>
                                          <TableHead>Weight</TableHead>
                                          <TableHead>Range</TableHead>
                                          <TableHead className="text-right">
                                            Actions
                                          </TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {day.exercises.map(
                                          (exercise, exerciseIdx) => (
                                            <TableRow key={exerciseIdx}>
                                              <SingleExercise
                                                exercise={exercise}
                                                setProgram={setProgram}
                                                program={program}
                                                exerciseId={exercise._id}
                                                weekId={week._id}
                                                dayId={day._id}
                                              />
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                  </AccordionContent>
                                }
                              </AccordionItem>
                            )
                        )}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default TemplatePage;
