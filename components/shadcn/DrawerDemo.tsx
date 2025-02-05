"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

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
const defaultForm = {
  name: "",
  totalWeeks: 0,
};
export function DrawerDemo({ text, numberOfWeeks, setNumberOfWeeks }: any) {
  const [readyToSave, setReadyToSave] = useState(false);
  const [templateForm, setTemplateForm] = useState<any>(defaultForm);
  const [programName, setProgramName] = useState("");
  const [programDuration, setProgramDuration] = useState(0);
  const onDrawerClose = () => {
    setProgramName("");
    setProgramDuration(0);
    setReadyToSave(false);
    setTimeout(() => {
      setTemplateForm(defaultForm);
    }, 2000);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">{text}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {readyToSave ? (
                <span className="flex flex-col">
                  <span className="text-4xl">{templateForm.name}</span>
                  <span className="text-4xl">
                    {templateForm.totalWeeks} week cycle
                  </span>
                </span>
              ) : (
                "Creating Template"
              )}
            </DrawerTitle>
            <DrawerDescription>
              {readyToSave ? "Is this correct?" : "Update the following fields"}
            </DrawerDescription>
          </DrawerHeader>

          {readyToSave ? (
            <DrawerFooter className="">
              <div className="flex w-full gap-2">
                <DrawerClose asChild>
                  <Button onClick={onDrawerClose} className="flex-1">
                    Save
                  </Button>
                </DrawerClose>
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
          ) : (
            <CreateTemplateCard
              numberOfWeeks={numberOfWeeks}
              setNumberOfWeeks={setNumberOfWeeks}
              readyToSave={readyToSave}
              setReadyToSave={setReadyToSave}
              programName={programName}
              setProgramName={setProgramName}
              setProgramDuration={setProgramDuration}
              templateForm={templateForm}
              programDuration={programDuration}
              setTemplateForm={setTemplateForm}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
