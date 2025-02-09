"use client";
import React, { FormEvent, Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Params {
  onSubmitCreateExercise: React.FormEventHandler<HTMLFormElement>;
  setExerciseForm: (exercise: ExerciseT) => void;
  defaultExerciseForm: ExerciseT;
  exerciseForm: ExerciseT;
}
const ExerciseForm = ({
  exerciseForm,
  onSubmitCreateExercise,
  setExerciseForm,
  defaultExerciseForm,
}: Params) => {
  return (
    <form onSubmit={onSubmitCreateExercise}>
      <div className="grid items-center gap-4">
        <div className="flex flex-col space-y-1.5">
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
        <div className="flex gap-2 w-full ">
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="unit">Unit</Label>
            <Select
              value={exerciseForm.unit}
              name="unit"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, unit: e })
              }
            >
              <SelectTrigger id="units">
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
              <SelectTrigger id="loadType">
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
          <div className="flex flex-col space-y-1.5 flex-1 ">
            <Label htmlFor="sets">Sets</Label>
            <Select
              value={exerciseForm.sets?.toString() ?? ""}
              name="sets"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, sets: parseInt(e) })
              }
            >
              <SelectTrigger id="sets">
                <SelectValue placeholder="Select" />
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
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="reps">Reps</Label>
            <Select
              value={exerciseForm.reps?.toString() ?? ""}
              name="reps"
              onValueChange={(e) =>
                setExerciseForm({ ...exerciseForm, reps: parseInt(e) })
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
          <div className="flex flex-col space-y-1.5 flex-1">
            {exerciseForm.loadType == "weight" && (
              <Fragment>
                <Label htmlFor="load">Weight</Label>
                <Input
                  id="load"
                  placeholder="0"
                  name="load"
                  max={1000}
                  value={exerciseForm.load}
                  className="w-[70px]"
                  onChange={(e) =>
                    setExerciseForm({ ...exerciseForm, load: e.target.value })
                  }
                />
              </Fragment>
            )}
            {exerciseForm.loadType == "percentage" && (
              <Fragment>
                <Label htmlFor="load">Percent</Label>

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
              </Fragment>
            )}

            {exerciseForm.loadType == "rpe" && (
              <Fragment>
                <Label htmlFor="load">RPE</Label>
                <Select
                  value={exerciseForm.load?.toString() ?? ""}
                  name="load"
                  onValueChange={(e) =>
                    setExerciseForm({ ...exerciseForm, load: e })
                  }
                >
                  <SelectTrigger id="rpe">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>RPE</SelectLabel>
                      {Array(11)
                        .fill("")
                        .map((_, idx) => (
                          <SelectItem key={idx} value={`${idx}`}>
                            {idx} RPE
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Fragment>
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
          onClick={() => setExerciseForm(defaultExerciseForm)}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ExerciseForm;
