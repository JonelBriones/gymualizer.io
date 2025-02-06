"use client";
import React, { Fragment, useReducer, useState } from "react";
import { FullWorkoutTemplate } from "../shadcn/FullWorkoutTemplate";
import { ToggleGroupItem, ToggleGroup } from "../ui/toggle-group";
import { CreateExerciseCard } from "../shadcn/CreateExerciseCard";
import { Exercise } from "@/app/_types/types";
import SingleExercise from "./SingleExercise";
import { CreateTemplateCard } from "../shadcn/CreateTemplateCard";
import Link from "next/link";

const Template = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center md:justify-end gap-2">
        <Link href="/dashboard/templates/create">Create</Link>
      </div>
      <div className="flex gap-2">
        <FullWorkoutTemplate />
      </div>
    </div>
  );
};

export default Template;
