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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
export function CreateTemplateDrawer({
  template,
  setTemplate,
  date,
  setDate,
  onSubmitCreateTemplate,
}: any) {
  // UPDATE TEMPLATE HERE ACTION

  const totalDays = Math.ceil(
    (Math.abs(date?.from?.getTime() - date?.to?.getTime()) /
      (1000 * 60 * 60 * 24)) |
      0
  );
  const completeWeeks = Math.floor(totalDays / 7);
  const remainingDays = Math.floor(totalDays % 7);
  const totalWeeks = remainingDays > 0 ? completeWeeks + 1 : completeWeeks;

  return (
    <form onSubmit={onSubmitCreateTemplate} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={template?.name}
            required
            placeholder="Powerlifting Program 3.0"
            minLength={1}
            onChange={(e) =>
              setTemplate({
                ...template,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="date">
            Select start and end date | Weeks: {totalWeeks}
          </Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </div>

      <Button type="submit">Create template</Button>
    </form>
  );
}
