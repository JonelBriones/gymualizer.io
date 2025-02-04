"use client";
import React, { useReducer, useState } from "react";

import { FullWorkoutTemplate } from "../shadcn/FullWorkoutTemplate";
import { Toggle } from "../ui/toggle";
import { ToggleGroupItem, ToggleGroup } from "../ui/toggle-group";
import { Bold } from "lucide-react";
import { Card } from "../ui/card";
import { CardTemplate } from "../shadcn/CardTemplate";
import { SelectDemo } from "../shadcn/SelectDemo";

const Template = () => {
  const [toggleTo, setToggleTo] = useState("view");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center md:justify-end gap-2">
        <ToggleGroup
          type="single"
          defaultValue={"view"}
          onValueChange={(value) => setToggleTo(value)}
        >
          <ToggleGroupItem value="new">New Template</ToggleGroupItem>
          <ToggleGroupItem value="view">View Templates</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="">
        {toggleTo == "view" ? <FullWorkoutTemplate /> : <CardTemplate />}
      </div>
    </div>
  );
};

export default Template;
