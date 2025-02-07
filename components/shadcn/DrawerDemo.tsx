"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CreateTemplateCard } from "./CreateTemplateCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DatePickerWithRange } from "./DatePickerWithRangeDemo";

export function DrawerCreateTemplate({
  text,
  options,
  templateForm,
  setTemplateForm,
  date,
  setDate,
  setReadyToSave,
  onSubmitCreateTemplate,
  setShowQuestion,
  showQuestion,
  defaultTemplateForm,
}: any) {
  const onDrawerClose = () => {
    setReadyToSave(false);
    setTemplateForm(defaultTemplateForm);
    setShowQuestion(0);
  };

  const questions = ["Add a title.", "Pick a start and end date."];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">{text}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <Card className="h-[240px] flex flex-col justify-between">
            <DrawerHeader>
              <DrawerTitle>
                {showQuestion == 2 ? (
                  <span>{templateForm.name}</span>
                ) : (
                  <span>{questions[showQuestion]}</span>
                )}
              </DrawerTitle>
              <DrawerDescription>
                {showQuestion == 2 && (
                  <span className="flex flex-col text-lg">
                    <span>
                      <span className="flex flex-col">
                        Start date:{" "}
                        {date.from.toLocaleDateString("en-us", options)}
                      </span>
                      <span>
                        End date: {date.to.toLocaleDateString("en-us", options)}
                      </span>
                    </span>
                  </span>
                )}
              </DrawerDescription>
            </DrawerHeader>

            <CardContent>
              <form onSubmit={onSubmitCreateTemplate}>
                {showQuestion == 0 && (
                  <div className="flex justify-center">
                    <Label htmlFor="name"></Label>
                    <Input
                      id="name"
                      name="name"
                      value={templateForm.name}
                      required
                      minLength={1}
                      onChange={(e) =>
                        setTemplateForm({
                          ...templateForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                {showQuestion == 1 && (
                  <div className="flex justify-center">
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </div>
                )}

                <DrawerFooter className="">
                  <div className="flex w-full gap-2">
                    {showQuestion == 2 ? (
                      <DrawerClose asChild className="flex-1">
                        <Button type="submit">Save</Button>
                      </DrawerClose>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => {
                          if (templateForm.name == "") return;
                          setShowQuestion(showQuestion + 1);
                        }}
                        className="flex-1"
                      >
                        Save
                      </Button>
                    )}

                    <DrawerClose asChild>
                      <Button
                        variant="outline"
                        onClick={onDrawerClose}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
