"use server";
import Program from "@/components/programs/Program";
import connectDB from "@/config/database";
import Template from "@/models/Templates";
import mongoose from "mongoose";
// import { useParams } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  //   const params = useParams<{ id: string }>();
  const id = (await params).id;
  console.log("lOGGIN");
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div>Could not find program...</div>;
  }

  const program = await Template.findById(id);

  return (
    <div>
      <Program programData={JSON.parse(JSON.stringify(program))} />
    </div>
  );
};

export default page;
