"use client";
import React, { useReducer } from "react";
import fakedata from "@/data.json";
import SingleExercise from "./SingleExercise";
import { FullWorkoutTemplate } from "../shadcn/FullWorkoutTemplate";

const Template = () => {
  return (
    <div>
      {/* Show all full templates */}
      <FullWorkoutTemplate />
    </div>
  );
};

export default Template;
