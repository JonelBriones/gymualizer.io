import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Fragment } from "react";

const page = () => {
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
            <TableCell className="text-left md:text-center">
              <Button variant="link" className="md:text-lg">
                <Link href={`/dashboard/templates/${template}/`}>
                  {template}
                </Link>
              </Button>
            </TableCell>
            <TableCell className="flex flex-col md:flex-row gap-2 justify-start md:justify-center">
              <Button variant="default">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default page;
