import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_SIDE = 32;

const Arrow: React.FC<SvgProps> = ({ color, dimensions }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_SIDE,
    ORIGINAL_SIDE
  );
  return (
    <svg
      width={getWidth(dimensions)}
      height={getHeight(dimensions)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66669 16H25.3334M25.3334 16L16 6.6665M25.3334 16L16 25.3332"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
