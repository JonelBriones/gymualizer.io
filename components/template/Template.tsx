"use client";
import React from "react";
import { FullWorkoutTemplate } from "../shadcn/FullWorkoutTemplate";

import Link from "next/link";
import { Button } from "../ui/button";

const Template = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center md:justify-end gap-2">
        <Button variant={"link"}>
          <Link href="/dashboard/templates/create">Create</Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <FullWorkoutTemplate />
      </div>
    </div>
  );
};

export default Template;
