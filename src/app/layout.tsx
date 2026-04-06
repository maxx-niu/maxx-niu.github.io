import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Max Niu",
  description: "Software engineer portfolio and projects.",
  metadataBase: new URL("https://maxx-niu.github.io"),
  openGraph: {
    title: "Max Niu",
    description: "Software engineer portfolio and projects.",
    url: "https://maxx-niu.github.io",
    siteName: "Max Niu",
    images: [{ url: "/og-image.png", width: 1265, height: 765 }],
    type: "website",
  },
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
