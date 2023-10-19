import React from "react";
import cn from "clsx";

const ChartContainer = ({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={cn(
        "border-[2px] grow 2xl:w-[600px] w-[min(100%,_500px)] min-h-[400px] rounded-lg border-primary-700 lg:h-fit flex flex-col items-center py-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ChartContainer;
