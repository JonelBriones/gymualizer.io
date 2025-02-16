import Dashboard from "@/components/dashboard/Dashboard";
import Programs from "@/components/dashboard/Programs";

import Template from "@/models/Templates";
import React from "react";

const page = async () => {
  const programs = await Template.find({}).lean();
  return <Programs programs={JSON.parse(JSON.stringify(programs))} />;
};

export default page;
