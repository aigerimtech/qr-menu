import { Raleway } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700", "800"], // Regular, Bold, ExtraBold
  variable: "--font-raleway",
});
