import * as React from "react";

import { cn } from "@/lib/utils";

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn("line-b px-4 py-20 sm:py-28 md:py-32", className)}
      {...props}
    />
  );
}

export { Section };
