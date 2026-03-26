import type { Metadata } from "next";
import Navbar from "./components/navbar";
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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
