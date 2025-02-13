"use client";
import React, { Fragment, useState } from "react";
import fakedata from "@/json/data.json";
import Link from "next/link";
const page = () => {
  const [viewProgram, setViewProgram] = useState({});
  return (
    <div className="w-full m-auto flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <p>Currently active</p>
        {fakedata.map(
          ({ _id, name, active }) =>
            active == true && (
              <Fragment key={_id}>
                <Link
                  href={`/dashboard/programs/program`}
                  onClick={() => setViewProgram(_id)}
                  className="text-xl border p-3 w-full bg-green-100"
                >
                  {name}
                </Link>
              </Fragment>
            )
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p>Non active</p>
        {fakedata.map(
          ({ _id, name, active }) =>
            active == false && (
              <Fragment key={_id}>
                <Link
                  href={`/dashboard/programs/program`}
                  onClick={() => setViewProgram(_id)}
                  className="text-xl border p-3 w-full bg-red-100"
                >
                  {name}
                </Link>
              </Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default page;
