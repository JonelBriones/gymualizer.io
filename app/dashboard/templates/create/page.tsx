"use client";
import { TemplateT } from "@/app/_types/types";
import { CreateTemplateDrawer } from "@/components/shadcn/CreateTemplateDrawer";
import SingleExercise from "@/components/template/SingleExercise";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { CreateExerciseCard } from "@/components/shadcn/CreateExerciseCard";
import { Button } from "@/components/ui/button";

const currentDay = new Date();
const defaultDate = {
  from: new Date(),
  to: addDays(new Date(), 20),
};
const defaultTemplateForm: TemplateT = {
  name: "",
  startDate: "",
  endDate: "",
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
  let totalWeeks = Math.floor(getTotalDays / 7);
  const [remaininigDays, setRemainingDay] = useState(0);
  const [readyToSave, setReadyToSave] = useState(false);
  const [showQuestion, setShowQuestion] = useState(0);

  const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadyToSave(true);
    setShowQuestion(0);
    setDate(defaultDate);
    const start = date?.from ? new Date(date?.from) : new Date();
    const end = date?.to ? new Date(date?.to) : new Date();
    console.log("TODAY IS:", currentDay, daysoftheweek[start.getDay()]);

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
    setRemainingDay(remainingDays);
    setTemplate({
      ...template,
      startDate: date?.from,
      endDate: date?.to,
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
    // daysToAdd(weekIdx, dayIdx)
    // console.log("selected day", selectDay);
    // if(  selectDay >= new Date(template.startDate))
    return selectDay;
  };
  const daysToAdd = (weekIdx: number, dayIdx: number) => {
    switch (weekIdx) {
      case 0:
        return dayIdx;
      default:
        return weekIdx * 7 + dayIdx;
    }
  };

  // {
  //   matchDateToToggleDay(weekIdx, dayIdx).toLocaleDateString(
  //     "en-us",
  //     options as {}
  //   );
  // }

  // useEffect(() => {
  //   showQuestion == 2 && getDurationOfTemplate();
  // }, [showQuestion == 2]);

  useEffect(() => {
    console.log("updating template", template);
    console.log("total weeks", totalWeeks);
  }, [template]);

  const [toggledDay, setToggleDay] = useState({
    week: 0,
    day: 0,
  });

  useEffect(() => {
    console.log(toggledDay);
  }, [toggledDay]);

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
          />
        ) : (
          <Button variant="outline" onClick={onDrawerClose}>
            Restart
          </Button>
        )}
        {readyToSave && (
          <CreateExerciseCard
            toggleDay={toggledDay}
            template={template}
            setTemplate={setTemplate}
            weekIdx={toggledDay.week}
            dayIdx={toggledDay.day}
            getTotalDays={getTotalDays}
          />
        )}
      </div>

      <div className=" min-h-screen w-full">
        {readyToSave && (
          <div className="w-full overflow-hidden">
            <h1 className="flex justify-between text-4xl">
              <span>{template?.name}</span>
              <span>
                {`${template.startDate.toLocaleDateString()} - ${template.endDate.toLocaleDateString()}`}
              </span>
            </h1>
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
                                <TableCaption>Workout summary</TableCaption>
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
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {day.exercises.map((props, idx) => (
                                    <TableRow key={idx}>
                                      <SingleExercise {...props} />
                                    </TableRow>
                                  ))}
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
        )}
      </div>
    </div>
  );
};

export default page;
