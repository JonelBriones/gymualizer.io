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

export function FullWorkoutTemplate() {
  const [state, dispatchEvent] = useReducer(reducer, intialState);
  console.log("state", state);
  return (
    <div className="w-full">
      <h4 className="text-4xl">Template #1</h4>
      <Accordion type="multiple" className="w-full">
        {fakedata.map(({ name, startDate, endDate, weeks, _id }: any, idx) => (
          <AccordionItem value={`item-${idx}`} key={_id}>
            <AccordionTrigger
              className="hover:bg-neutral-100 p-5"
              onClick={() => dispatchEvent({ type: "template", weeks })}
            >
              {name}
            </AccordionTrigger>
            <AccordionContent className="ml-4">
              <Accordion type="multiple" className="w-full">
                {weeks.map(({ days }: any, idx) => (
                  <AccordionItem value={`item-${idx}`} key={idx}>
                    <AccordionTrigger
                      className="hover:bg-neutral-100 p-5"
                      onClick={() => dispatchEvent({ type: "name", days })}
                    >
                      Week {idx}
                    </AccordionTrigger>
                    <AccordionContent className="ml-4">
                      <Accordion type="multiple" className="w-full">
                        {days?.map(({ day, exercises }) => (
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
                            <AccordionContent className="ml-4">
                              <div className="p-4 flex flex-col">
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
