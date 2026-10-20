import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Emberframe VFX — Create the impossible", description: "Premium AI visual effects with immutable footage, editable FX layers, and artist control. In development." };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
