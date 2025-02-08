"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Fragment } from "react";
import fakedata from "@/json/data.json";
import SingleExercise from "../template/SingleExercise";
import { Day, ExerciseT } from "@/app/_types/types";
console.log(fakedata);
export function FullWorkoutTemplate() {
  const daysoftheweek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div className="w-full">
      <Accordion type="multiple" className="w-full">
        {fakedata.map(({ name, weeks }, templateIdx) => (
          <AccordionItem value={`item-${templateIdx}`} key={templateIdx}>
            <AccordionTrigger className="hover:bg-neutral-100 p-5">
              {name}
            </AccordionTrigger>
            <AccordionContent className="ml-4">
              <Accordion type="multiple" className="w-full">
                {weeks.map((week: any, weekIdx: number) => (
                  <AccordionItem value={`item-${weekIdx}`} key={weekIdx}>
                    <AccordionTrigger
                      className="hover:bg-neutral-100 p-5"
                      onClick={() => console.log(week)}
                    >
                      Week {weekIdx + 1}
                    </AccordionTrigger>
                    <AccordionContent className="ml-4">
                      <Accordion type="multiple" className="w-full">
                        {week.days?.map((day: Day, dayIdx: number) => (
                          <AccordionItem value={`item-${dayIdx}`} key={dayIdx}>
                            <AccordionTrigger
                              className="hover:bg-neutral-100 p-5"
                              onClick={() => console.log(day)}
                            >
                              Day {dayIdx + 1}
                            </AccordionTrigger>
                            <AccordionContent>
                              {day.exercises.map(
                                (props: ExerciseT, idx: number) => (
                                  <Fragment key={idx}>
                                    <SingleExercise {...props} />
                                  </Fragment>
                                )
                              )}
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
