import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_SIDE = 32;

const Clock: React.FC<SvgProps> = ({ color, dimensions }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_SIDE,
    ORIGINAL_SIDE
  );
  return (
    <svg
      width={getWidth(dimensions)}
      height={getHeight(dimensions)}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5V11L15 13M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Clock;
