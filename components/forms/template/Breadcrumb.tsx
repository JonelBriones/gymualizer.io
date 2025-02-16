"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import mongoose, {
  isObjectIdOrHexString,
  isValidObjectId,
  ObjectId,
  Types,
} from "mongoose";

import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";

export function BreadcrumbComponent() {
  const pathname = usePathname();

  let pathnameArray = pathname.split("/");
  pathnameArray.shift();

  const getBreadcrumbUrl = (idx: number) => {
    let string = "";
    for (let url of pathnameArray.slice(0, idx + 1)) {
      string += "/" + url;
    }
    return string;
  };
  const { id } = useParams() as { id: string };

  return (
    pathname !== "/" && (
      <Breadcrumb>
        <BreadcrumbList>
          {pathnameArray.map((route: string, idx: number) => (
            <Fragment key={idx}>
              {idx == pathnameArray.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {pathnameArray[1] == "program" &&
                    mongoose.Types.ObjectId.isValid(pathnameArray[2])
                      ? "View"
                      : route[0].toUpperCase() + route.slice(1, route.length)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={getBreadcrumbUrl(idx)}>
                      {route[0].toUpperCase() + route.slice(1, route.length)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
}
