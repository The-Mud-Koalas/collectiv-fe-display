import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_WIDTH = 32;
const ORIGINAL_HEIGHT = 32;

const EyeClosed: React.FC<SvgProps> = ({ color, dimensions }) => {
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
      <g clipPath="url(#clip0_36_1046)">
        <path
          d="M18.8266 18.8266C18.4604 19.2196 18.0188 19.5348 17.5282 19.7534C17.0375 19.972 16.5078 20.0896 15.9708 20.0991C15.4337 20.1086 14.9002 20.0098 14.4021 19.8086C13.9041 19.6074 13.4516 19.308 13.0718 18.9281C12.6919 18.5483 12.3925 18.0959 12.1913 17.5978C11.9901 17.0997 11.8913 16.5662 11.9008 16.0291C11.9103 15.4921 12.0279 14.9624 12.2465 14.4717C12.4651 13.9811 12.7803 13.5395 13.1733 13.1733M1.33331 1.33325L30.6666 30.6666M23.92 23.9199C21.6408 25.6573 18.8655 26.6197 16 26.6666C6.66665 26.6666 1.33331 15.9999 1.33331 15.9999C2.99183 12.9091 5.29216 10.2087 8.07998 8.07993L23.92 23.9199ZM13.2 5.65326C14.1178 5.43843 15.0574 5.33105 16 5.33326C25.3333 5.33326 30.6666 15.9999 30.6666 15.9999C29.8573 17.5141 28.8921 18.9396 27.7866 20.2533L13.2 5.65326Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_36_1046">
          <rect width={32} height={32} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EyeClosed;
