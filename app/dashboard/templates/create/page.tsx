import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import TemplateContainer from "@/components/template/TemplateContainer";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadcrumbDemo breadcrumb={["dashboard", "templates", "create"]} />
      <TemplateContainer />
    </div>
  );
};

export default page;
