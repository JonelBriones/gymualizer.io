"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../shadcn/DatePickerWithRangeDemo";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { TemplateFormSchema, TemplateFormSchemaType } from "@/app/_ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function TemplateForm({
  date,
  setDate,
  onSubmitCreateTemplate,
  totalWeeks,
}: any) {
  const templateForm = useForm<TemplateFormSchemaType>({
    resolver: zodResolver(TemplateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...templateForm}>
      <form onSubmit={templateForm.handleSubmit(onSubmitCreateTemplate)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={templateForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Powerlifting Program 3.0"
                    id="name"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <FormLabel htmlFor="date">
              Select start and end date | Weeks: {totalWeeks}
            </FormLabel>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <Button type="submit">Create template</Button>
        </div>
      </form>
    </Form>
  );
}
