import { Cinzel, Playfair_Display, Spectral } from "next/font/google";


export const cinzel = Cinzel({
subsets: ["latin"],
weight: ["400", "500", "600", "700"],
display: "swap",
});

export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const playfair = Playfair_Display({
subsets: ["latin"],
weight: ["400", "500", "600", "700"],
style: ["normal", "italic"], // ✅ required for italic
display: "swap",
});