import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <div>
      <BreadcrumbDemo breadcrumb={["dashboard", "calculators", slug]} />
    </div>
  );
};

export default page;
