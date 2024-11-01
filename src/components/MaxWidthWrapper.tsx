import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  // ? because optional to pass we dont have to but if we do it is a string
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20",
        className
      )}>
    {children}
    </div>
  );
};

export default MaxWidthWrapper;
