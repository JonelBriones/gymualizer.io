"use client";
import { TemplateT } from "@/app/_types/types";
import { CreateTemplateDrawer } from "@/components/shadcn/CreateTemplateDrawer";
import SingleExercise from "@/components/template/SingleExercise";
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
import { addDays, setDate } from "date-fns";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { CreateExerciseCard } from "@/components/shadcn/CreateExerciseCard";
import { Button } from "@/components/ui/button";
import { TemplateFormSchemaType } from "@/app/_ZodSchemas";

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
  const [remaininigDays, setRemainingDay] = useState(0);
  const [readyToSave, setReadyToSave] = useState(false);
  const [showQuestion, setShowQuestion] = useState(0);

  const onSubmitCreateTemplate = (e: TemplateFormSchemaType) => {
    setReadyToSave(true);
    setShowQuestion(0);
    setDate(defaultDate);
    const start = date?.from ? new Date(date?.from) : new Date();
    const end = date?.to ? new Date(date?.to) : new Date();

    const startDay = daysoftheweek[start.getDay()];

    console.log("Start Day: ", startDay);

    const totalDays = Math.ceil(
      Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    const completeWeeks = Math.floor(totalDays / 7);
    const remainingDays = Math.floor(totalDays % 7);
    const totalWeeks = remainingDays > 0 ? completeWeeks + 1 : completeWeeks;
    console.log("DURATION OF TEMPALTE", totalDays);
    const setWeeks = Array.from({ length: totalWeeks }, () => ({
      days: Array(7)
        .fill(null)
        .map(() => ({
          exercises: [],
        })),
    }));
    console.log("completed Weeks: ", completeWeeks);
    console.log("remaining Days: ", remainingDays);
    console.log("total weeks: ", totalWeeks);
    setTotalWeeks(totalWeeks);
    setRemainingDay(remainingDays);
    setTemplate({
      ...template,
      startDate: start,
      endDate: end,
      weeks: setWeeks,
    });
  };

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

  useEffect(() => {
    console.log("updating template", template);
    console.log("total weeks", totalWeeks);
  }, [template]);

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
      <div className="flex flex-col gap-2 md:w-[400px]">
        {!readyToSave ? (
          <CreateTemplateDrawer
            text={"New Template"}
            templateForm={template}
            setTemplate={setTemplate}
            date={date}
            setDate={setDate}
            options={options}
            setReadyToSave={setReadyToSave}
            readyToSave={readyToSave}
            onSubmitCreateTemplate={onSubmitCreateTemplate}
            setShowQuestion={setShowQuestion}
            showQuestion={showQuestion}
            defaultTemplateForm={defaultTemplateForm}
            onDrawerClose={onDrawerClose}
            totalWeeks={totalWeeks}
          />
        ) : (
          <Button variant="outline" onClick={onDrawerClose}>
            Restart
          </Button>
        )}
        {readyToSave && (
          <>
            <CreateExerciseCard
              toggleDay={toggledDay}
              template={template}
              setTemplate={setTemplate}
              weekIdx={toggledDay.week}
              dayIdx={toggledDay.day}
              getTotalDays={getTotalDays}
            />
            <Button variant="outline">Save</Button>
          </>
        )}
      </div>

      {readyToSave && (
        <div className="w-full">
          <h1 className="flex justify-between text-4xl">
            <span>{template?.name}</span>
            <span>
              {`${template.startDate.toLocaleDateString()} - ${template.endDate.toLocaleDateString()}`}
            </span>
          </h1>
          <div className="h-full overflow-auto">
            <div className=" h-[700px] w-full overflow-auto">
              <Accordion type="single" collapsible className="w-full">
                {template.weeks?.map((day, weekIdx) => (
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
                        {(remaininigDays > 0
                          ? day.days.slice(0, remaininigDays + 1)
                          : day.days
                        ).map((day, dayIdx) => (
                          <AccordionItem value={`item-${dayIdx}`} key={dayIdx}>
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
                                      <TableHead>Units</TableHead>
                                      <TableHead className="text-left">
                                        Additional Notes
                                      </TableHead>
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
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
