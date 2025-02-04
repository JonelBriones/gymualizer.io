import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    // <Select>
    //   <SelectTrigger className="w-[180px]">
    //     <SelectValue placeholder="Number of sets" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectGroup>
    //       <SelectLabel>Sets</SelectLabel>
    //       {Array(10)
    //         .fill("")
    //         .map((_, idx) => (
    //           <SelectItem value={idx} key={idx}>
    //             {idx}
    //           </SelectItem>
    //         ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
    <Select>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="#" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sets</SelectLabel>
          {Array(10)
            .fill("")
            .map((_, idx) => (
              <SelectItem value={idx} key={idx}>
                {idx}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
