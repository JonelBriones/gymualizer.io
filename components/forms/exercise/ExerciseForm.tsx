"use client";
import React, { FormEvent, Fragment, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { ExerciseT, TemplateT } from "@/app/_types/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ExerciseFormSchema, ExerciseFormSchemaType } from "@/app/_ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
interface Params {
  program: TemplateT | null;
  onSubmitCreateExercise: any;
}
const ExerciseForm = ({ onSubmitCreateExercise, program }: Params) => {
  const exerciseForm = useForm<ExerciseFormSchemaType>({
    resolver: zodResolver(ExerciseFormSchema),
    defaultValues: {
      name: "",
      loadType: "weight",
      sets: "4",
      reps: "5",
      percentageLoad: "100",
      rpeLoad: "10",
      weightLoad: "0",
      percentageMax: "100",
      rpeMax: "10",
      weightMax: "0",
      unit: "lbs",
      notes: "",
    },
    mode: "onChange",
  });

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = exerciseForm;

  const loadType = watch("loadType");

  useEffect(() => {
    console.log("after submitting");
    if (isSubmitSuccessful) {
      reset({
        name: "",
        loadType: "weight",
        notes: "",
      });
      console.log("resetting fields");
    }
  }, [isSubmitSuccessful]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const searchExercises = [
    "bench",
    "squats",
    "deadlifts",
    "bicep curls",
    "tempo bench",
  ];
  return (
    <Form {...exerciseForm}>
      <form onSubmit={handleSubmit(onSubmitCreateExercise)}>
        <div className="grid items-center gap-4 ">
          {/* <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {" "}
                      {field.value
                        ? searchExercises.find(
                            (exercise) => exercise === field.value
                          )
                        : "Select language"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {searchExercises.map((exercise) => (
                            <CommandItem
                              {...field}
                              key={exercise}
                              value={exercise}
                              onSelect={() => {
                                exerciseForm.setValue("name", exercise);
                              }}
                            >
                             
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value === exercise
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          /> */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="name">Exercise Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Name of your exercise"
                  {...field}
                />
              </FormItem>
            )}
          />

          <div className="flex gap-2 w-full ">
            <FormField
              control={control}
              name="unit"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5 flex-1">
                  <FormLabel htmlFor="unit">Unit</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              defaultValue="weight"
              name="loadType"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5 flex-1">
                  <FormLabel htmlFor="reps">Load Type</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="loadType">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="weight">Weight</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="rpe">RPE</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={control}
              name="sets"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5 flex-1">
                  <FormLabel htmlFor="sets">Sets</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="sets">
                      <SelectValue placeholder="Select">
                        {field.value !== undefined ? field.value : "Select"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {Array(21)
                        .fill(null)
                        .map((_, idx) => (
                          <SelectItem key={idx} value={`${idx}`}>
                            {idx}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="reps"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5 flex-1">
                  <FormLabel htmlFor="reps">Reps</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="reps">
                      <SelectValue placeholder="Select">
                        {field.value !== undefined ? field.value : "Select"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {Array(31)
                        .fill(null)
                        .map((_, idx) => (
                          <SelectItem key={idx} value={`${idx}`}>
                            {idx}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {loadType == "weight" && (
              <>
                <FormField
                  name="weightLoad"
                  control={control}
                  defaultValue="0"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5 flex-1">
                      <FormLabel htmlFor="weightLoad">Weight</FormLabel>
                      <Input id="weightLoad" className="w-[70px]" {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  name="weightMax"
                  control={control}
                  defaultValue="0"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5 flex-1">
                      <FormLabel htmlFor="weightMax">Weight</FormLabel>
                      <Input id="weightMax" className="w-[70px]" {...field} />
                    </FormItem>
                  )}
                />
              </>
            )}
            {loadType == "percentage" && (
              <>
                <FormField
                  control={control}
                  name="percentageLoad"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5 flex-1">
                      <FormLabel htmlFor="percentageLoad">Percent</FormLabel>

                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger id="percentageLoad">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {Array.from(
                            { length: Math.floor(101 / 2.5) + 1 },
                            (_, i) => 100 - i * 2.5
                          ).map(
                            (value) =>
                              value % 2.5 == 0 && (
                                <SelectItem key={value} value={`${value}`}>
                                  {value}%
                                </SelectItem>
                              )
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="percentageMax"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5 flex-1">
                      <FormLabel htmlFor="percentageMax">Percent</FormLabel>

                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger id="percentageMax">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {Array.from(
                            { length: Math.floor(101 / 2.5) + 1 },
                            (_, i) => 100 - i * 2.5
                          ).map(
                            (value) =>
                              value % 2.5 == 0 && (
                                <SelectItem key={value} value={`${value}`}>
                                  {value}%
                                </SelectItem>
                              )
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </>
            )}

            {loadType == "rpe" && (
              <>
                <FormField
                  control={control}
                  name="rpeLoad"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5 flex-1">
                      <FormLabel htmlFor="rpeLoad">RPE</FormLabel>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger id="rpeLoad">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            <SelectLabel>RPE</SelectLabel>
                            {Array.from({ length: 11 }, (_, i) => 11 - i).map(
                              (_, idx) => (
                                <SelectItem key={idx} value={`${idx}`}>
                                  {idx} RPE
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="rpeMax"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5 flex-1">
                      <FormLabel htmlFor="rpeMax">RPE</FormLabel>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger id="rpeMax">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            <SelectLabel>RPE</SelectLabel>
                            {Array.from({ length: 11 }, (_, i) => 11 - i).map(
                              (_, idx) => (
                                <SelectItem key={idx} value={`${idx}`}>
                                  {idx} RPE
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <FormField
            control={control}
            defaultValue=""
            name="notes"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5 flex-1">
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Input id="notes" placeholder="additional notes.." {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={program == null}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExerciseForm;
