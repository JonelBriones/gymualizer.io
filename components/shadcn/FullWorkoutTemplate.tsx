"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReducer } from "react";
import fakedata from "@/json/data.json";
import SingleExercise from "../template/SingleExercise";

const intialState = {
  showNotes: {},
  showWeeks: {},
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case "summary_notes": {
      return {
        ...state,
        showNotes: {
          ...state.showNotes,
          [action.note]: !state.showNotes[action.note],
        },
      };
    }
    case "week": {
      console.log("state", state);
      console.log("action", action);
      return {
        ...state,
        showWeeks: {
          ...state.showWeeks,
          [action.week]: !state.showWeeks[action.week],
        },
      };
    }
  }
  console.log("action summary", action);
}

export function FullWorkoutTemplate() {
  const [state, dispatchEvent] = useReducer(reducer, intialState);
  console.log("state", state);
  return (
    <div className="w-full">
      <h4 className="text-4xl">Template #1</h4>
      <Accordion type="single" collapsible className="w-full">
        {fakedata.map(({ week, days }) => (
          <AccordionItem value={`item-${week}`} key={week}>
            <AccordionTrigger
              className="hover:bg-neutral-100 p-5"
              onClick={() => dispatchEvent({ type: "week", week })}
            >
              Week {week}
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {days.map(({ day, exercises }) => (
                  <AccordionItem value={`item-${day}`} key={day}>
                    <AccordionTrigger
                      className="hover:bg-neutral-100 p-5"
                      onClick={() =>
                        dispatchEvent({
                          type: "summary_notes",
                          note: day,
                        })
                      }
                    >
                      Day {day}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4 bg-orange-50 w-full flex flex-col">
                        {exercises.map((props) => (
                          <SingleExercise {...props} key={props.name} />
                        ))}
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
  );
}
