"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TemplateFormDatePicker } from "./TemplateFormDatePicker";
import { createProgramAction } from "@/app/_actions/exerciseActions/templateActions/createProgramAction";
import { useFormStatus } from "react-dom";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

type Errors = {
  [name: string]: string[];
};

export function TemplateForm() {
  const { pending } = useFormStatus();

  const defaultDate = {
    from: new Date(),
    to: addDays(new Date(), 30),
  };
  const [date, setDate] = useState<DateRange | undefined>(defaultDate);
  const [totalWeeks, setTotalWeeks] = useState<number>(0);

  const [errors, setErrors] = useState<Errors>({} as Errors);

  const [state, createProgram] = useActionState(createProgramAction, null);

  useEffect(() => {
    const start = date?.from ? new Date(date?.from) : new Date();
    const end = date?.to ? new Date(date?.to) : new Date();

    const totalDays = Math.ceil(
      Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    const completeWeeks = Math.floor(totalDays / 7);
    const remainingDays = Math.floor(totalDays % 7);
    const totalWeeks = remainingDays > 0 ? completeWeeks + 1 : completeWeeks;

    setTotalWeeks(totalWeeks);
  }, [date]);

  useEffect(() => {
    if (state?.errors) {
      setErrors(state?.errors as Errors);
    }
  }, [state]);

  return (
    <form action={createProgram} className="flex flex-col gap-4">
      <div className="flex flex-col">
        {state?.errors ? (
          <label className="text-sm text-red-600">{errors["name"]}</label>
        ) : (
          <label htmlFor="name">Name</label>
        )}
        <input
          placeholder="Powerlifting Program 3.0"
          id="name"
          type="text"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="date">
          Select start and end date | Weeks: {totalWeeks}
        </label>
        <input
          type="number"
          hidden
          name="startDate"
          defaultValue={date?.from ? date?.from?.getTime() : ""}
        />
        <input
          type="number"
          hidden
          name="endDate"
          defaultValue={date?.to ? date?.to?.getTime() : ""}
        />
        <input type="number" hidden name="weeks" defaultValue={totalWeeks} />
        <TemplateFormDatePicker date={date} setDate={setDate} />
      </div>
      <Button type="submit" disabled={pending}>
        Create template
      </Button>
    </form>
  );
}
