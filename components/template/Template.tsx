"use client";
import React, { useReducer } from "react";
import fakedata from "@/data.json";
import SingleExercise from "./SingleExercise";
import { FullWorkoutTemplate } from "../shadcn/FullWorkoutTemplate";

const Template = () => {
  return (
    <div>
      <FullWorkoutTemplate />
    </div>
  );
};

export default Template;
