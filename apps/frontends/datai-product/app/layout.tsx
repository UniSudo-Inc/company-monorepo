import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "DatAI",
  description: "Making data processing simple, fast, and intelligent",
  icons: "/assets/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
