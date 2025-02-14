"use server";
import TemplatePage from "@/components/forms/template/TemplatePage";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import React from "react";

const page = async () => {
  await connectDB();
  const templates = await Template.find({}).lean();
  const templatesjson = JSON.parse(JSON.stringify(templates));
  return <TemplatePage templatesData={templatesjson} />;
};

export default page;
