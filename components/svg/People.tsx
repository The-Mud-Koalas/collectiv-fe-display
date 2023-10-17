import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_WIDTH = 18;
const ORIGINAL_HEIGHT = 20;

const People: React.FC<SvgProps> = ({ color, dimensions }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_WIDTH,
    ORIGINAL_HEIGHT
  );
  return (
    <svg
      width={getWidth(dimensions)}
      height={getHeight(dimensions)}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default People;
