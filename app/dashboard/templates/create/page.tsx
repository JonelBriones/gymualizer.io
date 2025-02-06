"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import { DrawerCreateTemplate } from "@/components/shadcn/DrawerDemo";
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
const defaultForm: TemplateT = {
  name: "",
  startDate: "",
  endDate: "",
  weeks: [],
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
  const [exercises, setExercises] = useState<ExerciseT[]>([]);
  const [template, setTemplate] = useState<TemplateT>(defaultForm);

  const [date, setDate] = React.useState<DateRange | undefined>(defaultDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [readyToSave, setReadyToSave] = useState(false);
  const [showQuestion, setShowQuestion] = useState(0);
  const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadyToSave(true);
    setShowQuestion(0);
    console.log(template);
    setDate(defaultDate);
  };

  // const timeDiff = Math.abs(
  //   template?.endDate.toLocalDateString().getTime() - template?.startDate.getTime()
  // );
  console.log(template?.endDate);
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

  return (
    <div className="flex flex-col gap-4 w-full">
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
        defaultForm={defaultForm}
      />

      {/* CALCULATE WEEKS FROM START TO END DATE */}
      {readyToSave && (
        <div>
          <h1>{template.name}</h1>
          <Accordion type="multiple" className="w-full">
            {Array(10)
              .fill("")
              .map(({ days }: any, idx) => (
                <AccordionItem value={`item-${idx}`} key={idx}>
                  <AccordionTrigger
                    className="hover:bg-neutral-100 p-5"
                    onClick={() => dispatchEvent({ type: "name", days })}
                  >
                    Week {idx + 1}
                  </AccordionTrigger>
                  <AccordionContent className="ml-4">
                    <Accordion type="single" collapsible className="w-full">
                      {Array(7)
                        .fill("")
                        .map((_, idx) => (
                          <AccordionItem value={`item-${idx}`} key={idx}>
                            <AccordionTrigger
                              className="hover:bg-neutral-100 p-5"
                              onClick={() =>
                                dispatchEvent({
                                  type: "summary_notes",
                                  note: idx,
                                })
                              }
                            >
                              Day {idx + 1}
                            </AccordionTrigger>
                            <AccordionContent className="ml-4">
                              <CreateExerciseCard
                                exercises={exercises}
                                setExercises={setExercises}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      )}

      <div className="flex gap-2">
        {/* <div className="p-5 border border-neutral-200 rounded-md w-[300px] shadow-sm">
          <h4 className="font-medium text-xl">Exercises</h4>
          <div className="flex flex-col gap-2">
            {exercises.map((props: ExerciseT, idx) => (
              <Fragment key={idx}>
                <SingleExercise {...props} />
              </Fragment>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default page;
