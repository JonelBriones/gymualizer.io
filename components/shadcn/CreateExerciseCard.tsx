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
  sets: "",
  reps: "",
  load: "",
  unit: "lbs",
  notes: "",
};

export function CreateExerciseCard({ exercises, setExercises }: any) {
  const [exerciseForm, setExerciseForm] = useState<ExerciseT>(defaultForm);
  const onSubmitCreateExercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExercises([...exercises, exerciseForm]);
    setExerciseForm(defaultForm);
  };
  useEffect(() => {
    console.log(exercises);
  }, [exercises]);
  return (
    <Card className="md:w-[350px]">
      <CardHeader>
        <CardTitle>Create Exercise</CardTitle>
        <CardDescription>
          Add exercise, sets, reps, load and notes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitCreateExercise}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Exercise Name</Label>
              <Input
                id="name"
                name="name"
                value={exerciseForm.name}
                placeholder="Name of your exercise"
                onChange={(e) =>
                  setExerciseForm({ ...exerciseForm, name: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
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
              <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col space-y-1.5 w-[100px]">
                <Label htmlFor="load">Load</Label>
                {exerciseForm.loadType == "weight" && (
                  <Input
                    id="load"
                    placeholder="0"
                    name="load"
                    max={1000}
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
            <Button
              variant="outline"
              onClick={() => setExerciseForm(defaultForm)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
