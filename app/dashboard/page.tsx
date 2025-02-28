"use server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Template from "@/models/Templates";
import { TemplateT } from "../_types/types";
import Dashboard from "@/components/dashboard/Dashboard";
import connectDB from "@/config/database";
const page = async () => {
  await connectDB();
  const programs = await Template.find({}).lean();

  return <Dashboard programs={JSON.parse(JSON.stringify(programs))} />;
};
export default page;
