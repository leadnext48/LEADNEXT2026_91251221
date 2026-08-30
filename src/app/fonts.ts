import { Cinzel, Playfair_Display, Spectral, Space_Grotesk, Manrope } from "next/font/google";

// Fresh display + body pairing used by the redesigned homepage preview (/home-v3).
// Deliberately different from the site's Cinzel/Playfair brand type.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


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