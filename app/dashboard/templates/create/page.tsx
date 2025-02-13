"use client";
import { TemplateT } from "@/app/_types/types";

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
import { DateRange } from "react-day-picker";
import { CreateExerciseCard } from "@/components/forms/exercise/CreateExerciseCard";
import { Button } from "@/components/ui/button";
import { TemplateFormSchemaType } from "@/app/_ZodSchemas";
import { TemplateForm } from "@/components/forms/template/TemplateForm";

const defaultDate = {
  from: new Date(),
  to: addDays(new Date(), 30),
};
const defaultTemplateForm: TemplateT = {
  name: "",
  startDate: defaultDate.from,
  endDate: defaultDate.to,
  weeks: [],
};

const page = () => {
  const [template, setTemplate] = useState<TemplateT>(defaultTemplateForm);

  const [date, setDate] = React.useState<DateRange | undefined>(defaultDate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const [getTotalDays, setGetTotalDays] = useState(0);
  const [totalWeeks, setTotalWeeks] = useState(0);

  const [readyToSave, setReadyToSave] = useState(false);
  const [showQuestion, setShowQuestion] = useState(0);

  const daysoftheweek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const matchDateToToggleDay = (weekIdx: number, dayIdx: number) => {
    const selectDay = addDays(
      new Date(template.startDate),
      weekIdx == 0 ? dayIdx : weekIdx * 7 + dayIdx
    );
    return selectDay;
  };

  // useEffect(() => {
  //   const start = date?.from ? new Date(date?.from) : new Date();
  //   const end = date?.to ? new Date(date?.to) : new Date();

  //   const totalDays = Math.ceil(
  //     Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
  //   );
  //   const completeWeeks = Math.floor(totalDays / 7);
  //   const remainingDays = Math.floor(totalDays % 7);
  //   const totalWeeks = remainingDays > 0 ? completeWeeks + 1 : completeWeeks;

  //   setTotalWeeks(totalWeeks);
  //   setRemainingDay(remainingDays);
  // }, [date]);

  const [toggledDay, setToggleDay] = useState({
    week: 0,
    day: 0,
  });

  const onDrawerClose = () => {
    setReadyToSave(false);
    setTemplate(defaultTemplateForm);
    setShowQuestion(0);
    setDate(defaultDate);
  };

  return (
    <div className="flex md:flex-row flex-col gap-4">
      {readyToSave ? (
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={onDrawerClose}>
              Restart
            </Button>
            <CreateExerciseCard
              toggleDay={toggledDay}
              template={template}
              setTemplate={setTemplate}
              weekIdx={toggledDay.week}
              dayIdx={toggledDay.day}
              getTotalDays={getTotalDays}
            />
            <Button variant="outline">Save</Button>
          </div>
          <div className="w-full">
            <h1 className="flex flex-col justify-between text-4xl">
              <span>{template.name}</span>
              <span>
                {`${template.startDate.toLocaleDateString()} - ${template.endDate.toLocaleDateString()}`}
              </span>
            </h1>
            <div className="h-full overflow-auto">
              <div className=" h-[700px] w-full overflow-auto">
                <Accordion type="single" collapsible className="w-full">
                  {template.weeks.map((day, weekIdx) => (
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
                          {day.days.map(
                            (day, dayIdx) =>
                              matchDateToToggleDay(weekIdx, dayIdx).getTime() <
                                addDays(template.endDate, 1).getTime() && (
                                <AccordionItem
                                  value={`item-${dayIdx}`}
                                  key={dayIdx}
                                >
                                  <AccordionTrigger
                                    className="hover:bg-neutral-100 p-5"
                                    onClick={() =>
                                      setToggleDay({
                                        ...toggledDay,
                                        day: dayIdx,
                                      })
                                    }
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
                                            <TableHead>Units</TableHead>
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
                                                  setTemplate={setTemplate}
                                                  template={template}
                                                  weekIdx={weekIdx}
                                                  dayIdx={dayIdx}
                                                  exerciseIdx={exerciseIdx}
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
      ) : (
        <div className="flex flex-col gap-2 m-auto md:w-[500px] border p-5">
          <TemplateForm />
        </div>
      )}
    </div>
  );
};

export default page;
