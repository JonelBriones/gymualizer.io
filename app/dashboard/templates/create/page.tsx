"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import { DrawerCreateTemplate } from "@/components/shadcn/DrawerDemo";
import SingleExercise from "@/components/template/SingleExercise";

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
  weeks: [
    {
      days: [
        {
          exercises: [],
        },
      ],
    },
  ],
};
const defaultExerciseForm: ExerciseT = {
  name: "",
  loadType: "weight",
  sets: "",
  reps: "",
  load: "",
  unit: "lbs",
  notes: "",
  week: "",
  day: "",
};

const intialState = {
  showTemplate: {},
  showWeek: {},
  showDay: {},
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case "SHOW_WEEK": {
      return {
        ...state,
        showWeek: {
          ...state.showWeeks,
          [action.week]: !state.showWeeks[action.week],
        },
      };
    }
    case "SHOW_DAY": {
      return {
        ...state,
        showWeeks: {
          ...state.showWeeks,
          [action.week]: !state.showWeeks[action.week],
        },
      };
    }
  }
}
const page = () => {
  const [state, dispatchEvent] = useReducer(reducer, intialState);

  const [template, setTemplate] = useState<TemplateT>(defaultTemplateForm);

  const [date, setDate] = React.useState<DateRange | undefined>(defaultDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [readyToSave, setReadyToSave] = useState(false);
  const [showQuestion, setShowQuestion] = useState(0);
  const [exercises, setExercises] = useState<ExerciseT[]>([]);
  const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadyToSave(true);
    setShowQuestion(0);
    setDate(defaultDate);
  };

  // const timeDiff = Math.abs(
  //   template?.endDate.toLocalDateString().getTime() - template?.startDate.getTime()
  // );

  const [exerciseForm, setExerciseForm] =
    useState<ExerciseT>(defaultExerciseForm);
  const addToWeek = (weekIdx, dayIdx) => {
    setTemplate((temp) => {
      const updateTemplate = temp.weeks.map((weeks, wIdx) =>
        wIdx === weekIdx
          ? {
              ...weeks,
              days: weeks.days.map((day, idx) =>
                idx === dayIdx
                  ? { ...day, exercises: [...day.exercises, exerciseForm] }
                  : weeks
              ),
            }
          : weeks
      );
      return { ...temp, updateTemplate };
    });
    console.log("template", template);
    console.log("form", exerciseForm);
  };
  useEffect(() => {
    if (date) {
      setTemplate({
        ...template,
        startDate: date.from,
        endDate: date.to,
      });
    }
    console.log(template);
  }, [date]);

  // MAYBE INSTEAD OF ADDING INSIDE THE WEEKS, ON CREAT EXERCISE CARD, ADD INPUT DAY AND WEEK
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div className="flex gap-4 w-full">
      <CreateExerciseCard
        template={template}
        setTemplate={setTemplate}
        exerciseForm={exerciseForm}
        setExerciseForm={setExerciseForm}
        defaultExerciseForm={defaultExerciseForm}
        exercises={exercises}
        setExercises={setExercises}
      />
      {/* CALCULATE WEEKS FROM START TO END DATE */}
      {readyToSave ? (
        <div className="w-full">
          <h1 className="text-2xl">{template?.name}</h1>
          <Accordion type="multiple" className="w-full">
            {Array(10)
              .fill("")
              .map((_, weekIdx) => (
                <AccordionItem value={`item-${weekIdx}`} key={weekIdx}>
                  <AccordionTrigger
                    className="hover:bg-neutral-100 md:p-5"
                    onClick={() => dispatchEvent({ type: "name", weekIdx })}
                  >
                    Week {weekIdx + 1}
                  </AccordionTrigger>
                  <AccordionContent className="md:ml-4">
                    <Accordion type="single" collapsible className="w-full">
                      {Array(7)
                        .fill("")
                        .map((_, dayIdx) => (
                          <AccordionItem value={`item-${dayIdx}`} key={dayIdx}>
                            <AccordionTrigger
                              className="hover:bg-neutral-100 p-5"
                              onClick={() =>
                                dispatchEvent({
                                  type: "summary_notes",
                                  note: dayIdx,
                                })
                              }
                            >
                              Day {dayIdx + 1}
                            </AccordionTrigger>
                            <AccordionContent className="md:ml-4">
                              {/* <CreateExerciseCard
                                template={template}
                                setTemplate={setTemplate}
                                weekIdx={weekIdx}
                                dayIdx={dayIdx}
                                exerciseForm={exerciseForm}
                                setExerciseForm={setExerciseForm}
                                defaultExerciseForm={defaultExerciseForm}
                                exercises={exercises}
                                setExercises={setExercises}
                              /> */}
                              <div className="flex gap-2">
                                <div className="p-5">
                                  <div className="flex flex-col gap-2">
                                    {exercises.map(
                                      (props: any, idx) =>
                                        props.week == weekIdx &&
                                        props.day == dayIdx && (
                                          <Fragment key={idx}>
                                            <SingleExercise
                                              {...props}
                                              addToWeek={addToWeek}
                                              dayIdx={dayIdx}
                                              weekIdx={weekIdx}
                                              setTemplate={setTemplate}
                                            />
                                          </Fragment>
                                        )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      ) : (
        <DrawerCreateTemplate
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
