import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import LinkItems from "../cards/LinkItems";

const Navigation = () => {
  const components = [
    {
      title: "Macros",
      href: "/dashboard/calculators/macros",
      description: "A modal calculator for macro tracking.",
    },
    {
      title: "Weight",
      href: "/dashboard/calculators/weights",
      description: "A modal calculator for weights tracking.",
    },
    {
      title: "RPE/RIR",
      href: "/dashboard/calculators/rpe&rir",
      description: "A modal calculator for RPE/RIR.",
    },
    {
      title: "1REP",
      href: "/dashboard/calculators/1rep",
      description: "A modal calculator for 1 REP max test.",
    },
    {
      title: "AMRAP",
      href: "/dashboard/calculators/amrap",
      description: "A modal calculator for AMRAP test.",
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <LinkItems href="/dashboard" title="Dashboard">
                Quick view current and future workouts, lifting stats, etc...
              </LinkItems>
              <LinkItems href="/dashboard/templates" title="Templates">
                Create, edit or delete workout templates here.
              </LinkItems>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Calculators</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
