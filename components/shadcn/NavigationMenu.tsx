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
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <LinkItems href="/dashboard" title="Dashboard">
                View of today and upcoming workouts, calendar view, check stats!
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
