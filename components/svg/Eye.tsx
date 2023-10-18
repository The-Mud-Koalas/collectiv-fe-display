import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_WIDTH = 32;
const ORIGINAL_HEIGHT = 32;

const Eye: React.FC<SvgProps> = ({ color, dimensions }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_WIDTH,
    ORIGINAL_HEIGHT
  );
  return (
    <svg
      width={getWidth(dimensions) || ORIGINAL_WIDTH}
      height={getHeight(dimensions) || ORIGINAL_HEIGHT}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33337 16.0002C1.33337 16.0002 6.66671 5.3335 16 5.3335C25.3334 5.3335 30.6667 16.0002 30.6667 16.0002C30.6667 16.0002 25.3334 26.6668 16 26.6668C6.66671 26.6668 1.33337 16.0002 1.33337 16.0002Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 20C18.2092 20 20 18.2091 20 16C20 13.7909 18.2092 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Eye;
