import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CEREAL CAT WIZARD — The Prophecy of the Crunch",
  description:
    "Enter the Cereal Dimension. A chaotic, magical, absurd meme prophecy controlled by the wizard cat.",
  openGraph: {
    title: "CEREAL CAT WIZARD",
    description: "THE PROPHECY OF THE CRUNCH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
