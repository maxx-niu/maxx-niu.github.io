import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Max Niu",
  description: "Software engineer portfolio and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth relative">
      <body>{children}</body>
    </html>
  );
}
