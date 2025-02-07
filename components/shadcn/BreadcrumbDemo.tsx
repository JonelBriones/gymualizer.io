"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";

export function BreadcrumbDemo() {
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

  return (
    pathname !== "/" && (
      <Breadcrumb>
        <BreadcrumbList>
          {pathnameArray.map((route: string, idx: number) => (
            <Fragment key={route}>
              {idx == pathnameArray.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {" "}
                    {route[0].toUpperCase() + route.slice(1, route.length)}
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
