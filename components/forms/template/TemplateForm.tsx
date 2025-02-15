"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TemplateFormDatePicker } from "./TemplateFormDatePicker";
import { createProgramAction } from "@/app/_actions/exerciseActions/templateActions/createProgramAction";
import { useFormStatus } from "react-dom";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Errors = {
  [name: string]: string[];
};

const defaultDate = {
  from: new Date(),
  to: addDays(new Date(), 30),
};
export function TemplateForm({ program }: any) {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultDate);
  const { pending } = useFormStatus();

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
    console.log("total weeks", totalWeeks);
    console.log("date ran once");
  }, [date]);

  useEffect(() => {
    setDate(defaultDate);
  }, [program == null]);

  useEffect(() => {
    if (state?.errors) {
      setErrors(state?.errors as Errors);
    }
  }, [state]);

  return (
    <form
      action={createProgram}
      className="flex flex-col gap-4 w-full border rounded-md p-4"
    >
      <div className="flex flex-col gap-2">
        {state?.errors ? (
          <Label className="text-sm text-red-600">{errors["name"]}</Label>
        ) : (
          <Label htmlFor="name">Name</Label>
        )}
        <Input
          placeholder="Powerlifting Program 3.0"
          id="name"
          type="text"
          name="name"
        />
      </div>
      <div className="flex flex-col gap-2">
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
        <input type="number" hidden name="weeks" value={totalWeeks} readOnly />
        <TemplateFormDatePicker date={date} setDate={setDate} />
      </div>
      <Button type="submit" disabled={pending}>
        Create Program
      </Button>
    </form>
  );
}
