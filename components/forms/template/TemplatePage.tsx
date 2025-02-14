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
import React, { useEffect, useState } from "react";

import { CreateExerciseCard } from "@/components/forms/exercise/CreateExerciseCard";
import { Button } from "@/components/ui/button";
import { TemplateForm } from "@/components/forms/template/TemplateForm";
import { Types } from "mongoose";

const TemplatePage = ({ templatesData }: { templatesData: TemplateT[] }) => {
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
  const [getTotalDays, setGetTotalDays] = useState(0);

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
    <div className="flex md:flex-row flex-col gap-4">
      {!program?._id ? (
        <div>
          <select
            name="select"
            id="select"
            onChange={(e) => {
              const id = new Types.ObjectId(e.target.value);
              const exist = templatesData?.find(
                (template: TemplateT) => template?._id == id
              );

              setProgram(exist ? exist : null);
            }}
          >
            <option>select</option>
            {templatesData?.map(({ name, _id }: TemplateT) => (
              <option value={_id.toString()} key={_id.toString()}>
                {name}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-2 m-auto md:w-[500px] border p-5">
            <TemplateForm program={program} />
          </div>
        </div>
      ) : (
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setProgram(null);
              }}
            >
              Go Back
            </Button>
            <CreateExerciseCard
              toggleDay={toggledDay}
              program={program}
              weekIdx={toggledDay.week}
              dayIdx={toggledDay.day}
              getTotalDays={getTotalDays}
              toggledDayId={toggledDayId}
              setProgram={setProgram}
              selectedExerciseDate={selectedExerciseDate}
            />
          </div>
          <div className="w-full">
            <h1 className="flex flex-col justify-between text-4xl">
              <span>{program.name}</span>
              <span>
                {new Date(Number(program?.startDate)).toLocaleDateString()} -{" "}
                {new Date(Number(program?.endDate)).toLocaleDateString()}
              </span>
            </h1>
            <div className="h-full overflow-auto">
              <div className=" h-[700px] w-full overflow-auto">
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
                        <Accordion type="single" collapsible className="w-full">
                          {week.days.map(
                            (day, dayIdx) =>
                              matchDateToToggleDay(weekIdx, dayIdx).getTime() <
                                addDays(
                                  new Date(Number(program?.endDate)),
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
                                    ).toLocaleDateString(
                                      "en-us",
                                      options as {}
                                    )}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePage;
