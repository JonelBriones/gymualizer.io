"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { TemplateFormDatePicker } from "./TemplateFormDatePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { TemplateFormSchema, TemplateFormSchemaType } from "@/app/_ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProgramAction } from "@/app/_actions/exerciseActions/templateActions/createProgramAction";
import { useFormStatus } from "react-dom";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Label } from "@radix-ui/react-select";
import { Week } from "@/app/_types/types";

export function TemplateForm({}: // date,
// setDate,
// onSubmitCreateTemplate,
// totalWeeks,
any) {
  const templateForm = useForm<TemplateFormSchemaType>({
    resolver: zodResolver(TemplateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { pending } = useFormStatus();

  const initialState = {
    name: "",
  };
  const defaultDate = {
    from: new Date(),
    to: addDays(new Date(), 30),
  };
  const [date, setDate] = useState<DateRange | undefined>(defaultDate);
  const [totalWeeks, setTotalWeeks] = useState<number>(0);

  const [name, setProgramName] = useState("");

  const [state, createProgram] = useActionState(createProgramAction, null);
  const onSubmitCreateTemplate = (e: TemplateFormSchemaType) => {
    console.log(e);
    // setReadyToSave(true);
    // setShowQuestion(0);
    // setDate(defaultDate);

    // const setWeeks = Array.from({ length: totalWeeks }, () => ({
    //   days: Array(7)
    //     .fill(null)
    //     .map(() => ({
    //       exercises: [],
    //     })),
    // }));
    // setTemplate({
    //   ...template,
    //   name: e.name,
    //   startDate: date?.from ? new Date(date?.from) : new Date(),
    //   endDate: date?.to ? new Date(date?.to) : new Date(),
    //   weeks: setWeeks,
    // });
  };

  useEffect(() => {
    const start = date?.from ? new Date(date?.from) : new Date();
    const end = date?.to ? new Date(date?.to) : new Date();

    const totalDays = Math.ceil(
      Math.abs(start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    const completeWeeks = Math.floor(totalDays / 7);
    const remainingDays = Math.floor(totalDays % 7);
    const totalWeeks = remainingDays > 0 ? completeWeeks + 1 : completeWeeks;

    // setRemainingDay(remainingDays);
    const weeks = Array.from({ length: totalWeeks }, () => ({
      days: Array(7)
        .fill(null)
        .map(() => ({
          exercises: [],
        })),
    }));

    setTotalWeeks(totalWeeks);
    console.log(totalWeeks);
  }, [date]);

  // useEffect(() => {
  //   console.log("state", state);
  // }, [state]);
  // console.log(date?.from?.getTime());

  return (
    <form action={createProgram} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Name</label>
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
