import SelectOptions from "@/components/SelectOptions";
import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import React, { useEffect, useState } from "react";
import fakedata from "@/json/data.json";
import Program from "@/components/programs/Program";
// { params }: { params: Promise<{ idx: string }> }
const page = () => {
  //  fetch workout by id
  // const { idx } = await params;

  return <Program />;
};

export default page;
