"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReducer } from "react";
import fakedata from "@/data.json";
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
    <div className="w-[600px]">
      <h4 className="text-4xl">Template #1</h4>
      <Accordion type="single" collapsible className="w-full">
        {fakedata.map(({ week, days }) => (
          <AccordionItem value={`item-${week}`} key={week}>
            <AccordionTrigger
              onClick={() => dispatchEvent({ type: "week", week })}
            >
              Week {week}
            </AccordionTrigger>
            <AccordionContent>
              {days.map(({ day, exercises, summaryNote }, idx) => (
                <div key={day} className="flex flex-col bg-blue-50">
                  <h3>Day {day}</h3>
                  <div className="p-4 bg-red-50">
                    {exercises.map((props) => (
                      <SingleExercise {...props} key={props.name} />
                    ))}
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${day}`}>
                      {summaryNote ? (
                        <AccordionTrigger
                          onClick={() =>
                            dispatchEvent({
                              type: "summary_notes",
                              note: idx,
                            })
                          }
                        >
                          {state.showNotes[idx] ? "hide notes" : "show notes"}
                        </AccordionTrigger>
                      ) : (
                        <div>no notes</div>
                      )}
                      <AccordionContent>{summaryNote}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
