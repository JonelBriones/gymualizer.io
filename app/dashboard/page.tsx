"use client";

import React, { Fragment } from "react";
import fakedata from "@/json/data.json";
import Link from "next/link";
const page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const today = new Date().getTime();
  const convertedDate = new Date(1738982166547).toLocaleDateString();
  console.log(fakedata);
  return (
    <div className="flex flex-col">
      <p>this is a summary of the programs</p>
      <Link href={"/dashboard/programs"} className="text-xl border p-3 w-full">
        Programs
      </Link>
    </div>
  );
};

export default page;
