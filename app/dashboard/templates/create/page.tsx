"use client";
import { TemplateT } from "@/app/_types/types";
import { CreateTemplateDrawer } from "@/components/shadcn/CreateTemplateDrawer";
import SingleExercise from "@/components/template/SingleExercise";
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
// const [date, setDate] = React.useState<DateRange | undefined>({
//   from: new Date(2022, 0, 20),
//   to: addDays(new Date(2022, 0, 20), 20),
// });
const currentDay = new Date();
const defaultDate = {
  from: new Date(),
  // currentDay.getFullYear(),
  // currentDay.getMonth(),
  // currentDay.getDay()
  to: addDays(
    new Date(),
    // currentDay.getFullYear(),
    // currentDay.getMonth(),
    // currentDay.getDay()
    20
  ),
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
    year: "numeric",
    month: "long",
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

    console.log("creating template... totalweeks:", totalWeeks);
    const setWeeks = Array.from({ length: totalWeeks }, () => ({
      days: Array(7)
        .fill(null)
        .map(() => ({
          exercises: [],
        })),
    }));
    setTemplate({
      ...template,
      startDate: date?.from,
      endDate: date?.to,
      weeks: setWeeks,
    });
  };

  const getDurationOfTemplate = () => {
    console.log("running checking duration", totalWeeks);
    let days = 0;
    let current = date?.from ? new Date(date.from) : new Date();
    let end = date?.to ? new Date(date.to) : new Date();

    while (current <= end) {
      current.setDate(current.getDate() + 1);
      days++;
    }
    console.log("TOTAL DAYS", days);
    console.log("TOTAL WEEKS", Math.floor(days / 7));

    setGetTotalDays(days);
    const remaining = Math.floor(days % 7);
    console.log("remains", remaining);

    setRemainingDay(remaining);
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

  useEffect(() => {
    showQuestion == 2 && getDurationOfTemplate();
  }, [showQuestion == 2]);

  useEffect(() => {
    console.log("updating template", template);
  }, [template]);

  return (
    <div className="flex gap-4 w-full">
      {readyToSave ? (
        <div className="w-full">
          Weeks:{remaininigDays > 0 ? totalWeeks + 1 : totalWeeks}
          Days: Remaining {remaininigDays}
          <h1 className="text-2xl">{template?.name}</h1>
          <Accordion type="multiple" className="w-full">
            {Array(remaininigDays > 0 ? totalWeeks + 1 : totalWeeks)
              .fill(null)
              .map((_, weekIdx) => (
                <AccordionItem value={`item-${weekIdx}`} key={weekIdx}>
                  <AccordionTrigger className="hover:bg-neutral-100 md:p-5">
                    Week {weekIdx + 1}
                  </AccordionTrigger>
                  <AccordionContent className="md:ml-4">
                    <Accordion type="single" collapsible className="w-full">
                      {(remaininigDays > 0 && weekIdx == totalWeeks
                        ? daysoftheweek.slice(0, remaininigDays)
                        : daysoftheweek
                      ).map((day, dayIdx) => (
                        <AccordionItem value={`item-${dayIdx}`} key={dayIdx}>
                          <AccordionTrigger className="hover:bg-neutral-100 p-5">
                            {day}
                          </AccordionTrigger>
                          {
                            <AccordionContent className="flex gap-2">
                              <CreateExerciseCard
                                template={template}
                                setTemplate={setTemplate}
                                weekIdx={weekIdx}
                                dayIdx={dayIdx + 1}
                                getTotalDays={getTotalDays}
                              />

                              <div className="flex flex-col gap-2">
                                {template?.weeks?.[weekIdx]?.days[
                                  dayIdx
                                ].exercises.map((props, idx) => (
                                  <Fragment key={idx}>
                                    <SingleExercise {...props} />
                                  </Fragment>
                                ))}
                              </div>
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
      ) : (
        <CreateTemplateDrawer
          text={"New Template"}
          templateForm={template}
          setTemplateForm={setTemplate}
          date={date}
          setDate={setDate}
          options={options}
          setReadyToSave={setReadyToSave}
          readyToSave={readyToSave}
          onSubmitCreateTemplate={onSubmitCreateTemplate}
          setShowQuestion={setShowQuestion}
          showQuestion={showQuestion}
          defaultTemplateForm={defaultTemplateForm}
        />
      )}
    </div>
  );
};

export default page;
