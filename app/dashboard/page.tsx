import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";
import { CalendarDemo } from "@/components/shadcn/CalendarDemo";
import NavigationMenu from "@/components/shadcn/NavigationMenu";

import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center ">
        <NavigationMenu />
      </div>
      <CalendarDemo />
    </div>
  );
};

export default page;
