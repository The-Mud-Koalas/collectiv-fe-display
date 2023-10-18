import React, { useRef, useEffect } from "react";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";
import { motion, animate } from "framer-motion";

interface Props {
  currVal: number;
  target: number;
  unit: string;
}

const GoalMeter = ({ currVal, target, unit }: Props) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const percentage = ((currVal / target) * 100).toFixed(1);

  useEffect(() => {
    if (!counterRef.current) return;

    const node = counterRef.current;
    const controls = animate(0, Math.min(parseFloat(percentage), 100), {
      ease: "backOut",
      duration: 2,
      onUpdate(value) {
        node.textContent = `${value.toFixed(1)}%`;
      },
    });

    return () => controls.stop();
  }, [currVal, target]);

  return (
    <div className={cn("w-full flex flex-col gap-2", inter.className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 lg:text-base text-sm">Current Raised</p>
          <p className="font-semibold lg:text-base text-sm">
            {currVal} {unit}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-gray-500 lg:text-base text-sm">Remaining</p>
          <p className="font-semibold lg:text-base text-sm">
            {Math.max(target - currVal, 0)} {unit}
          </p>
        </div>
      </div>
      <div className="w-full h-8 border-[2px] border-primary-700 rounded-2xl">
        <motion.div
          style={{ minWidth: "2rem", maxWidth: "100%" }}
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ width: { duration: 2, ease: "circOut" } }}
          className="h-full rounded-2xl bg-primary-400"
        />
      </div>
      <div>
        <p className="text-xl lg:text-3xl font-bold" ref={counterRef} />
      </div>
    </div>
  );
};

export default GoalMeter;
