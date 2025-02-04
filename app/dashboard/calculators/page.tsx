import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadcrumbDemo breadcrumb={["dashboard", "calculators"]} />
      <h1>Calculators</h1>
    </div>
  );
};

export default page;
