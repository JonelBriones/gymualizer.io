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
import { ExerciseT } from "@/app/_types/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ExerciseFormSchema, ExerciseFormSchemaType } from "@/app/_ZodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface Params {
  onSubmitCreateExercise: any;
}
const ExerciseForm = ({ onSubmitCreateExercise }: Params) => {
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
      unit: "lbs",
      notes: "",
    },
  });

  const {
    control,
    watch,
    reset,
    resetField,
    handleSubmit,
    formState: { isSubmitSuccessful, isSubmitted },
  } = exerciseForm;

  const loadType = watch("loadType");

  useEffect(() => {
    console.log("after submitting");
    if (isSubmitSuccessful) {
      console.log("resetting fields");
      reset({
        name: "",
        notes: "",
      });
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    console.log("success?", isSubmitSuccessful);
    console.log("submitted?", isSubmitted);
  }, []);

  return (
    <Form {...exerciseForm}>
      <form onSubmit={handleSubmit(onSubmitCreateExercise)}>
        <div className="grid items-center gap-4">
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

            {/* RENDER ON LOAD TYPE */}

            {loadType == "weight" && (
              <FormField
                control={control}
                name="weightLoad"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5 flex-1">
                    <FormLabel htmlFor="weightLoad">Weight</FormLabel>
                    <Input
                      id="weightLoad"
                      placeholder="0"
                      className="w-[70px]"
                      {...field}
                    />
                  </FormItem>
                )}
              />
            )}
            {loadType == "percentage" && (
              <FormField
                control={control}
                name="percentageLoad"
                rules={{ required: true }}
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
            )}

            {loadType == "rpe" && (
              <FormField
                control={control}
                name="rpeLoad"
                rules={{ required: true }}
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
          <Button
            type="submit"
            onClick={() => {
              reset({
                name: "",
                notes: "",
              });
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExerciseForm;
