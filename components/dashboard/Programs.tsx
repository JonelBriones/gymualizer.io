"use client";
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
import React from "react";

import { TemplateT } from "@/app/_types/types";
const Programs = ({ programs }: { programs: TemplateT[] }) => {
  return (
    <Table className="md:max-w-xl m-auto">
      <TableCaption>A list of your templates</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left md:text-center">Name</TableHead>
          <TableHead className="text-right md:text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {programs.map((program, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="text-left md:text-center">
              <Button variant="link" className="md:text-lg">
                <Link href={`/dashboard/program/${program._id}/`}>
                  {program.name}
                </Link>
              </Button>
            </TableCell>
            <TableCell className="flex flex-col md:flex-row gap-2 justify-start md:justify-center">
              <Button variant="default" disabled>
                <Link href={`/dashboard/templates/${program._id}/`}>Edit</Link>
              </Button>
              <Button variant="destructive" disabled>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Programs;
