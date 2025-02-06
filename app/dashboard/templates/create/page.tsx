"use client";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import { CalendarDemo } from "@/components/shadcn/CalendarDemo";
import { CreateExerciseCard } from "@/components/shadcn/CreateExerciseCard";
import { DatePickerDemo } from "@/components/shadcn/DatePickerDemo";
import { DatePickerWithRange } from "@/components/shadcn/DatePickerWithRangeDemo";
import { DrawerCreateTemplate } from "@/components/shadcn/DrawerDemo";
import { FullWorkoutTemplate } from "@/components/shadcn/FullWorkoutTemplate";
import SingleExercise from "@/components/template/SingleExercise";
import WeeksAccordion from "@/components/template/WeeksAccordion";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { addDays, getYear, isSameDay, isWithinInterval } from "date-fns";
import React, {
  FormEvent,
  Fragment,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

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
const defaultForm = {
  name: "",
  startDate: "",
  endDate: "",
};

const intialState = {
  showTemplate: {},
  showWeek: {},
  showDay: {},
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case "SHOW_TEMPLATE": {
      return {
        ...state,
        showTemplate: {
          ...state.showNotes,
          [action.showTemplate]: !state.showNotes[action.showTemplate],
        },
      };
    }
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
  const [allTemplates, setAllTemplates] = useState<TemplateT[]>([]);
  const [exercises, setExercises] = useState<ExerciseT[]>([]);
  const [templateForm, setTemplateForm] = useState<TemplateT>(defaultForm);

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
    setAllTemplates([...allTemplates, templateForm]);
    console.log(templateForm);
    console.log("ALL TEMPLATES", allTemplates);
    setTemplateForm(defaultForm);
    setDate(defaultDate);
  };
  useEffect(() => {
    if (date) {
      setTemplateForm({
        ...templateForm,
        startDate: date.from,
        endDate: date.to,
      });
    }
  }, [date]);

  return (
    <div className="flex flex-col gap-4">
      <DrawerCreateTemplate
        text={"New Template"}
        templateForm={templateForm}
        setTemplateForm={setTemplateForm}
        date={date}
        setDate={setDate}
        options={options}
        setReadyToSave={setReadyToSave}
        readyToSave={readyToSave}
        onSubmitCreateTemplate={onSubmitCreateTemplate}
        setShowQuestion={setShowQuestion}
        showQuestion={showQuestion}
      />
      <WeeksAccordion templates={allTemplates} dispatchEvent={dispatchEvent} />

      {/* <div className="flex gap-2">
        <CreateExerciseCard exercises={exercises} setExercises={setExercises} />

        <div className="p-5 border border-neutral-200 rounded-md w-[300px] shadow-sm">
          <h4 className="font-medium text-xl">Exercises</h4>
          <div className="flex flex-col gap-2">
            {exercises.map((props: ExerciseT, idx) => (
              <Fragment key={idx}>
                <SingleExercise {...props} />
              </Fragment>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default page;
