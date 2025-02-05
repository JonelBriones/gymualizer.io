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
import { Exercise } from "@/app/_types/types";
import { Minus, Plus } from "lucide-react";

export function CreateTemplateCard({
  setReadyToSave,
  templateForm,
  setTemplateForm,
  programName,
  programDuration,
  setProgramName,
  setProgramDuration,
}: any) {
  const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (templateForm.name == "") {
      setTemplateForm({ ...templateForm, name: programName });
    } else if (templateForm.totalWeeks == 0) {
      setTemplateForm({
        ...templateForm,
        totalWeeks: programDuration,
      });
      setReadyToSave(true);
    }
  };
  const title = `${
    !templateForm.name ? "Program Name" : "Duration of Program"
  }`;
  const description = `${
    !templateForm.name
      ? "Add a name for this program"
      : "How many weeks is the program?"
  }`;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitCreateTemplate}>
          {templateForm.name}
          {templateForm.totalWeeks}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {templateForm.name && templateForm.totalWeeks ? (
                <div>
                  <h4 className="text-xl">{templateForm.name}</h4>
                  <h4 className="text-xl">{templateForm.totalWeeks}</h4>
                </div>
              ) : templateForm.name == "" ? (
                <>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={programName}
                    placeholder="Name of your exercise"
                    onChange={(e) => setProgramName(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => setProgramDuration(programDuration - 1)}
                        disabled={programDuration <= 1}
                      >
                        <Minus />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-7xl font-bold tracking-tighter">
                          {programDuration}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          TOTAL WEEKS
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => setProgramDuration(programDuration + 1)}
                        disabled={programDuration >= 52}
                      >
                        <Plus />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="submit">Save</Button>
            <Button>Cancel</Button>
          </div>
          {/* WEEKS */}
        </form>
      </CardContent>
    </Card>
  );
}
