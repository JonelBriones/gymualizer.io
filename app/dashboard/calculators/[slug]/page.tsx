import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return <div>PAGE:{slug}</div>;
};

export default page;
