import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import LinkItems from "../cards/LinkItems";

const Navigation = () => {
  const components = [
    {
      title: "Macros",
      href: "/dashboard/calculators/macros",
      description: "Track your macros.",
    },
    {
      title: "Weight",
      href: "/dashboard/calculators/weights",
      description: "Quick weight calculator",
    },
    {
      title: "RPE/RIR",
      href: "/dashboard/calculators/rpe&rir",
      description: "Convert RPE/RIR weight",
    },
    {
      title: "1REP",
      href: "/dashboard/calculators/1rep",
      description: "Convert 1 REP max",
    },
    {
      title: "AMRAP",
      href: "/dashboard/calculators/amrap",
      description: "Convert AMRAP",
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Links</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <LinkItems href="/dashboard/program" title="Programs">
                View all programs.
              </LinkItems>
              <LinkItems href="/dashboard/create" title="New Program">
                Create a new program.
              </LinkItems>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Calculators</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {components.map((component) => (
                <LinkItems
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </LinkItems>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
