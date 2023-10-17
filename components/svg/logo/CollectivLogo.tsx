import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_WIDTH = 52;
const ORIGINAL_HEIGHT = 51;

const CollectivLogo: React.FC<SvgProps> = ({ dimensions, color }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_WIDTH,
    ORIGINAL_HEIGHT
  );

  return (
    <svg
      width={getWidth(dimensions) || ORIGINAL_WIDTH}
      height={getHeight(dimensions) || ORIGINAL_HEIGHT}
      viewBox="0 0 52 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.1152 25.9543L17.346 28.6816L1 17.7725L4.84612 13.2271L23.1152 25.9543Z"
        fill={color}
        stroke={color}
        strokeWidth="0.947293"
      />
      <path
        d="M35.6149 24.1365L29.8457 26.8638L46.1917 38.6819L50.9993 35.0456L35.6149 24.1365Z"
        fill={color}
        stroke={color}
        strokeWidth="0.947293"
      />
      <path
        d="M34.6526 35.9546L27.9219 30.5001V50.5H34.6526V35.9546Z"
        fill={color}
        stroke={color}
        strokeWidth="0.947293"
      />
      <path
        d="M24.0764 35.9541V29.5905L4.8457 39.5078L7.73029 44.9624L24.0764 35.9541Z"
        fill={color}
        stroke={color}
        strokeWidth="0.947293"
      />
      <path
        d="M29.8457 22.3177V15.045L47.1532 6.43257L50.0378 11.8871L29.8457 22.3177Z"
        fill={color}
        stroke={color}
        strokeWidth="0.947293"
      />
      <path
        d="M20.2305 18.6817V0.5H25.9996V23.2272L20.2305 18.6817Z"
        fill={color}
        stroke={color}
        strokeWidth="0.947293"
      />
    </svg>
  );
};

export default CollectivLogo;
