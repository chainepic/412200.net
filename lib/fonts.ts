import { GeistSans } from "geist/font/sans";
import { Montserrat, Raleway } from "next/font/google";

export const geistSans = GeistSans;

export const auraRaleway = Raleway({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-aura-display",
  display: "swap",
});

export const auraMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-aura-body",
  display: "swap",
});
