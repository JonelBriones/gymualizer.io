"use client";
import React, { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "./DatePickerWithRangeDemo";

export function CreateTemplateCard({
  setReadyToSave,
  templateForm,
  setTemplateForm,
  programName,
  programDuration,
  setProgramName,
  date,
  setDate,
}: any) {
  const onSubmitCreateTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowQuestion(showQuestion + 1);
    if (templateForm?.name == "") {
      setTemplateForm({ ...templateForm, name: programName });
    } else if (templateForm.totalWeeks == 0) {
      setTemplateForm({
        ...templateForm,
        totalWeeks: programDuration,
      });
      setReadyToSave(true);
    }
  };

  const questions = [
    {
      question: "What would you to name this program?",
      answer: "",
    },
    {
      question: "Pick a start date.",
      answer: "",
    },
    {
      question: "Pick a end date.",
      answer: "",
    },
  ];
  const [showQuestion, setShowQuestion] = useState(0);

  useEffect(() => {}, [showQuestion]);
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{questions[showQuestion].question}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitCreateTemplate}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {showQuestion == 0 && (
                <>
                  <Label htmlFor="name">Program name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={programName}
                    placeholder="Program name"
                    onChange={(e) => setProgramName(e.target.value)}
                  />
                </>
              )}
              {showQuestion == 1 && (
                <>
                  <div className="w-fit">
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="submit">Save</Button>
            <Button type="button" onClick={() => setReadyToSave(true)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
