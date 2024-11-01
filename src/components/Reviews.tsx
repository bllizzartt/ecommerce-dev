"use client";

import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { div } from "framer-motion/client";
import { cn } from "@/lib/utils";

// all uppercase so we know it is a constant or better said, it is not meant to be changed throughout the program
const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/1.jpg",
  "/testimonials/1.jpg",
  "/testimonials/1.jpg",
  "/testimonials/1.jpg",
  "/testimonials/1.jpg",
];
// Columns/Rows/Of strings (This is TypeScript generics)
function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  //   Splitting Array into certain number of parts
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

// most confusing component
function ReviewColum({
  reviews,
  className,
  reviewClassname,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassname?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if(!columnRef.current) return
    // This takes a callback function
     const resizeObserver = new window.ResizeObserver(() => {
        setColumnHeight(columnRef.current?.offsetHeight ?? 0)
     })

     resizeObserver.observe(columnRef.current)

     return () => {
        resizeObserver.disconnect()
     }
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marque-duration": duration } as React.CSSProperties}
    ></div>
  );
}

// this code is for the animation of the screen and making sure the animation doesnt start until the suer sees it in the viewport
function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 
      items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 
      lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColum />
        </>
      ) : null}
    </div>
  );
}

export function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        arai-dden="true"
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />

      <ReviewGrid />
    </MaxWidthWrapper>
  );
}
