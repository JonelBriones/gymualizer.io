"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import { CreateTemplateDrawer } from "@/components/shadcn/CreateTemplateDrawer";
import SingleExercise from "@/components/template/SingleExercise";
import fakeData from "@/json/data.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addDays } from "date-fns";
import React, {
  FormEvent,
  Fragment,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import { CreateExerciseCard } from "@/components/shadcn/CreateExerciseCard";
import { ConstructionIcon } from "lucide-react";

const currentDay = new Date();
const defaultDate = {
  from: new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    currentDay.getDay()
  ),
  to: addDays(
    new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDay()
    ),
    20
  ),
};
const defaultTemplateForm: TemplateT = {
  name: "",
  startDate: "",
  endDate: "",
  weeks: [],
};
const defaultExerciseForm: ExerciseT = {
  name: "",
  loadType: "weight",
  sets: "0",
  reps: "0",
  load: "0",
  unit: "lbs",
  notes: "",
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
  let totalWeeks = getTotalDays / 7;
  let remaningDays = Math.floor(getTotalDays % 7);
  const [readyToSave, setReadyToSave] = useState(false);
  const [showQuestion, setShowQuestion] = useState(0);
  const [exercises, setExercises] = useState<ExerciseT[]>([]);

  const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadyToSave(true);
    setShowQuestion(0);
    setDate(defaultDate);
    getDurationOfTemplate();

    setTemplate({
      ...template,
      startDate: date.from,
      endDate: date.to,
      weeks: Array.from({ length: totalWeeks }, () => ({
        days: Array(7)
          .fill(null)
          .map(() => ({
            exercises: [],
          })),
      })),
    });

    console.log("NEW TEMPLATE", template);
  };

  const getDurationOfTemplate = () => {
    console.log("running");
    let days = 0;
    let current = new Date(date.from);
    let end = new Date(date.to);

    // while (current <= end) {
    //   let weekStart = new Date(current); // date program starts
    //   let weekEnd = new Date(weekStart);
    //   weekEnd.setDate(weekStart.getDate() + 6); // add 6 days for full week
    //   if (weekEnd > end) weekEnd = new Date(end);
    //   current.setDate(current.getDate() + 1);
    //   weeks++;
    // }
    while (current <= end) {
      current.setDate(current.getDate() + 1);
      days++;
    }

    console.log("getting the days", days);
    setGetTotalDays(days);
  };

  const [exerciseForm, setExerciseForm] =
    useState<ExerciseT>(defaultExerciseForm);

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
    getDurationOfTemplate();
  }, [showQuestion == 2]);

  useEffect(() => {
    console.log(template);
  }, [template]);

  return (
    <div className="flex gap-4 w-full">
      {/* CALCULATE WEEKS FROM START TO END DATE */}
      {readyToSave ? (
        <div className="w-full">
          Weeks:{remaningDays > 0 ? totalWeeks + 1 : totalWeeks}
          Days: Remaining {remaningDays}
          <h1 className="text-2xl">{template?.name}</h1>
          <Accordion type="multiple" className="w-full">
            {Array(
              remaningDays > 0
                ? Math.floor(getTotalDays / 7) + 1
                : Math.floor(getTotalDays / 7)
            )
              .fill(null)
              .map((_, weekIdx) => (
                <AccordionItem value={`item-${weekIdx}`} key={weekIdx}>
                  <AccordionTrigger className="hover:bg-neutral-100 md:p-5">
                    Week {weekIdx + 1}
                  </AccordionTrigger>
                  <AccordionContent className="md:ml-4">
                    <Accordion type="single" collapsible className="w-full">
                      {(remaningDays > 0 && weekIdx == totalWeeks
                        ? daysoftheweek.slice(0, remaningDays)
                        : daysoftheweek
                      ).map((day, dayIdx) => (
                        <AccordionItem value={`item-${dayIdx}`} key={dayIdx}>
                          <AccordionTrigger className="hover:bg-neutral-100 p-5">
                            {day}
                          </AccordionTrigger>
                          {
                            <AccordionContent>
                              <CreateExerciseCard
                                template={template}
                                setTemplate={setTemplate}
                                weekIdx={weekIdx}
                                dayIdx={dayIdx}
                                exerciseForm={exerciseForm}
                                setExerciseForm={setExerciseForm}
                                defaultExerciseForm={defaultExerciseForm}
                                exercises={exercises}
                                setExercises={setExercises}
                              />
                              {template?.weeks.map((week, currentWeekIdx) =>
                                week.days.map((day, currentDayIdx) => (
                                  <>
                                    {day.exercises.map(
                                      (props, idx) =>
                                        currentDayIdx == weekIdx &&
                                        currentDayIdx == dayIdx && (
                                          <Fragment key={idx}>
                                            <div>WEEK: {weekIdx + 1}</div>
                                            <div>
                                              DAY: {daysoftheweek[dayIdx]}
                                            </div>
                                            <SingleExercise {...props} />
                                          </Fragment>
                                        )
                                    )}
                                  </>
                                ))
                              )}
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
