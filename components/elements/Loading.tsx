import { COLORS } from "@/utils/constants/colors";
import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BeatLoader color={COLORS.primary[800]}/>
    </div>
  );
};

export default Loading;
