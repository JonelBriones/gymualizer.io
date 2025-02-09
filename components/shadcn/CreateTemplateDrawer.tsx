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

export function CreateTemplateDrawer({
  text,
  options,
  templateForm,
  setTemplate,
  date,
  setDate,
  onDrawerClose,
  onSubmitCreateTemplate,
  setShowQuestion,
  showQuestion,
}: any) {
  const questions = ["Name this program.", "Pick a start and end date."];

  // UPDATE TEMPLATE HERE ACTION

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          {text}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <Card className="h-[240px] flex flex-col justify-between">
            <DrawerHeader>
              <DrawerTitle>
                {showQuestion == 2 ? (
                  <span className="text-2xl">{templateForm.name}</span>
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
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={templateForm.name}
                      required
                      placeholder="Powerlifting Program 3.0"
                      minLength={1}
                      onChange={(e) =>
                        setTemplate({
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
