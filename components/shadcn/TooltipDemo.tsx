import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipDemo({ notes }: any) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">notes</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{notes}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
