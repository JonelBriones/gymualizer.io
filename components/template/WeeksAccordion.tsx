import React, { useReducer } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { TemplateT } from "@/app/_types/types";
import fakeData from "@/json/data.json";
import SingleExercise from "./SingleExercise";
const WeeksAccordion = ({
  templates,
  dispatchEvent,
}: {
  templates: TemplateT[];
  dispatchEvent: any;
}) => {
  console.log(templates);
  console.log(fakeData);
  return (
    <div className="w-full">
      <Accordion type="multiple" className="w-full">
        {fakeData.map(({ name, startDate, endDate, weeks, _id }: any, idx) => (
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
};

export default WeeksAccordion;
