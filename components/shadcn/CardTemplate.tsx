"use client";
import * as React from "react";

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

export function CardTemplate() {
  const [loadType, setLoadType] = React.useState("Weight");
  console.log(Math.floor(100 / 2.5 + 1));
  return (
    <Card className="md:w-[350px]">
      <CardHeader>
        <CardTitle>Create Template</CardTitle>
        <CardDescription>
          Add exercise, sets, reps and description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Exercise Name</Label>
              <Input id="name" placeholder="Name of your exercise" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="reps">Load Type</Label>
              <Select
                defaultValue="Weight"
                onValueChange={(value) => setLoadType(value)}
              >
                <SelectTrigger id="reps">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Weight">Weight</SelectItem>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="RPE">RPE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col space-y-1.5 w-[100px]">
                <Label htmlFor="sets">Sets</Label>
                <Select>
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
              <div className="flex flex-col space-y-1.5 w-[100px]">
                <Label htmlFor="reps">Reps</Label>
                <Select>
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
                {loadType == "Weight" && (
                  <Input id="load" placeholder="0" max={1000} />
                )}
                {loadType == "Percentage" && (
                  <Select>
                    <SelectTrigger id="percentage">
                      <SelectValue placeholder="%" />
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
                {loadType == "RPE" && (
                  <Select onValueChange={(value) => setLoadType(value)}>
                    <SelectTrigger id="rpe">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {Array(11)
                        .fill("")
                        .map((_, idx) => (
                          <SelectItem key={idx} value={`${idx}`}>
                            {idx}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Notes..." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
