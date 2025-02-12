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
import React, { Fragment } from "react";
import connectDB from "@/config/database";
import User from "@/models/User";
const page = async () => {
  await connectDB();
  const user = await User.find({}).lean();
  console.log(user);
  const templates = [
    "PowerBuilding Program 1.0",
    "Bodybuilding Program 2.0",
    "Powerlifting Program 3.0",
  ];
  return (
    <Table className="w-full md:max-w-xl m-auto">
      <TableCaption>A list of your templates</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left md:text-center">Name</TableHead>
          <TableHead className="text-left md:text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {templates.map((template, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="text-left md:text-left">
              <Button variant="link" className="md:text-lg">
                {template}
              </Button>
            </TableCell>
            <TableCell className="flex flex-col md:flex-row gap-2 justify-start md:justify-center">
              <Button variant="default">
                <Link href={`/dashboard/templates/${template}/`}>Edit</Link>
              </Button>
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default page;
