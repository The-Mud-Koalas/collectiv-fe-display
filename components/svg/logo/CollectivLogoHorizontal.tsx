import React from "react";
import { garamond } from "@/utils/constants/fonts";
import CollectivLogo from "./CollectivLogo";
import { COLORS } from "@/utils/constants/colors";



type Size = "sm" | "md" | "lg" | "xl";

interface Props {
    size: Size
    colorCode: string
}

const fontSizeMap: Record<Size, string> = {
    xl: "text-7xl",
    lg: "text-5xl",
    md: "text-3xl",
    sm: "text-xl"
}

const dimensionSizeMap: Record<Size, number> = {
  sm: 18,
  md: 28,
  lg: 46,
  xl: 70
}


const CollectivLogoHorizontal: React.FC<Props> = ({ size, colorCode }) => {
  const [colorVariant, colorWeight] = colorCode.split("-");
  const colorMap = COLORS[colorVariant as keyof typeof COLORS];
  return (
    <div className="flex items-center gap-4">
      <h1 className={`${garamond.className} ${fontSizeMap[size]} font-bold text-${colorVariant}-${colorWeight}`}>Collectiv</h1>
      <CollectivLogo dimensions={{height: dimensionSizeMap[size]}} color={colorMap?.[colorWeight as keyof typeof colorMap] ?? "black"}/>
    </div>
  );
};

export default CollectivLogoHorizontal;
