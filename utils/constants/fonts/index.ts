import { Inter, Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const interItalics = Inter_Tight({ subsets: ["latin"], style: ["italic"] })
const garamond = localFont({
  src: [
    {
      path: "./AppleGaramond.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AppleGaramond-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./AppleGaramond-Italic.ttf",
      weight: "400",
      style: "italic"
    },
    {
      path: "./AppleGaramond-BoldItalic.ttf",
      weight: "700",
      style: "italic"
    }
  ],
});

export { inter, interItalics, garamond }
