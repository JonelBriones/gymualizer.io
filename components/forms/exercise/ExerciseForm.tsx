"use client";
import React, { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExerciseT } from "@/app/_types/types";
const defaultForm = {
  name: "",
  loadType: "weight",
  sets: "0",
  reps: "0",
  load: "0",
  unit: "lbs",
  notes: "",
  week: "0",
  day: "0",
};
interface Params {
  onSubmitCreateExercise: any;
  exerciseForm: any;
  setExerciseForm: any;
}
const ExerciseForm = ({
  onSubmitCreateExercise,
  exerciseForm,
  setExerciseForm,
}: Params) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return (
    <form onSubmit={onSubmitCreateExercise}>
      <div className="grid w-full items-center gap-4">
        <div className="flex space-y-1.5">
          <Label htmlFor="name">Exercise Name</Label>
          <Input
            required
            id="name"
            name="name"
            value={exerciseForm.name}
            placeholder="Name of your exercise"
            onChange={(e) =>
              setExerciseForm({ ...exerciseForm, name: e.target.value })
            }
          />
        </div>
        <div className="flex gap-2 flex-col max-w-[270px]">
          {/* <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="week">Week</Label>
            <Select
              required
              value={exerciseForm.week}
              name="week"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, week: e })
              }
            >
              <SelectTrigger id="reps">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Array(10)
                  .fill(null)
                  .map((_, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {idx + 1}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="day">Day</Label>
            <Select
              required
              value={exerciseForm.day}
              name="day"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, day: e })
              }
            >
              <SelectTrigger id="day">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {days.map((day, idx) => (
                  <SelectItem key={idx} value={idx.toString()}>
                    {day[0].toUpperCase() + day.slice(1, day.length)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="unit">Unit</Label>
            <Select
              value={exerciseForm.unit}
              name="unit"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, unit: e })
              }
            >
              <SelectTrigger id="reps">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="lbs">lbs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="reps">Load Type</Label>
            <Select
              value={exerciseForm.loadType}
              name="loadType"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, loadType: e })
              }
            >
              <SelectTrigger id="reps">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="rpe">RPE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col space-y-1.5 w-[100px]">
            <Label htmlFor="sets">Sets</Label>
            <Select
              value={exerciseForm.sets}
              name="sets"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, sets: e })
              }
            >
              <SelectTrigger id="sets">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Array(21)
                  .fill(null)
                  .map((_, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {idx}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5 w-[100px]">
            <Label htmlFor="reps">Reps</Label>
            <Select
              value={exerciseForm.reps}
              name="reps"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, reps: e })
              }
            >
              <SelectTrigger id="reps">
                <SelectValue placeholder="Select" />
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
          </div>
          {/* RENDER ON LOAD TYPE */}
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="load">Load</Label>
            {exerciseForm.loadType == "weight" && (
              <Input
                id="load"
                placeholder="0"
                name="load"
                max={1000}
                className="w-[70px]"
                onChange={(e) =>
                  setExerciseForm({ ...exerciseForm, load: e.target.value })
                }
              />
            )}
            {exerciseForm.loadType == "percentage" && (
              <Select
                value={exerciseForm.load}
                name="load"
                onValueChange={(e) =>
                  setExerciseForm({ ...exerciseForm, load: e })
                }
              >
                <SelectTrigger id="percentage">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array.from(
                    { length: Math.floor(101 / 2.5) + 1 },
                    (_, i) => i * 2.5
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
            )}
            {exerciseForm.loadType == "rpe" && (
              <Select
                value={exerciseForm.load}
                name="load"
                onValueChange={(e) =>
                  setExerciseForm({ ...exerciseForm, load: e })
                }
              >
                <SelectTrigger id="rpe">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array(11)
                    .fill("")
                    .map((_, idx) => (
                      <SelectItem key={idx} value={`${idx}`}>
                        {idx} RPE
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            name="notes"
            value={exerciseForm.notes}
            placeholder="additional notes.."
            onChange={(e) =>
              setExerciseForm({ ...exerciseForm, notes: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={() => setExerciseForm(defaultForm)}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ExerciseForm;
