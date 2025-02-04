import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import Template from "@/components/template/Template";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadcrumbDemo breadcrumb={["dashboard", "templates"]} />
      <Template />
    </div>
  );
};

export default page;
