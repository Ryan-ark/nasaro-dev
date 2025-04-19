import { cn } from "@/lib/utils";
import React from "react";

export const Gradient = () => {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute top-0 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-gradient from-[#3C0473] to-transparent blur-[100px] max-lg:opacity-70"
        )}
      />
    </>
  );
}; 