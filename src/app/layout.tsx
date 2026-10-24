import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Emberframe — Preserve the shot. Create the impossible.",
  description:
    "A new canvas for visual effects. Explore AI-powered VFX, independent effect layers, reference-guided creation, and frame-by-frame artist control. Interactive concept preview.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
